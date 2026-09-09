# Client state

Add a Zustand store only when state must be shared across features. CMS data belongs in TanStack Query, feed filters belong in the URL, and authentication and editing are managed by the Strapi admin.
