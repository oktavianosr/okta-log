# 00 — Architecture Overview (System Design)

> Dokumen induk. Baca ini **paling awal** untuk memahami gambaran besar sistem
> sebelum masuk ke detail di dokumen lain.
> Tujuannya: kamu bisa memahami *kenapa* arsitektur ini dibentuk seperti ini —
> bukan cuma *apa* isinya.

---

## 1. Apa Ini?

`dasaria-complain-fe` adalah **Single Page Application (SPA)** untuk sistem pengelolaan
komplain/tiket. Frontend murni (React) yang berbicara ke **backend Laravel** lewat REST API,
dengan **update real-time** lewat WebSocket (Laravel Reverb).

Tidak ada SSR. Semua logika tampilan & state ada di browser. Backend hanya menyediakan
data (JSON) dan event broadcast.

```
┌──────────────────────────┐         REST (Axios)          ┌─────────────────────┐
│   Browser (React SPA)    │ ────────────────────────────▶ │   Backend Laravel   │
│   dasaria-complain-fe    │ ◀──────────────────────────── │   (REST API)        │
│                          │         JSON responses         └─────────────────────┘
│                          │
│                          │      WebSocket (Echo/Reverb)   ┌─────────────────────┐
│                          │ ◀──────────────────────────── │   Laravel Reverb    │
│                          │      event broadcast           │   (WS broadcaster)  │
└──────────────────────────┘                                └─────────────────────┘
```

---

## 2. Diagram Lapisan (Layered Architecture)

Aliran data dari atas (UI) ke bawah (jaringan) sangat konsisten. Setiap fitur mengikuti
jalur yang sama:

```
┌────────────────────────────────────────────────────────────────┐
│  ROUTES                src/routes/**.lazy.tsx                    │
│  File-based routing → menentukan URL & memuat komponen fitur     │
└───────────────────────────────┬────────────────────────────────┘
                                 │ render
┌───────────────────────────────▼────────────────────────────────┐
│  FEATURE — index.tsx  (LOGIC LAYER)                              │
│  useQuery / useMutation / useForm / useEcho / state lokal        │
└───────────────────────────────┬────────────────────────────────┘
                                 │ props
┌───────────────────────────────▼────────────────────────────────┐
│  FEATURE — view.tsx  (PRESENTATION LAYER)                        │
│  Pure UI: terima props, render komponen. Tidak tahu soal API.    │
└───────────────────────────────┬────────────────────────────────┘
                                 │ pakai
┌───────────────────────────────▼────────────────────────────────┐
│  SHARED COMPONENTS    src/components/ (ui, datatable, form, ...) │
└───────────────────────────────┬────────────────────────────────┘
                                 │ panggil
┌───────────────────────────────▼────────────────────────────────┐
│  API LAYER            src/api/{resource}.ts                     │
│  Fungsi tipis pembungkus HTTP call → kembalikan ApiResponse<T>   │
└───────────────────────────────┬────────────────────────────────┘
                                 │ lewat
┌───────────────────────────────▼────────────────────────────────┐
│  HTTP CLIENT          src/lib/axios.ts                          │
│  Instance Axios + interceptor (Bearer token, refresh-on-401)    │
└───────────────────────────────┬────────────────────────────────┘
                                 │ HTTP
                                 ▼
                         Backend Laravel API
```

Lapisan pendukung yang dipakai lintas fitur:

| Lapisan | Lokasi | Tanggung jawab |
|---|---|---|
| **State server** | TanStack Query | cache & sinkronisasi data dari API |
| **State client** | `src/stores/*` (Zustand) | auth & UI state global |
| **Types** | `src/types/*.d.ts` | kontrak data (domain & API) |
| **Utils/config** | `src/lib/*` | axios, query-keys, datetime, echo, notifin |
| **Real-time** | `@laravel/echo-react` | invalidasi cache saat ada event server |

> Detail tiap lapisan: lihat [03-feature-pattern](03-feature-pattern.md),
> [04-state-management](04-state-management.md), [05-api-layer](05-api-layer.md).

---

## 3. Request Lifecycle (Contoh: Buka Halaman `/tickets`)

Urutan lengkap saat user membuka daftar tiket:

