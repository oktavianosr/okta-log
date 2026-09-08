# 03 — Feature Pattern (MVC-like)

> Pattern utama yang dipakai di **setiap fitur** di project ini.
> Pahami ini dulu sebelum mulai coding fitur baru.

---

## Konsep Dasar: Separation of Concerns

**Separation of Concerns** = setiap bagian kode punya **satu tanggung jawab** yang jelas.

Di project ini, setiap fitur dibagi menjadi **3 lapisan**:

```
┌─────────────────────────────────────┐
│           index.tsx                 │  ← LOGIC LAYER
│   (data fetching, state, form)      │
└──────────────┬──────────────────────┘
               │ props
               ▼
┌─────────────────────────────────────┐
│           view.tsx                  │  ← PRESENTATION LAYER
│   (pure UI, tidak tahu soal API)    │
└──────────────┬──────────────────────┘
               │ props
               ▼
┌─────────────────────────────────────┐
│         components/*.tsx            │  ← COMPONENT LAYER
│   (sub-components spesifik fitur)   │
└─────────────────────────────────────┘
```

---

## Peran Setiap File

| File | Tanggung Jawab | Boleh Import |
|---|---|---|
| `index.tsx` | Logic: fetch data, setup form, mutation | api/, stores/, lib/, hooks/ |
| `view.tsx` | Render UI, terima props dari index | components/, ui/ |
| `schema.ts` | Definisi validasi Zod | zod saja |
| `types.d.ts` | TypeScript types & interfaces | schema.ts, library types |
| `components/*.tsx` | Sub-komponen UI fitur ini | components/ui/, lib/utils |

**Aturan emas:** `view.tsx` **tidak boleh** memanggil API atau store langsung — semua dari props.

---

## Contoh Nyata: Login Feature

### File 1: `schema.ts` — Validasi dulu

```typescript
// src/features/auth/login/schema.ts
import { z } from 'zod';
import type { LoginFormValues } from './types';

export const loginFormSchema = z.object({
    nip: z.string().min(1, 'NIP wajib diisi'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const loginFormDefaultValues: LoginFormValues = {
    nip: '',
    password: '',
};
```

### File 2: `types.d.ts` — Type definitions

```typescript
// src/features/auth/login/types.d.ts
import type { useForm } from '@tanstack/react-form';
import type z from 'zod';
import type { loginFormSchema } from './schema';

// Type diambil dari schema — tidak perlu tulis ulang
export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Props untuk LoginForm component
export interface LoginFormProps {
    form: ReturnType<typeof useForm<LoginFormValues>>;
    isLoginLoading: boolean;
}

// Props untuk LoginView = sama dengan LoginFormProps di kasus ini
export type LoginViewProps = LoginFormProps;
```

### File 3: `index.tsx` — Logic Layer

```typescript
// src/features/auth/login/index.tsx
import { notifin } from '@khencahyo13/notifin-react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { login } from '@/api/auth';
import { useAuthStore } from '@/stores/auth-store';

import { loginFormDefaultValues, loginFormSchema } from './schema';
import type { LoginFormValues } from './types';
import LoginView from './view';

const Login = () => {
    // 1. Router hook untuk navigasi
    const navigate = useNavigate();

    // 2. Global store — ambil setter functions
    const { setUser, setTokens } = useAuthStore();

    // 3. Setup mutation (API call)
    const mutation = useMutation({
        mutationFn: (payload: LoginFormValues) => login(payload),
    });

    // 4. Setup form dengan validasi dan submit handler
    const form = useForm({
        defaultValues: loginFormDefaultValues,
        validators: {
            onSubmit: loginFormSchema  // validasi saat submit
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value, {
                onSuccess: (data) => {
                    if (data.success) {
                        setUser(data.data);
                        setTokens(data.meta ?? null);
                        navigate({ to: '/' });  // redirect ke dashboard
                    } else {
                        notifin.error('Login Failed!', {
                            description: data.message ?? 'Periksa kembali kredensial Anda.'
                        });
                    }
                },
                onError: () => {
                    notifin.error('Login Failed!', {
                        description: 'Login gagal. Periksa kembali kredensial Anda.'
                    });
                }
            });
        }
    });

    // 5. Pass ke view — index tidak render UI langsung
    return <LoginView form={form} isLoginLoading={mutation.isPending} />;
};

export default Login;
```

### File 4: `view.tsx` — Presentation Layer

```typescript
// src/features/auth/login/view.tsx
import { type FC, memo } from 'react';

import AppLogo from '@/components/layouts/app-logo';

import LoginForm from './components/form';
import type { LoginViewProps } from './types';

// memo() = optimasi: re-render hanya jika props berubah
const LoginView: FC<LoginViewProps> = ({ form, isLoginLoading }) => (
    <div className="grid min-h-svh lg:grid-cols-2">
        {/* Ilustrasi kiri — hanya di layar besar */}
        <div className="relative hidden lg:block">
            <img
                src="/assets/ilustrations/login.webp"
                alt="Login illustration"
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
            />
        </div>

        {/* Form kanan */}
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <AppLogo />
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    {/* Pass props ke sub-component */}
                    <LoginForm form={form} isLoginLoading={isLoginLoading} />
                </div>
            </div>
        </div>
    </div>
);

export default memo(LoginView);
```

