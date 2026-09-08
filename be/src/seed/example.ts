import type { Core } from '@strapi/strapi';

const PROFILE = 'api::profile.profile' as const;
const PROJECT = 'api::project.project' as const;
const POST = 'api::post.post' as const;
const TAG = 'api::tag.tag' as const;

async function createWhenSlugIsMissing(
  strapi: Core.Strapi,
  uid: typeof PROJECT | typeof POST | typeof TAG,
  slug: string,
  data: Record<string, unknown>,
  publish = false,
) {
  const documents = strapi.documents(uid);
  const existing = await documents.findFirst({
    filters: { slug: { $eq: slug } },
    ...(publish ? { status: 'draft' as const } : {}),
  } as never);

  return existing ?? documents.create({
    data,
    ...(publish ? { status: 'published' as const } : {}),
  } as never);
}

export async function seedExampleContent(strapi: Core.Strapi) {
  const profile = await strapi.documents(PROFILE).findFirst({ status: 'draft' });
  if (!profile) {
    const createdProfile = await strapi.documents(PROFILE).create({
      status: 'published',
      data: {
        name: 'Nama Contoh',
        headline: 'Developer yang menulis catatan kerja',
        bio: 'Profil contoh untuk pengembangan lokal. Ganti melalui admin Strapi.',
        location: 'Indonesia',
        skills: ['TypeScript', 'React', 'Strapi'],
      },
    });
    await strapi.documents(PROFILE).update({
      documentId: createdProfile.documentId,
      status: 'draft',
      data: { headline: '[Draf Contoh] Tidak boleh tampil di API publik' } as never,
    });
  }

  const webTag = await createWhenSlugIsMissing(strapi, TAG, 'web', {
    name: 'Web',
    slug: 'web',
  });
  const strapiTag = await createWhenSlugIsMissing(strapi, TAG, 'strapi', {
    name: 'Strapi',
    slug: 'strapi',
  });

  const project = await createWhenSlugIsMissing(strapi, PROJECT, 'arsip-pola-frontend', {
    title: '[Contoh] Arsip Pola Frontend',
    slug: 'arsip-pola-frontend',
    summary: 'Proyek contoh untuk mendokumentasikan pola frontend yang teruji.',
    body: '## Tentang proyek\n\nKonten contoh yang aman dihapus melalui admin.',
    technologies: ['React', 'TypeScript', 'Strapi'],
    category: 'Web',
    featured: true,
  }, true);

  await createWhenSlugIsMissing(strapi, PROJECT, 'jurnal-aktivitas-developer', {
    title: '[Contoh] Jurnal Aktivitas Developer',
    slug: 'jurnal-aktivitas-developer',
    summary: 'Proyek contoh untuk merangkum artikel, pembaruan, dan solusi harian.',
    body: '## Tentang proyek\n\nData contoh kedua untuk pratinjau kartu proyek.',
    technologies: ['TypeScript', 'SQLite'],
    category: 'Jurnal',
    featured: true,
  }, true);

  const relations = {
    project: project.documentId,
    tags: [webTag.documentId, strapiTag.documentId],
  };

  const draftProject = await createWhenSlugIsMissing(strapi, PROJECT, 'draf-contoh-rahasia', {
    title: '[Draf Contoh] Proyek Rahasia',
    slug: 'draf-contoh-rahasia',
    summary: 'Fixture draf untuk memeriksa isolasi API publik.',
    body: 'Konten ini hanya boleh terlihat di admin.',
    technologies: ['Strapi'],
    category: 'Draf',
    featured: false,
  });

  await createWhenSlugIsMissing(strapi, POST, 'draf-contoh-rahasia', {
    title: '[Draf Contoh] Tulisan Rahasia',
    slug: 'draf-contoh-rahasia',
    excerpt: 'Fixture draf untuk memeriksa isolasi API publik.',
    body: 'Konten ini hanya boleh terlihat di admin.',
    kind: 'update',
    activityDate: '2026-09-07T09:00:00.000Z',
    featured: false,
    project: draftProject.documentId,
    tags: [webTag.documentId],
  });

  await createWhenSlugIsMissing(strapi, POST, 'membangun-portfolio-dengan-strapi', {
    title: '[Contoh] Membangun portfolio dengan Strapi',
    slug: 'membangun-portfolio-dengan-strapi',
    excerpt: 'Catatan contoh tentang menyusun konten portfolio.',
    body: '## Mulai dari kontrak konten\n\nPisahkan data publik dari pengelolaan konten.',
    kind: 'article',
    activityDate: '2026-09-05T09:00:00.000Z',
    featured: true,
    ...relations,
  }, true);

  await createWhenSlugIsMissing(strapi, POST, 'catatan-rilis-portfolio', {
    title: '[Contoh] Catatan rilis portfolio',
    slug: 'catatan-rilis-portfolio',
    excerpt: 'Pembaruan singkat dari proyek contoh.',
    body: 'Versi awal halaman publik sudah tersedia.',
    kind: 'update',
    activityDate: '2026-09-03T09:00:00.000Z',
    featured: false,
    ...relations,
  }, true);

  await createWhenSlugIsMissing(strapi, POST, 'solusi-filter-draft-strapi', {
    title: '[Contoh] Solusi filter draft Strapi',
    slug: 'solusi-filter-draft-strapi',
    excerpt: 'Memaksa status published di batas API publik.',
    body: 'Server mengganti status dan populate dari permintaan publik.',
    kind: 'solution',
    activityDate: '2026-09-01T09:00:00.000Z',
    featured: false,
    ...relations,
  }, true);
}
