export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'vercel'
  },
  typescript: {
    strict: true
  }
})
