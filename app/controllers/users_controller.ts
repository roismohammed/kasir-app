import User from '#models/user'
import { UserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
export default class UsersController {
  /**
   * Display a list of resource
   */
  public async index({ inertia }: HttpContext) {
    return inertia.render('user/index',{
      users: await User.query().paginate(1,10)
    })
  }

  /**
   * Display form to create a new record
   */
  public async create({ inertia }: HttpContext) {
    return inertia.render('user/create')
  }

  /**
   * Handle form submission for the create action
   */
  public async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(UserValidator)
    try {
      await User.create(data)
      session.flash('success', 'User berhasil dibuat')
      return response.redirect('/user')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat membuat user')
      return response.redirect().back()
    }
  }

  /**
   * Show individual record
   */
  public async show({ params, inertia }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return inertia.render('user/show', { user })
  }

  /**
   * Edit individual record
   */
  public async edit({ params, inertia }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return inertia.render('user/edit', { user })
  }

  /**
   * Handle form submission for the edit action
   */
  public async update({ params, request, response, session }: HttpContext) {
    const data = await request.validateUsing(UserValidator)
    const user = await User.findOrFail(params.id)
    try {
      await user.merge(data).save()
      session.flash('success', 'User berhasil diperbarui')
      return response.redirect().toRoute('users.index')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat memperbarui user')
      return response.redirect().back()
    }
  }

  /**
   * Delete record
   */
  public async destroy({ params, response, session }: HttpContext) {
    const user = await User.findOrFail(params.id)
    try {
      await user.delete()
      session.flash('success', 'User berhasil dihapus')
      return response.redirect().toRoute('users.index')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat menghapus user')
      return response.redirect().back()
    }
  }
}
