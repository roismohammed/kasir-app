import { handleInertiaRequests } from '@adonisjs/inertia/server'

handleInertiaRequests({
  share: {
    // Seperti 'appName' Laravel
    appName: () => 'Kasir App by Rois',

    // Setara dengan 'auth.user' Laravel
    auth: async ({ auth }) => {
      const user = auth.user

      if (!user) return null

      await user.load('role') // preload relasi

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        role: user.role.name,
      }
    },

    // Tambahan data global lain kalau mau
    flash: ({ session }) => ({
      success: session.flashMessages.get('success'),
      error: session.flashMessages.get('error'),
    }),
  },
})
