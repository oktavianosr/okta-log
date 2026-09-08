import axios from 'axios';
export const cmsUrl = (
    import.meta.env.VITE_CMS_URL || 'http://127.0.0.1:1337'
).replace(/\/$/, '');
export const isDemo = import.meta.env.VITE_DEMO_MODE === 'true';
export const publicApi = axios.create({
    baseURL: cmsUrl + '/api',
    timeout: 12000,
});
