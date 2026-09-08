# Backend report

## Implementasi

- Strapi `5.52.3`, TypeScript, SQLite (`.tmp/data.db`), Node `24.14.1`, npm `11.11.0`.
- Content types: Profile (single), Project, Post, dan Tag memakai kontrak field di desain. Profile, Project, dan Post memakai Draft & Publish; Tag tidak.
- API publik hanya mendaftarkan `find`/`findOne` (`Profile` hanya `find`, sesuai single type). Route mutasi tidak didaftarkan.
- Controller publik mengganti `status` menjadi `published` dan mengganti `populate` dengan bentuk aman milik server. Post hanya memuat Project dengan `publishedAt` non-null. Tag memakai populate kosong agar backrelation Post tidak dapat diminta publik.
- Lifecycle Profile dan Project memvalidasi bahwa `skills`/`technologies`, jika diisi, benar-benar array string.
- CORS development: `http://localhost:5173` dan `http://127.0.0.1:5173`.
- Admin Strapi tetap normal. Tidak ada kredensial admin yang dibuat otomatis.

## Menjalankan

```powershell
cd D:\Personal\blog-gw\be
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' install
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' run setup:env
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' run develop
```

`setup:env` membuat `.env` dengan `crypto.randomBytes` tanpa mencetak nilai rahasia dan tidak menimpa `.env` yang sudah ada. Buat administrator pertama melalui `http://localhost:1337/admin`.

Server akhir dijalankan oleh task utama di `http://127.0.0.1:1337`, unified exec session `72627` (PID `18172`), menggunakan `.tmp/data.db`. Task utama mengulang smoke integrasi frontend, smoke API publik, dan GET admin; semuanya lulus.

## Seed contoh

Seed default mati. Untuk mengaktifkan, set `EXAMPLE_SEED=true`, lalu mulai Strapi. Seed hanya membuat Profile jika kosong dan hanya membuat koleksi saat slug belum ada; konten yang ada tidak diperbarui.

- Project terbit: `arsip-pola-frontend`, `jurnal-aktivitas-developer` (keduanya featured).
- Post terbit: `membangun-portfolio-dengan-strapi`, `catatan-rilis-portfolio`, `solusi-filter-draft-strapi`.
- Tag: `web`, `strapi`.
- Fixture draft untuk pemeriksaan isolasi: slug `draf-contoh-rahasia` pada Project dan Post, serta headline draft Profile berlabel `[Draf Contoh]`.

## Hasil verifikasi

- `npm test`: exit `0`; 5 test, 5 pass, 0 fail. Mencakup status/populate publik, backrelation Tag, dan validasi JSON string-array.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`: exit `0`, tanpa diagnostic.
- `npm run build`: exit `0`; TypeScript compile `5393ms`, build context `282ms`, admin panel `50305ms`.
- `npm run smoke`: exit `0`; published reads, draft isolation (termasuk `status=draft` dan filter `publishedAt` berbahaya), nested Project, hostile Tag populate, write denial, dan CORS lulus.
- `npm run smoke:validation`: exit `0`; document-service create/update menolak object dan mixed array melalui `ValidationError` pada database SQLite terisolasi.
- Frontend integration smoke terhadap CMS nyata: Profile `Nama Contoh`, 2 Project, 3 Post, 2 Tag, semua detail slug dapat dibaca; exit `0`.
- Pemeriksaan akhir server: `GET /api/projects` mengembalikan HTTP `200` dengan 2 item.

Instalasi menambahkan 1448 package. Audit npm melaporkan 25 advisory transitive (4 low, 20 moderate, 1 high); tidak dilakukan `npm audit fix --force` karena dapat mengubah dependency tree Strapi di luar versi yang diuji. Dalam sandbox Codex, Strapi juga mencatat warning `EPERM` saat mencoba membaca konfigurasi pengguna di AppData, tetapi build, startup, dan API tetap berhasil.