```
1. User klik /tickets
       │
2. routes/(authenticated)/tickets/index.lazy.tsx  → lazy-load <Tickets/>
       │
3. (authenticated)/route.tsx sudah memasang guard auth + konfigurasi Echo
       │
4. features/tickets/list/index.tsx  (LOGIC)
       │   useQuery(queryKeys.tickets.list(...), () => fetchTickets(...))
       │
5. api/tickets.ts → authenticatedApi.get('/tickets', { params })
       │
6. lib/axios.ts  interceptor request → tambahkan "Authorization: Bearer <token>"
       │
7. Backend balas JSON → ApiResponse<Ticket[], ApiPagination>
       │   (jika 401 → interceptor refresh token → retry otomatis)
       │
8. TanStack Query simpan ke cache (key = queryKeys.tickets.list(...))
       │
9. index.tsx kirim data sbg props → features/tickets/list/view.tsx (UI)
       │
10. Sementara itu useEcho('entity.refetch.ticket') menunggu event;
    jika user lain ubah tiket → invalidateQueries → langkah 4 berulang.
```

Lihat kode nyata di [src/features/tickets/list/index.tsx](../src/features/tickets/list/index.tsx).

---

## 4. Pemisahan State: Server vs Client

Salah satu keputusan arsitektur paling penting. Jangan campur keduanya.

```
Butuh data?
│
├─ Berasal dari API (tiket, user, kategori)?  → TanStack Query (useQuery/useMutation)
│
├─ Global & dipakai banyak komponen (auth)?    → Zustand (src/stores)
│
└─ UI lokal (modal open, tab aktif, input)?    → useState
```

- **Server state** punya masalah unik: caching, stale, refetch, dedup, loading/error.
  TanStack Query menangani semua itu. **Jangan** simpan data API ke Zustand.
- **Client state** (auth token, filter datatable) memang milik aplikasi → Zustand.

> Pendalaman: [04-state-management](04-state-management.md).

---

## 5. Keputusan Teknologi & Alasannya

Ini inti "system design" — *kenapa* memilih tiap teknologi:

| Keputusan | Pilihan | Alasan |
|---|---|---|
| **Routing** | TanStack Router (file-based) | Type-safe penuh, auto code-splitting (`autoCodeSplitting`), struktur folder = struktur URL. Lihat [08-routing](08-routing.md). |
| **Server state** | TanStack Query | Cache + dedup + refetch otomatis; pasangan alami untuk real-time invalidation. |
| **Client state** | Zustand | Ringan, tanpa boilerplate Redux; middleware `persist` (auth ke localStorage) + `devtools`. |
| **Forms** | TanStack Form + Zod | Headless, type-safe, validasi schema terpusat. Lihat [06-form-pattern](06-form-pattern.md). |
| **Tables** | TanStack Table | Headless → kita kontrol penuh markup; dibungkus jadi komponen `datatable/`. |
| **HTTP** | Axios (2 instance) | `publicApi` (tanpa token, untuk login/refresh) vs `authenticatedApi` (interceptor token + refresh). Interceptor lebih ringkas daripada fetch manual. |
| **Real-time** | Laravel Echo + Reverb | Native dengan backend Laravel; dipakai untuk invalidasi cache & entity-lock. Lihat [09-realtime-architecture](09-realtime-architecture.md). |
| **Styling** | Tailwind v4 (CSS-first) | Tanpa `tailwind.config.js`; token tema (OKLCH) di `src/index.css`. Lihat [11-ui-design-system](11-ui-design-system.md). |
| **Komponen** | shadcn/ui + Radix | Aksesibel, dimiliki sendiri (copy-paste, bukan dependency hitam). |
| **Build** | Vite + SWC | Dev server cepat, HMR instan, build ringkas. |
| **Validasi** | Zod | TypeScript-first; satu schema → validasi runtime + tipe statis. |

---

## 6. Prinsip Desain yang Dipegang

1. **Separation of concerns** — `index.tsx` (logic) terpisah dari `view.tsx` (UI). Memudahkan
   testing & membaca alur. Lihat [03-feature-pattern](03-feature-pattern.md).