### File 5: `components/form.tsx` — Sub-Component

```typescript
// src/features/auth/login/components/form.tsx
import { type FC, memo } from 'react';

import { TfSubmitButton } from '@/components/tanstack-form/button';
import { TfTextInput } from '@/components/tanstack-form/text-input';
import { FieldGroup } from '@/components/ui/field';

import type { LoginFormProps } from '../types';

const LoginForm: FC<LoginFormProps> = ({ form, isLoginLoading }) => (
    <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
            e.preventDefault();     // cegah default browser submit
            form.handleSubmit();    // trigger TanStack Form submit
        }}
    >
        <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Masuk ke akun Anda</h1>
                <p className="text-muted-foreground text-sm">
                    Masukkan NIP Anda di bawah ini untuk masuk ke akun Anda
                </p>
            </div>

            <div className="flex flex-col gap-5">
                <TfTextInput
                    required
                    form={form}
                    name="nip"          // ← TypeScript-validated key
                    label="NIP"
                    placeholder="Masukkan NIP Anda"
                />
                <TfTextInput
                    required
                    form={form}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Masukkan password Anda"
                />
            </div>

            <TfSubmitButton isLoading={isLoginLoading}>
                Masuk
            </TfSubmitButton>
        </FieldGroup>
    </form>
);

export default memo(LoginForm);
```

---

## Alur Data (Data Flow)

```
User submit form
      │
      ▼
LoginForm.onSubmit → form.handleSubmit()
      │
      ▼
TanStack Form validasi dengan Zod schema
      │ (jika valid)
      ▼
Login.onSubmit({ value }) dipanggil
      │
      ▼
mutation.mutate(value) → api/auth.ts → Backend
      │
      ├─ onSuccess → setUser() + setTokens() → navigate('/')
      │
      └─ onError → notifin.error()
```

---

## Pattern Fitur Kompleks: Create Ticket

Contoh fitur yang lebih kompleks — form dengan data dari API:

```typescript
// src/features/tickets/create/index.tsx (simplified)
const TicketCreate = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [editorKey, setEditorKey] = useState(0);

    // Mutation untuk create ticket
    const mutation = useMutation({
        mutationFn: (payload: CreateTicketFormValues) => createTicket(payload),
    });

    const form = useForm({
        defaultValues: createTicketFormDefaultValues,
        validators: { onSubmit: createTicketFormSchema },
        onSubmit: async ({ value }) => {
            // Konfirmasi sebelum submit
            notifin.warning('Konfirmasi Pembuatan Tiket!', {
                description: 'Apakah Anda yakin?',
                action: {
                    label: 'Simpan',
                    onClick: () => {
                        mutation.mutate(value, {
                            onSuccess: (data) => {
                                form.reset();
                                setEditorKey(prev => prev + 1);
                                queryClient.invalidateQueries({ queryKey: ['tickets'] });
                                navigate({ to: `/tickets/${data.data.id}` });
                            },
                        });
                    },
                }
            });
        },
    });

    // Watch field value — reactive
    const pppoeSecret = useStore(form.store, (state) => state.values.pppoe_secret);

    // Fetch data berdasarkan field value
    const { data: pppoeCustomerDetails } = useQuery({
        queryKey: queryKeys.gcuCustomers.detail(pppoeSecret),
        queryFn: () => fetchGcuCustomerByPppoeSecret(pppoeSecret),
        enabled: !!pppoeSecret,  // hanya fetch jika pppoeSecret tidak kosong
    });

    // Auto-fill field lain dari data yang difetch
    useEffect(() => {
        const customerDetails = pppoeCustomerDetails?.data ?? null;
        if (customerDetails) {
            form.setFieldValue('branch_id', customerDetails.branch_id.toString());
        }
    }, [pppoeCustomerDetails, form]);

    return <TicketCreateView form={form} isCreateTicketLoading={mutation.isPending} />;
};
```

---

## Kenapa Pattern Ini Bagus?

| Masalah tanpa pattern | Solusi dengan pattern |
|---|---|
| Logic dan UI tercampur → susah di-maintain | Dipisah → tiap file punya 1 tanggung jawab |
| Sulit testing | `view.tsx` bisa di-test tanpa API |
| Sulit reuse | `components/` bisa dipakai di tempat lain |
| Props drilling parah | Cukup pass dari `index` ke `view` ke `component` |
| Susah trace bug | Logic di satu tempat (`index.tsx`) |

---

## Checklist Saat Buat Fitur Baru

```
[ ] Buat folder: src/features/{fitur}/{sub-fitur}/
[ ] Buat schema.ts — definisi Zod validation
[ ] Buat types.d.ts — TypeScript types dari schema
[ ] Buat index.tsx — logic: useQuery, useForm, useMutation
[ ] Buat view.tsx — UI wrapper, terima props dari index
[ ] Buat components/ — sub-components kalau perlu
[ ] View dan components TIDAK import dari api/ atau stores/ langsung
```
