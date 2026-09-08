# Portfolio CMS

Strapi 5 backend untuk Profile, Project, Post, dan Tag. SQLite digunakan secara default untuk development.

## Menjalankan lokal

```powershell
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' install
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' run setup:env
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' run develop
```

Buka `http://localhost:1337/admin` dan isi formulir **Create the first administrator**. Proyek ini sengaja tidak membuat atau menyimpan kredensial admin otomatis.

API publik tersedia di `http://localhost:1337/api`. Route publik hanya mendaftarkan operasi baca; controller Profile, Project, dan Post selalu memaksa `status=published` dan memakai populate yang sudah ditentukan server.

## Data contoh opsional

Ubah `EXAMPLE_SEED=true` di `.env`, lalu jalankan Strapi. Seed **CONTOH** ini idempotent: profil hanya dibuat ketika belum ada, dan koleksi hanya dibuat ketika slug belum ada. Konten yang sudah ada tidak diperbarui atau ditimpa. Kembalikan ke `false` setelah seed pertama bila tidak lagi dibutuhkan.

## Pemeriksaan

```powershell
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' test
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' run build
```
