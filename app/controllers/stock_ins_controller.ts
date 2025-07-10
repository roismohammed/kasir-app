import Product from '#models/product'
import StockIn from '#models/stock_in'
import Supplier from '#models/supplier'
import { StockInValidator } from '#validators/stock_in'
import type { HttpContext } from '@adonisjs/core/http'

export default class StockInsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('stockIn/index', {
      stock_in: await StockIn.query().preload('products').paginate(1, 10)
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const supplier = await Supplier.all()
    const products = await Product.query().preload('category').preload('unit')
    return inertia.render('stockIn/create', { supplier, products })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    try {
      const stockIn = await request.validateUsing(StockInValidator)

      await StockIn.create(stockIn)
      session.flash('success', 'Stock In berhasil ditambahkan')
      return response.redirect('/stock-in')
    } catch (error) {
      console.log(error);
    
      session.flash('error', 'Stock In gagal ditambahkan')
      return response.redirect('/stock-in')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const stockIn = await StockIn.findOrFail(params.id)
    const supplier = await Supplier.all()
    const products = await Product.query().preload('category').preload('unit')
    return inertia.render('stockIn/edit', { stockIn, supplier, products })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    try {
      const stockIn = await StockIn.findOrFail(params.id)
      const data = await request.validateUsing(StockInValidator)

      stockIn.merge(data)
      await stockIn.save()

      session.flash('success', 'Stock In berhasil diperbarui')
      return response.redirect('/stock-in')
    } catch (error) {
      session.flash('error', 'Stock In gagal diperbarui')
      return response.redirect('/stock-in')
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    try {
      const stockIn = await StockIn.findOrFail(params.id)
      await stockIn.delete()
      session.flash('success', 'Stock In berhasil dihapus')
      return response.redirect('/stock-in')
    } catch (error) {
      session.flash('error', 'Stock In gagal dihapus')
      return response.redirect('/stock-in')
    }
  }
}