# 02 — TypeScript Patterns

> Panduan TypeScript dari dasar sampai pattern advanced yang dipakai di project ini.
> Semua contoh diambil dari kode nyata di codebase.

---

## 1. Interface vs Type — Kapan Pakai Yang Mana?

### `interface` — untuk Object Shapes

Pakai `interface` ketika mendefinisikan **bentuk sebuah object**.

```typescript
// src/types/ticket.d.ts
export interface Ticket {
    id: string;
    code: string;
    pppoe_secret: string;
    complained_at: string;
    status: TicketStatus;       // ← union type
    customer_name: string;
    branch_name: string;
    category_name: string;
    tso_status: EscalationStatus | null;  // ← bisa null
}
```

Interface bisa di-extend (ditambah properti):
```typescript
interface AdminTicket extends Ticket {
    admin_notes: string;
}
```

### `type` — untuk Union, Alias, Intersections

Pakai `type` ketika mendefinisikan **union type**, **alias**, atau **tipe kompleks**.

```typescript
// src/types/ticket.d.ts
export type TicketStatus =
    | 'Open'
    | 'Escalated'
    | 'In Progress'
    | 'Solved'
    | 'Closed';

export type EscalationStatus =
    | 'Waiting for Schedule'
    | 'Scheduled'
    | 'In Progress'
    | 'Completed'
    | 'Canceled';
```

**Aturan praktis project ini:**
- Object shapes → `interface`
- Union / string literal / computed types → `type`

---

## 2. Optional Properties (`?`)

Properti yang **mungkin tidak ada** diberi tanda `?`.

```typescript
// src/types/api.d.ts
export interface ApiResponse<TData, TMeta = null, TError = null> {
    success: boolean;
    message: string;
    data: TData;
    meta?: TMeta;     // ← optional, mungkin undefined
    errors?: TError;  // ← optional, mungkin undefined
}
```

Saat dipakai:
```typescript
// Harus dicek dulu sebelum digunakan
const meta = data.meta ?? null;  // pakai ?? untuk fallback
```

---

## 3. Generic Types — TypeScript yang Fleksibel

Generic memungkinkan satu type/interface dipakai untuk berbagai tipe data.

### Generic API Response

```typescript
// src/types/api.d.ts
export interface ApiResponse<TData, TMeta = null, TError = null> {
    success: boolean;
    message: string;
    data: TData;      // ← TData bisa apa saja
    meta?: TMeta;
    errors?: TError;
}

// Penggunaan — TypeScript tahu tipe datanya:
const ticketList: ApiResponse<Ticket[]>          // data = Ticket[]
const ticketDetail: ApiResponse<TicketDetails>   // data = TicketDetails
const paginatedList: ApiResponse<Ticket[], ApiPagination>  // data + meta
```

### Generic dalam API Functions

```typescript
// src/api/tickets.ts
export const fetchTickets = async (
    page: number,
    level: number,
    limit: number,
    search?: string,
    categoryId?: string,
    branchId?: string
): Promise<ApiResponse<Ticket[], ApiPagination>> => {
    const response = await authenticatedApi.get('/tickets', {
        params: { page, level, limit, search, category_id: categoryId, branch_id: branchId },
    });
    return response.data as ApiResponse<Ticket[], ApiPagination>;
    //                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                    "type assertion" — memberi tahu TypeScript tipe datanya
};
```

---

## 4. `z.infer<>` — Type dari Zod Schema (SANGAT PENTING)

Ini adalah pattern terbaik di project ini. **Jangan tulis type manual jika sudah ada Zod schema!**

```typescript
// src/features/auth/login/schema.ts
import { z } from 'zod';

export const loginFormSchema = z.object({
    nip: z.string().min(1, 'NIP wajib diisi'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
});

// Default values — TypeScript tahu ini harus LoginFormValues shape
export const loginFormDefaultValues: LoginFormValues = {
    nip: '',
    password: '',
};
```

```typescript
// src/features/auth/login/types.d.ts
import type z from 'zod';
import type { loginFormSchema } from './schema';

// Type di-GENERATE OTOMATIS dari schema — tidak perlu tulis ulang!
export type LoginFormValues = z.infer<typeof loginFormSchema>;
//          ^^^^^^^^^^^^^^^^
// Hasilnya: { nip: string; password: string }
```

**Keuntungan:** Schema Zod berubah → type otomatis ikut berubah. Tidak ada duplikasi kode!

---

## 5. Generic Components dengan Constraint

Pattern ini dipakai untuk form input agar **type-safe dengan berbagai form**.

```typescript
// src/components/tanstack-form/text-input.tsx

// Constraint: TForm harus punya Field dan state.values
interface TfTextInputProps<
    TForm extends { Field: any; state: { values: Record<string, any> } }
> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'> {
    form: TForm;
    name: keyof TForm['state']['values'];  // ← hanya key yang valid dari form!
    label?: string;
}

// Generic function component
export function TfTextInput<
    TForm extends { Field: any; state: { values: Record<string, any> } }
>({ form, name, label, ...props }: TfTextInputProps<TForm>) {
    return (
        <form.Field name={name as string}>
            {(field: any) => (
                <Field>
                    {label && <FieldLabel>{label}</FieldLabel>}
                    <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                </Field>
            )}
        </form.Field>
    );
}
```

