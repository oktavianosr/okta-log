# 01 — Folder Structure (Scaffolding)

> Panduan memahami struktur folder project **Complaint System FE**.
> Setiap folder punya **tanggung jawab spesifik** — jangan campur-campur isinya.

---

## Visual Tree Lengkap

```
dasaria-complain-fe/
├── docs/                          ← Dokumentasi project (kamu sedang di sini)
├── public/
│   └── assets/
│       └── ilustrations/          ← Gambar statis (login.webp, error.webp)
├── src/
│   ├── api/                       ← Semua HTTP call ke backend
│   ├── components/                ← Komponen reusable (bukan fitur)
│   │   ├── blocks/                ← Komponen block besar (editor)
│   │   ├── core/                  ← Root-level providers
│   │   ├── data/                  ← Data overview/preview wrappers
│   │   ├── datatable/             ← Bagian-bagian tabel (body, header, dll)
│   │   ├── editor/                ← Rich text editor (Lexical)
│   │   ├── fallback/              ← Loading/error state components
│   │   ├── layouts/               ← Layout halaman (sidebar, nav, dll)
│   │   ├── tanstack-form/         ← Form input wrappers (TF = TanStack Form)
│   │   └── ui/                    ← Base UI components (Radix + Shadcn)
│   ├── features/                  ← ⭐ INTI APLIKASI — semua fitur di sini
│   │   ├── auth/
│   │   │   └── login/
│   │   ├── dashboard/
│   │   ├── ticket-histories/
│   │   └── tickets/
│   ├── hooks/                     ← Custom React hooks yang reusable
│   ├── lib/                       ← Utility functions & helper setup
│   ├── routes/                    ← File-based routing (TanStack Router)
│   ├── stores/                    ← Global state (Zustand)
│   ├── types/                     ← TypeScript type definitions global
│   ├── index.css                  ← Tailwind CSS + custom styles
│   ├── main.tsx                   ← Entry point aplikasi
│   └── routeTree.gen.ts           ← AUTO-GENERATED, jangan diedit manual
├── .env                           ← Environment variables (jangan di-commit!)
├── package.json                   ← Dependencies
├── tsconfig.json                  ← TypeScript config
└── vite.config.ts                 ← Vite build config
```

---

## Penjelasan Per Folder

### `src/api/` — HTTP Calls

```
api/
├── auth.ts               ← login, logout, refresh token
├── tickets.ts            ← CRUD tickets
├── ticket-categories.ts  ← GET categories
├── ticket-histories.ts   ← GET histories
├── gco-branches.ts       ← GET branches
├── gcu-customers.ts      ← GET customer by PPPoE
├── dashboard.ts          ← GET dashboard stats
├── actions.ts            ← GET actions/sub-actions
└── assessment-points.ts  ← GET assessment points
```

**Aturan:** Satu file = satu resource API. Setiap fungsi return `Promise<ApiResponse<T>>`.

---

### `src/components/` — Komponen Reusable

#### `components/ui/` — Base Components
Komponen paling dasar: Button, Input, Select, Dialog, Table, dll.
Berasal dari **Radix UI + Shadcn**. Jarang diubah manual.

```
ui/
├── button.tsx
├── input.tsx
├── select.tsx
├── dialog.tsx
├── table.tsx
├── badge.tsx
├── card.tsx
└── ... (30+ komponen)
```

#### `components/tanstack-form/` — Form Input Wrappers
Wrapping komponen `ui/` supaya bisa dipakai dengan TanStack Form.
Prefix **`Tf`** = TanStack Form.

```
tanstack-form/
├── text-input.tsx           ← TfTextInput
├── select-input.tsx         ← TfSelectInput
├── searchable-select-input.tsx
├── server-searchable-select-input.tsx
├── calendar-input.tsx       ← TfCalendarInput
├── datetime-input.tsx       ← TfDatetimeInput
├── editor-input.tsx         ← TfEditorInput (rich text)
├── textarea-input.tsx       ← TfTextareaInput
└── button.tsx               ← TfSubmitButton
```

#### `components/layouts/` — Layout Components
```
layouts/
├── authenticated-layout.tsx  ← Layout utama (sidebar + content)
├── content-layout.tsx        ← Wrapper konten halaman
├── sheet-content-layout.tsx  ← Layout untuk sheet/drawer
├── app-sidebar.tsx           ← Sidebar navigation
├── nav-main.tsx              ← Menu navigasi utama
├── nav-secondary.tsx         ← Menu navigasi sekunder
├── app-logo.tsx              ← Logo aplikasi
└── user-info.tsx             ← Info user di sidebar
```

#### `components/fallback/` — Loading & Error States
```
fallback/
├── loader.tsx    ← FallbackLoader (spinning indicator)
├── page.tsx      ← FallbackPage (full-page loading)
├── action.tsx    ← FallbackAction (button loading state)
└── image.tsx     ← FallbackImageText (error illustration)
```

---

### `src/features/` — ⭐ Inti Aplikasi

Setiap fitur punya struktur yang **konsisten**:

```
features/{nama-fitur}/{sub-fitur}/
├── index.tsx        ← Logic layer (data fetching, form, state)
├── view.tsx         ← Presentation layer (pure UI)
├── schema.ts        ← Zod validation schema
├── types.d.ts       ← TypeScript types & interfaces
└── components/      ← Sub-components spesifik fitur ini
    └── *.tsx
```

