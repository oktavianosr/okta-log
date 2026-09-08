# Portfolio dan activity journal

Rancangan disetujui melalui pesan pengguna “lanjutkan” setelah memilih Strapi.

## Produk

Website publik berbahasa Indonesia untuk profil, proyek, dan tulisan/activity feed.
Pengelolaan konten menggunakan admin bawaan Strapi 5. Pengunjung tidak perlu login.
Halaman: `/`, `/projects`, `/projects/$slug`, `/posts`, `/posts/$slug`.
Feed diurutkan berdasarkan tanggal aktivitas, dengan pencarian dan filter jenis tulisan.
Detail tulisan dan proyek dapat dibuka lewat URL langsung.
Gaya visual: jurnal developer, putih/ink, aksen biru, tipografi besar, timeline dan
kartu proyek dengan ilustrasi geometri CSS. Responsif dan keyboard-accessible.

## Struktur dan pola

- `fe/`: React TypeScript, Vite, shadcn/Radix, Tailwind 4, TanStack Router file-based,
  TanStack Query, Axios dan Zod.
- `be/`: Strapi TypeScript dengan struktur native Strapi, SQLite untuk development.
- `docs/`: panduan menjalankan dan pola arsitektur.
- FE mengikuti empat dokumen referensi pengguna: `api`, `components`, `features`,
  `hooks`, `lib`, `routes`, `stores`, `types`; file kebab-case; alias `@/` ke `src`.
- Feature `index.tsx` mengelola data/state, `view.tsx` menerima props saja,
  `types.d.ts` untuk tipe, `schema.ts` untuk validasi yang diperlukan.
- UI tidak mengakses API/store. API data tetap di TanStack Query.
- TanStack Form dipakai bila ada form mutasi frontend. Admin konten memakai Strapi,
  sehingga tidak perlu membuat login, editor, atau store auth frontend baru.
- Pola backend Laravel, tiket, WebSocket, dan entity lock dalam dokumen bukan scope.

## Kontrak konten

- Profile single type: name, headline, bio (text), location, email, githubUrl,
  linkedinUrl, skills (JSON string array), avatar (single image).
- Project collection: title, slug (unique UID), summary, body (Markdown),
  technologies (JSON string array), category, featured, demoUrl, repositoryUrl,
  cover (single image).
- Post collection: title, slug (unique UID), excerpt, body (Markdown),
  kind enum `article|update|solution`, activityDate, featured, cover (single image),
  project relation many-to-one Project, tags relation many-to-many Tag.
- Tag collection: name, slug (unique UID).
- Profile, Project, Post memakai Draft & Publish. Tag hanya nama publik.
- REST list memakai `data` dan `meta.pagination`; detail slug menggunakan filter.
- Frontend memvalidasi respons lalu menormalkan ke `ApiResponse<TData,TMeta>`.

## Akses, data awal, dan kegagalan

Publik hanya memperoleh find/findOne. Pembacaan Profile/Project/Post di server
selalu memaksa status published; permintaan draft tidak boleh membocorkan data.
Tidak ada token admin di browser. CORS development hanya frontend lokal.
Seed bersifat opt-in, idempotent, dan berlabel contoh. Tidak menimpa konten pengguna.
Mode demo frontend eksplisit melalui environment, tanpa menyamarkan API gagal
sebagai data demo. Default menggunakan Strapi sebenarnya.
Loading, error dengan retry, empty state, 404 dan pagination harus tersedia.
Markdown tidak merender raw HTML; tautan hanya protokol yang diizinkan.

## Verifikasi

Build dan typecheck FE/BE; unit test normalisasi/filter/pagination/URL;
uji API CMS untuk konten terbit, draft isolation, write denied dan relasi;
smoke halaman frontend serta dokumentasi pembuatan admin pertama.
Deploy publik memerlukan host Strapi dan konfigurasi domain yang belum diberikan.
SPA mengikuti acuan; SSR/prerender dan SEO per URL di server di luar versi awal.