2. **Feature-based, bukan layer-based** — kode dikelompokkan per domain
   (`features/tickets/`, `features/auth/`), bukan per jenis file. Fitur bisa dipindah/dihapus utuh.
3. **Type-safe end-to-end** — dari route params, API response (`ApiResponse<T>`), sampai form values.
4. **Single source of truth untuk cache** — semua query key di `src/lib/query-keys.ts`
   (factory pattern) agar invalidasi konsisten & tidak salah ketik.
5. **Konvensi > konfigurasi** — penamaan file seragam (`index.tsx`, `view.tsx`, `schema.ts`,
   `data.tsx`, `components/`) sehingga setiap fitur "terlihat sama".
6. **Guard di layout, bukan di tiap halaman** — proteksi auth dipasang sekali di
   `(authenticated)/route.tsx`. Lihat [10-auth-and-security](10-auth-and-security.md).

---

## 7. Peta Direktori Tingkat Tinggi

```
src/
├── api/             ← fungsi HTTP per resource (tipis)
├── components/      ← komponen reusable
│   ├── ui/          ← primitives shadcn/Radix (design system dasar)
│   ├── tanstack-form/ ← input ter-bind ke TanStack Form
│   ├── datatable/   ← bagian tabel (wrapper, header, body, pagination)
│   ├── data/, fallback/, layouts/, editor/, blocks/, core/
├── features/        ← domain (auth, dashboard, tickets, ticket-histories)
├── hooks/           ← custom hooks lintas fitur
├── lib/             ← axios, query-keys, utils, echo, notifin, datetime
├── routes/          ← file-based routing (TanStack Router)
├── stores/          ← Zustand (auth-store, datatable-store)
├── types/           ← *.d.ts kontrak data
├── index.css        ← Tailwind v4 + token tema (OKLCH)
└── main.tsx         ← entry: QueryClient + Router + <AppProvider/>
```

> Detail per folder: [01-folder-structure](01-folder-structure.md).

---

## 8. Entry Point & Komposisi Provider

`index.html` → `src/main.tsx` → `<AppProvider/>` → `<RouterProvider/>`.

```tsx
// src/main.tsx (ringkas)
const queryClient = new QueryClient();
export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',   // preload saat hover
    scrollRestoration: true,
});

root.render(
    <StrictMode>
        <AppProvider queryClient={queryClient} appMode={APP_MODE} router={router} />
    </StrictMode>
);
```

`AppProvider` ([src/components/core/app-provider.tsx](../src/components/core/app-provider.tsx))
membungkus seluruh aplikasi dengan:

- `QueryClientProvider` — konteks TanStack Query.
- `RouterProvider` — konteks routing.
- `configureEcho(...)` — setup WebSocket (re-config saat token berubah).
- `<Notifin/>` — sistem notifikasi/toast global.
- `<ReactQueryDevtools/>` — hanya saat `appMode === 'development'`.

```tsx
return (
    <QueryClientProvider client={queryClient}>
        {children}
        {appMode === 'development' && <ReactQueryDevtools ... />}
        <RouterProvider router={router} />
        <Notifin colorScheme="light" theme={{ dialogToneClasses, iconToneClasses }} />
    </QueryClientProvider>
);
```

---

## 9. Ke Mana Selanjutnya?

| Mau paham... | Baca |
|---|---|
| Struktur folder detail | [01-folder-structure](01-folder-structure.md) |
| Pattern fitur (index/view) | [03-feature-pattern](03-feature-pattern.md) |
| State management | [04-state-management](04-state-management.md) |
| API & Axios | [05-api-layer](05-api-layer.md) |
| Form & validasi | [06-form-pattern](06-form-pattern.md) |
| Routing | [08-routing](08-routing.md) |
| Real-time (Echo/Reverb) | [09-realtime-architecture](09-realtime-architecture.md) |
| Auth & keamanan | [10-auth-and-security](10-auth-and-security.md) |
| UI & design system | [11-ui-design-system](11-ui-design-system.md) |
| Tooling & konvensi | [12-tooling-and-conventions](12-tooling-and-conventions.md) |
| **Bikin boilerplate dari project ini** | [13-boilerplate-extraction](13-boilerplate-extraction.md) |