Contoh nyata:
```
features/
├── auth/
│   └── login/
│       ├── index.tsx          ← useForm + useMutation
│       ├── view.tsx           ← Layout halaman login
│       ├── schema.ts          ← loginFormSchema (Zod)
│       ├── types.d.ts         ← LoginFormValues, LoginViewProps
│       └── components/
│           └── form.tsx       ← LoginForm component
│
└── tickets/
    ├── list/                  ← Halaman daftar tiket
    ├── create/                ← Form buat tiket baru
    ├── details/               ← Detail satu tiket
    ├── cancel/                ← Form batalkan tiket
    ├── close/                 ← Form tutup tiket
    └── new-assessment/        ← Form assessment tiket
```

---

### `src/hooks/` — Custom React Hooks

```
hooks/
├── use-entity-lock-polling.ts  ← Polling untuk entity lock (WebSocket + Query)
└── use-mobile.ts               ← Deteksi apakah viewport mobile
```

**Aturan:** Semua custom hook mulai dengan prefix `use-`.

---

### `src/lib/` — Utility & Setup

```
lib/
├── axios.ts          ← Setup HTTP client (publicApi + authenticatedApi)
├── query-keys.ts     ← React Query key factory
├── api.ts            ← resolveErrorMessage() helper
├── datetime.ts       ← Format tanggal dengan date-fns
├── number.ts         ← Format angka (currency, dll)
├── pagination.ts     ← Helper pagination
├── echo.tsx          ← WebSocket connection status
├── notifin.ts        ← Toast notification config
├── ticket.tsx        ← Utility khusus ticket (badge color, dll)
└── utils.ts          ← cn() — class name merger
```

---

### `src/routes/` — Routing

```
routes/
├── __root.tsx                            ← Root route (semua provider)
├── (authenticated)/
│   ├── route.tsx                         ← Guard + Layout + Echo setup
│   ├── index.lazy.tsx                    ← Route: /
│   ├── tickets/
│   │   ├── index.lazy.tsx                ← Route: /tickets
│   │   ├── create.lazy.tsx               ← Route: /tickets/create
│   │   └── $ticketId.lazy.tsx            ← Route: /tickets/:ticketId
│   └── ticket-histories/
│       ├── index.lazy.tsx                ← Route: /ticket-histories
│       └── $ticketId.lazy.tsx            ← Route: /ticket-histories/:ticketId
└── (unauthenticated)/
    └── (auth)/
        └── login.lazy.tsx                ← Route: /login
```

---

### `src/stores/` — Global State (Zustand)

```
stores/
├── auth-store.ts       ← User + token (PERSISTED ke localStorage)
└── datatable-store.ts  ← State datatable: search, pagination, filters
```

---

### `src/types/` — TypeScript Type Definitions Global

```
types/
├── api.d.ts              ← ApiResponse<T>, ApiPagination
├── auth.d.ts             ← User, Token
├── ticket.d.ts           ← Ticket, TicketDetails, TicketStatus
├── ticket-history.d.ts   ← TicketHistory
├── ticket-assessment.d.ts← TicketAssessment
├── ticket-category.d.ts  ← TicketCategory
├── gco-branch.d.ts       ← GcoBranch
├── guc-customer.d.ts     ← GucCustomer
├── master.d.ts           ← Impact (data master)
├── component.d.ts        ← Option, Filter (reusable component types)
└── realtime.d.ts         ← EntityLockStatus
```

**Catatan:** File `.d.ts` adalah **pure type declarations** — tidak ada runtime code, hanya TypeScript types/interfaces.

---

## Konvensi Penamaan File

| Pola | Contoh | Keterangan |
|---|---|---|
| `kebab-case.tsx` | `auth-store.ts` | Semua file pakai kebab-case |
| `.lazy.tsx` | `tickets/index.lazy.tsx` | Route dengan code splitting |
| `.d.ts` | `ticket.d.ts` | Pure type declaration file |
| `use-*.ts` | `use-mobile.ts` | Custom React hooks |
| `*-store.ts` | `auth-store.ts` | Zustand store |
| `*-schema.ts` / `schema.ts` | `schema.ts` | Zod schema |

---

## Path Alias `@/`

Di project ini, `@/` adalah **shortcut ke `src/`**.

```typescript
// Tanpa alias (repot)
import { queryKeys } from '../../../lib/query-keys';

// Dengan alias (clean)
import { queryKeys } from '@/lib/query-keys';
```

Dikonfigurasi di `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Dan di `vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
```

---

## Quick Reference: "File Ini Untuk Apa?"

| Kamu ingin... | File yang dicari |
|---|---|
| Tambah endpoint API baru | `src/api/{resource}.ts` |
| Tambah tipe TypeScript global | `src/types/{resource}.d.ts` |
| Tambah React Query keys | `src/lib/query-keys.ts` |
| Buat fitur baru | `src/features/{fitur}/{sub-fitur}/` |
| Buat route baru | `src/routes/(authenticated)/...` |
| Buat komponen reusable | `src/components/ui/` atau `components/{kategori}/` |
| Setup global state | `src/stores/{nama}-store.ts` |
| Buat custom hook | `src/hooks/use-{nama}.ts` |
| Utility function | `src/lib/{nama}.ts` |
