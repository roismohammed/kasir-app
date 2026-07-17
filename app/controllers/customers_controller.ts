import Customer from '#models/customer'
import { CustomersValidator } from '#validators/customer'
import type { HttpContext } from '@adonisjs/core/http'

export default class CustomersController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    return inertia.render('customers/index', {
      customers: await Customer.query().orderBy('created_at', 'desc').paginate(page, 10),
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('customers/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(CustomersValidator)

    await Customer.create(data)

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
  async edit({ params, inertia }: HttpContext) {
    const customers = await Customer.findOrFail(params.id)
    return inertia.render('customers/edit', { customers })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,session, response }: HttpContext) {
    const data = await request.validateUsing(CustomersValidator)
    const customer = await Customer.findOrFail(params.id)
    customer.merge(data)
    await customer.save()

    session.flash('success', 'Customers berhasil diperbarui')
    return response.redirect('/Customers')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const data = await Customer.findOrFail(params.id)
    await data.delete()

    session.flash('success', 'Customer berhasil dihapus')
    return response.redirect('/customers')
  }
}