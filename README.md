# Devlog — portfolio & activity journal

Website personal berbahasa Indonesia dengan React/TypeScript/shadcn dan headless CMS Strapi 5. Frontend dan backend adalah dua aplikasi terpisah.

## Menjalankan lokal

Gunakan Node.js 24 LTS dan npm. Jalankan perintah dari root proyek:

```sh
npm --prefix fe install
npm --prefix be install
npm --prefix be run setup:env
```

Terminal pertama:

```sh
npm --prefix be run develop
```

Terminal kedua:

```sh
npm --prefix fe run dev
```

- Website: http://127.0.0.1:5173
- Admin CMS: http://127.0.0.1:1337/admin
- REST API: http://127.0.0.1:1337/api

Buka admin dan buat akun administrator pertama sendiri. Aplikasi tidak membuat akun atau password bawaan. `setup:env` menghasilkan secret acak tanpa mencetak nilainya dan tidak menimpa `.env` yang sudah ada.

Jika shim `npm` PowerShell di mesin ini gagal menemukan `npm-cli.js`, gunakan `npm.cmd`, atau panggil npm langsung:

```powershell
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' --prefix fe run dev
```

## Konten contoh dan mode demo

Data contoh Strapi bersifat opt-in. Untuk mengisinya pada database lokal, hentikan backend lalu jalankan dari PowerShell:

```powershell
$env:EXAMPLE_SEED = 'true'
npm --prefix be run develop
```

Seed membuat profil, dua proyek terbit, tiga tulisan terbit, tag, serta draft contoh untuk memeriksa pembatasan akses. Seluruh identitas/pekerjaan adalah **contoh**, bukan riwayat pemilik website. Konten dengan slug yang sudah ada tidak ditimpa. Setelah startup, hentikan server dan hapus variabel proses sebelum startup normal berikutnya:

```powershell
Remove-Item Env:EXAMPLE_SEED
```

Website membaca Strapi sungguhan secara default. Untuk mengerjakan UI tanpa backend, salin `fe/.env.example` menjadi `fe/.env` dan set `VITE_DEMO_MODE=true`, lalu restart Vite. Banner demo tampil jelas. API error tidak pernah memicu fallback ke contoh secara otomatis.

## Mengelola konten

1. Isi **Profile**: nama, headline, bio, lokasi, avatar, skills dan tautan opsional.
2. Buat **Project**: judul, slug, ringkasan, body Markdown, kategori, teknologi, dan gambar/tautan opsional. Aktifkan `featured` untuk muncul di beranda.
3. Buat **Post**: judul, slug, excerpt, body Markdown, `activityDate`, tag dan proyek terkait. Jenis `article` adalah tulisan panjang, `update` catatan singkat, `solution` penyelesaian masalah.
4. Simpan lalu **Publish** profil, proyek, dan tulisan. Tag tidak memakai draft/publish. Refresh website untuk melihat perubahan.

`skills` dan `technologies` berisi JSON array string, misalnya `["React", "TypeScript"]`.
Feed diurutkan berdasarkan `activityDate`, bukan tanggal entri dibuat. Search, filter jenis, dan nomor halaman tersimpan di URL. Halaman detail memakai slug unik.

REST publik sengaja hanya menyediakan `find`/`findOne`. Controller memaksa konten terbit dan membatasi relasi yang bisa dibaca. Create/update/delete konten dilakukan melalui admin Strapi. Tidak ada token admin atau private API token di frontend.

## Struktur

```text
fe/src/
  api/                 # HTTP per resource + normalisasi respons Strapi
  components/          # ui shadcn, layouts, core, data, fallback
  features/
    portfolio/         # home, list, details
    posts/             # list, details
  hooks/               # debounce, metadata halaman
  lib/                 # Axios, schema konten, query keys, utils
  routes/              # TanStack file-based routes + lazy components
  stores/              # konvensi client state; belum perlu store global
  types/               # deklarasi domain/API/props
be/
  config/              # database, server, CORS
  src/api/             # model, controller, router, service Strapi
  src/seed/            # seed contoh opt-in
  src/utils/           # batas pembacaan publik
  scripts/             # penyiapan environment
```

Setiap fitur memisahkan `index.tsx` (query/state) dan `view.tsx` (UI melalui props). Schema dan tipe lokal diletakkan bersama fitur. Tipe objek memakai interface, union dan hasil `z.infer` memakai type. Komponen shadcn dibuat dengan CLI resmi; `cn` memakai helper lokal `@/lib/utils`.

Admin konten memakai Strapi, sehingga FE tidak memiliki duplikasi login/editor atau form mutasi. TanStack Form + Zod dan Zustand baru diperlukan ketika ada form frontend/state global; data CMS tetap di TanStack Query.

## Verifikasi

```sh
npm --prefix fe test
npm --prefix fe run build
npm --prefix be test
npm --prefix be run build
```

`fe` build juga menjalankan TypeScript. Route tree dibuat otomatis saat Vite berjalan; jangan edit `routeTree.gen.ts`.

## Konfigurasi dan deployment

- `VITE_CMS_URL` menunjuk origin Strapi tanpa akhiran `/api`. Ini URL publik, bukan secret.
- SQLite menyimpan database lokal di `be/.tmp/data.db`; jangan hapus jika berisi konten yang dibutuhkan.
- Backup database **dan** `be/public/uploads` untuk mempertahankan konten dan media.
- Hosting backend memerlukan runtime Node yang kompatibel, penyimpanan database/media persisten, secret environment, HTTPS, dan origin frontend dalam CORS.
- Frontend di-build ke `fe/dist`. Host statis harus mengarahkan URL halaman ke `index.html` agar refresh URL detail bekerja.
- Versi ini SPA sesuai acuan. Judul/deskripsi berubah di browser; metadata per artikel untuk crawler sosial dan SSR/prerender belum disediakan.
- Belum ada deployment publik atau domain yang dikonfigurasi.

Rancangan dan implementasi dicatat di `docs/superpowers/`. Salinan empat dokumen acuan ada di `docs/references/`; domain tiket, backend Laravel, WebSocket, serta tautan ke file di proyek asal hanya referensi, bukan fitur aplikasi ini.

Untuk memeriksa kontrak frontend terhadap CMS sungguhan setelah seed/publikasi konten:

```sh
cd fe
node scripts/smoke-api.ts
```
