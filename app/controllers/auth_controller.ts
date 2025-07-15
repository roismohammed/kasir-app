import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async check({ request, auth, session, inertia }: HttpContext) {

    /**
     * get data from form
     */
    const { email, password } = request.all()

    /**
     * attemp auth
     */
    await auth.attempt(email, password)

    return inertia.visit('dashboard')

  }

  async logout({ auth, inertia }:HttpContext) {
    await auth.logout()
    return inertia.visit('login.index')
  }
}