**Penggunaan — TypeScript akan error jika `name` salah:**
```typescript
// ✅ Benar — "nip" ada di form values
<TfTextInput form={form} name="nip" label="NIP" />

// ❌ TypeScript error — "username" tidak ada di form values
<TfTextInput form={form} name="username" label="Username" />
```

---

## 6. `ReturnType<typeof ...>` — Inferring Type dari Return Function

```typescript
// src/features/auth/login/types.d.ts
import type { useForm } from '@tanstack/react-form';
import type { LoginFormValues } from './types';

export interface LoginFormProps {
    // Bukan nulis tipe form secara manual,
    // tapi diambil dari return type fungsi useForm
    form: ReturnType<typeof useForm<LoginFormValues>>;
    isLoginLoading: boolean;
}
```

---

## 7. `as const` — Immutable Arrays/Objects

Dipakai untuk membuat array atau object **readonly** dan TypeScript tahu nilai spesifiknya.

```typescript
// src/lib/query-keys.ts
export const queryKeys = {
    tickets: {
        all: ['tickets'] as const,
        //              ^^^^^^^^^
        // TypeScript tahu ini bukan string[], tapi readonly ['tickets']

        lists: () => [...queryKeys.tickets.all, 'list'] as const,
        // Hasilnya: readonly ['tickets', 'list']
    },
} as const;
// ^^^^^^^^ Seluruh object jadi readonly, tidak bisa diubah
```

---

## 8. `keyof` — Mengambil Keys dari Object/Interface

```typescript
interface User {
    name: string;
    email: string;
    role: string;
}

type UserKeys = keyof User;
// Hasilnya: 'name' | 'email' | 'role'

// Dipakai di form components:
name: keyof TForm['state']['values'];
// Artinya: name hanya bisa string yang merupakan key dari values
```

---

## 9. Union Type dengan `null` — Nullable Values

```typescript
// src/types/ticket.d.ts
export interface TicketComplaintInformation {
    closed_at: string | null;    // ← bisa string ATAU null
    solved_by: string | null;
    category: string;            // ← pasti string
}
```

**Cara handle saat digunakan:**
```typescript
// Safe access dengan optional chaining
const closedAt = ticket.closed_at?.toString() ?? 'Belum ditutup';

// Type narrowing
if (ticket.closed_at !== null) {
    // Di sini TypeScript tahu closed_at pasti string
    console.log(ticket.closed_at.toUpperCase());
}
```

---

## 10. Utility Types — Transformasi Type

### `Omit<T, K>` — Buang properti tertentu

```typescript
// Di TfTextInput, kita buang 'form' dan 'name' dari InputHTMLAttributes
// karena kita definisikan sendiri dengan tipe yang lebih spesifik
interface TfTextInputProps<TForm extends ...>
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'> {
    form: TForm;   // ← override dengan tipe kita sendiri
    name: keyof TForm['state']['values'];
}
```

### `Partial<T>` — Semua properti jadi optional

```typescript
// Berguna untuk update payload
type UpdateTicketPayload = Partial<CreateTicketFormValues>;
// Semua field jadi optional — cocok untuk PATCH endpoint
```

### `Pick<T, K>` — Ambil properti tertentu saja

```typescript
type TicketListItem = Pick<Ticket, 'id' | 'code' | 'status'>;
// Hanya ambil 3 properti dari Ticket
```

---

## 11. Type Assertion (`as`) — Memaksa TypeScript

Dipakai ketika TypeScript tidak bisa inferensi tipe secara otomatis.

```typescript
// src/api/tickets.ts
const response = await authenticatedApi.get('/tickets');
return response.data as ApiResponse<Ticket[], ApiPagination>;
//             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Kita "beritahu" TypeScript: response.data ini tipenya ApiResponse<Ticket[]>
```

> ⚠️ Jangan terlalu sering pakai `as` — bisa menyembunyikan bug.
> Pakai hanya ketika kamu yakin 100% tipe datanya.

---

## 12. Interface untuk Store State

```typescript
// src/stores/auth-store.ts
interface AuthState {
    // State (data)
    user: User | null;
    tokens: Token | null;
    isRefreshingToken: boolean;

    // Actions (fungsi pengubah state) — perlu didefinisikan juga
    setUser: (user: User | null) => void;
    setTokens: (tokens: Token | null) => void;
    setIsRefreshingToken: (isRefreshing: boolean) => void;
    clearAuth: () => void;
}
```

---

## Ringkasan Cheatsheet

| Pattern | Kapan Dipakai | Contoh |
|---|---|---|
| `interface` | Object shapes | `interface Ticket { id: string }` |
| `type` | Union / alias | `type Status = 'Open' \| 'Closed'` |
| `?` | Optional property | `meta?: TMeta` |
| `Generic<T>` | Tipe yang fleksibel | `ApiResponse<Ticket[]>` |
| `z.infer<>` | Type dari Zod schema | `type Values = z.infer<typeof schema>` |
| `keyof T` | Keys dari interface | `name: keyof FormValues` |
| `as const` | Immutable + literal type | `['tickets'] as const` |
| `T \| null` | Nullable value | `closed_at: string \| null` |
| `Omit<T, K>` | Buang properti | `Omit<InputProps, 'name'>` |
| `ReturnType<>` | Type dari return function | `ReturnType<typeof useForm>` |
| `as Type` | Type assertion | `data as ApiResponse<T>` |
