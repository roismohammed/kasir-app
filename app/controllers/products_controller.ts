import Product from '#models/product'
import { ProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('product/index')
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('product/create')

  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session, }: HttpContext) {
       const data = await request.validateUsing(ProductValidator)
   
       await Product.create(data)
   
       session.flash('success', 'Customer berhasil ditambahkan')
       return response.redirect('/customers')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}