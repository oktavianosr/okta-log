import type { Post, Profile, Project } from '@/types/content';
export const demoProfile: Profile = {
    bio: 'Ruang untuk menceritakan apa yang saya bangun, masalah yang saya pecahkan, dan hal-hal yang saya pelajari di sepanjang jalan.',
    documentId: 'demo-profile',
    headline: 'Developer & problem solver',
    location: 'Indonesia',
    name: 'Nama Kamu',
    skills: ['React', 'TypeScript', 'Node.js', 'Strapi'],
};
export const demoProjects: Project[] = [
    {
        body: '## Tentang proyek\n\nIni adalah konten contoh. Ganti dengan cerita proyekmu melalui Strapi.\n\n## Pendekatan\n\nPisahkan pengelolaan konten dari antarmuka agar keduanya mudah dikembangkan.',
        category: 'Web development',
        documentId: 'demo-project-1',
        featured: true,
        slug: 'contoh-personal-space',
        summary:
            'Satu tempat untuk proyek, eksperimen, dan catatan perjalanan sebagai developer.',
        technologies: ['React', 'TypeScript', 'Strapi'],
        title: 'Personal Space',
    },
    {
        body: '## Tentang proyek\n\nIni adalah proyek contoh untuk memperlihatkan halaman detail.\n\nCeritakan konteks, tantangan, dan hasil proyekmu di sini.',
        category: 'Eksperimen',
        documentId: 'demo-project-2',
        featured: true,
        slug: 'contoh-issue-board',
        summary:
            'Eksplorasi alur pencatatan masalah, prioritas, dan dokumentasi penyelesaian.',
        technologies: ['React', 'TanStack Query'],
        title: 'Issue Board',
    },
];
export const demoPosts: Post[] = [
    {
        activityDate: '2026-09-07T09:00:00Z',
        body: '## Masalah\n\nKonten ini adalah contoh catatan penyelesaian masalah.\n\nSetelah menyimpan perubahan, halaman masih menampilkan data sebelumnya.\n\n## Penyelesaian\n\nInvalidasi query yang berkaitan setelah mutasi berhasil.\n\n## Yang dipelajari\n\nData server sebaiknya memiliki satu sumber cache yang konsisten.',
        documentId: 'demo-post-1',
        excerpt:
            'Menelusuri cache yang tertinggal dan memastikan UI ikut berubah setelah mutasi.',
        kind: 'solution',
        project: demoProjects[0],
        slug: 'contoh-cache-invalidation',
        tags: [{ documentId: 'demo-tag-1', name: 'React', slug: 'react' }],
        title: 'Saat data sudah berubah, tapi tampilan belum',
    },
    {
        activityDate: '2026-09-05T09:00:00Z',
        body: '## Satu fitur, tanggung jawab yang jelas\n\nIni adalah tulisan contoh.\n\nLetakkan pengambilan data di index.tsx, lalu kirim props ke view.tsx.\n\n- Logic tetap dapat ditelusuri.\n- UI dapat dikembangkan secara terpisah.',
        documentId: 'demo-post-2',
        excerpt:
            'Catatan tentang index.tsx, view.tsx, dan batas tanggung jawab yang lebih mudah dibaca.',
        kind: 'article',
        slug: 'contoh-feature-pattern',
        tags: [
            {
                documentId: 'demo-tag-2',
                name: 'TypeScript',
                slug: 'typescript',
            },
        ],
        title: 'Memisahkan logic dan UI dalam satu fitur',
    },
    {
        activityDate: '2026-09-03T09:00:00Z',
        body: 'Ini adalah activity update contoh.\n\nCatatan tidak selalu harus panjang. Simpan konteks yang akan berguna saat kamu kembali menghadapi masalah serupa.',
        documentId: 'demo-post-3',
        excerpt:
            'Sebuah ruang kecil untuk menyimpan keputusan, percobaan, dan pelajaran dari pekerjaan sehari-hari.',
        kind: 'update',
        slug: 'contoh-mulai-mencatat',
        tags: [],
        title: 'Mulai mencatat proses, bukan hanya hasil',
    },
];
