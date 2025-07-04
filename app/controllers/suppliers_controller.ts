import Supplier from '#models/supplier'
import {  SupplierValidator } from '#validators/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class SuppliersController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('suppliers/index')
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('suppliers/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(SupplierValidator)
    
    await Supplier.create(data)
    session.flash('success', 'Supplier berhasil ditambahkan')
    return response.redirect('/suppliers')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const supplier = await Supplier.findOrFail(params.id)
    return inertia.render('suppliers/edit', { supplier })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    const supplier = await Supplier.findOrFail(params.id)
    const data = await request.validateUsing(SupplierValidator)
    supplier.merge(data).save()
    session.flash('success', 'Supplier berhasil diperbarui')
    return response.redirect('/suppliers')
  }

  /**
   * Delete record
   */
  async destroy({ params,session,response }: HttpContext) { 
    const supplier = await Supplier.findOrFail(params.id)
    await supplier.delete()

    session.flash('success', 'Supplier berhasil dihapus')
    return response.redirect('/suppliers')
  }
}