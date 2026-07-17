import Category from '#models/category'
import { CategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    return inertia.render('category/index',{
      categories :await Category.query().orderBy('created_at', 'desc').paginate(page, 10)
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(CategoryValidator)
    const category = await Category.create(data)

    category.save()

    session.flash('success', 'Category berhasil ditambahkan')
    return response.redirect('/categories')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return category
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {

  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,session, response }: HttpContext) {
    const data = await request.validateUsing(CategoryValidator)
    const category = await Category.findOrFail(params.id)
    category.merge(data)
    await category.save()

    session.flash('success', 'Category berhasil diperbarui')
    return response.redirect('/categories') 
  }

  /**
   * Delete record
   */
  async destroy({ params,session,response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()

    session.flash('success', 'Category berhasil dihapus')
    return response.redirect().toRoute('categories.index')
  }
}
