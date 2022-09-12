export const appConfig = {
  app: {
    name: 'Emet Dashboard',
    version: '1.0.0',
    description: '',
  },
  api: {
    base_url: import.meta.env.VITE_API_BASE_URL,
  },
  cookie: {
    storage_key: import.meta.env.COOKIE_STORAGE_KEY,
    secure: import.meta.env.COOKIE_SECURE,
  },
}
