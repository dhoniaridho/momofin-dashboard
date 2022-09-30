export const appConfig = {
  app: {
    name: 'Emet Dashboard',
    version: '1.0.0',
    description: '',
    mode: import.meta.env.VITE_APP_ENV ?? 'production',
  },
  api: {
    base_url: import.meta.env.VITE_API_BASE_URL,
  },
  cookie: {
    storage_key: import.meta.env.VITE_COOKIE_STORAGE_KEY,
    secure: import.meta.env.VITE_COOKIE_SECURE ?? true,
  },
}

if (!appConfig.app.mode) {
  console.log(appConfig)
}
