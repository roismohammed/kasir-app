import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Tampilkan halaman login
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /**
   * Proses login
   */
  async store({ request, auth, response, session }: HttpContext) {
    try {
      // Ambil data dari form
      const { email, password } = request.only(['email', 'password'])

      // Verifikasi kredensial
      const user = await User.verifyCredentials(email, password)

      // Login
      await auth.use('web').login(user)

      // Redirect ke dashboard
      return response.redirect('/dashboard')
    } catch (error) {
      session.flash('error', 'Email atau password salah')
      return response.redirect().back()
    }
  }

  /**
   * Ambil data user yang sedang login
   */
  async me({ auth, response }: HttpContext) {
    const user = auth.use('web').user!

    return response.ok({
      id: user.id,
      name: user.name || user.name, // tergantung kolom database kamu
      email: user.email,
    })
  }

  /**
   * Logout user
   */
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
