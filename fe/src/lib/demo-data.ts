import type { Post, Profile, Project } from '@/types/content';
export const demoProfile: Profile = {
    bio: 'A space to share what I build, the problems I solve, and the lessons I learn along the way.',
    documentId: 'demo-profile',
    headline: 'Developer & problem solver',
    location: 'Indonesia',
    name: 'Your Name',
    skills: ['React', 'TypeScript', 'Node.js', 'Strapi'],
};
export const demoProjects: Project[] = [
    {
        body: '## About this project\n\nThis is sample content. Replace it with your project story through Strapi.\n\n## Approach\n\nKeep content management separate from the interface so both can evolve easily.',
        category: 'Web development',
        documentId: 'demo-project-1',
        featured: true,
        slug: 'sample-personal-space',
        summary:
            'One place for projects, experiments, and notes from a developer journey.',
        technologies: ['React', 'TypeScript', 'Strapi'],
        title: 'Personal Space',
    },
    {
        body: '## About this project\n\nThis sample project demonstrates the detail page.\n\nShare your project context, challenges, and outcomes here.',
        category: 'Experiment',
        documentId: 'demo-project-2',
        featured: true,
        slug: 'sample-issue-board',
        summary:
            'An exploration of issue tracking, prioritization, and solution documentation.',
        technologies: ['React', 'TanStack Query'],
        title: 'Issue Board',
    },
];
export const demoPosts: Post[] = [
    {
        activityDate: '2026-09-07T09:00:00Z',
        body: '## Problem\n\nThis is a sample problem-solving note.\n\nAfter saving a change, the page still showed the previous data.\n\n## Solution\n\nInvalidate related queries after a successful mutation.\n\n## Lesson\n\nServer data should have one consistent cache source.',
        documentId: 'demo-post-1',
        excerpt:
            'Tracing stale cache data and ensuring the UI updates after a mutation.',
        kind: 'solution',
        project: demoProjects[0],
        slug: 'sample-cache-invalidation',
        tags: [{ documentId: 'demo-tag-1', name: 'React', slug: 'react' }],
        title: 'When the data changed but the UI did not',
    },
    {
        activityDate: '2026-09-05T09:00:00Z',
        body: '## One feature, clear responsibilities\n\nThis is a sample article.\n\nKeep data fetching in index.tsx, then pass props to view.tsx.\n\n- Logic remains easy to trace.\n- The UI can evolve independently.',
        documentId: 'demo-post-2',
        excerpt:
            'Notes on index.tsx, view.tsx, and clearer responsibility boundaries.',
        kind: 'article',
        slug: 'sample-feature-pattern',
        tags: [
            {
                documentId: 'demo-tag-2',
                name: 'TypeScript',
                slug: 'typescript',
            },
        ],
        title: 'Separating logic and UI within one feature',
    },
    {
        activityDate: '2026-09-03T09:00:00Z',
        body: 'This is a sample activity update.\n\nNotes do not always need to be long. Keep the context that will help when you encounter a similar problem again.',
        documentId: 'demo-post-3',
        excerpt:
            'A small space for decisions, experiments, and lessons from everyday work.',
        kind: 'update',
        slug: 'sample-start-taking-notes',
        tags: [],
        title: 'Start documenting the process, not only the outcome',
    },
];
