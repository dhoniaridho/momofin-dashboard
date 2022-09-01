export const appConfig = {
  app: {
    name: 'MomofinGO',
    version: '1.0.0',
    description: '',
  },
  api: {
    base_url: import.meta.env.VITE_API_BASE_URL,
    mode: import.meta.env.VITE_API_MODE,
    company_subdomain: import.meta.env.VITE_COMPANY_SUBDOMAIN,
  },
}
