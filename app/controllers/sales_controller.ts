import Category from '#models/category'
import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const selectedCategoryId = request.input('category_id')
    const sales = await Sale.query()
      .preload('customer')
      .preload('product', (product) => {
        product.preload('category')
      })
    const productsQuery = Product.query()
      .preload('category')
      .where('stock', '>', 0)

    if (selectedCategoryId) {
      productsQuery.where('category_id', selectedCategoryId)
    }
    const products = await productsQuery.exec()
    const categories = await Category.query().preload('products', (product) => {
      product.select('id', 'name', 'stock').where('stock', '>', 0)
    })
    return inertia.render('sales/index', { sales, products, categories })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('sales/create')
  }

  /**
   * Handle form submission for the create action
   */
  // Di controller backend
  async store({ request, response }: HttpContext) {
    const {
      invoice_number,
      customer_id,
      payment_type,
      discount,
      tax,
      amount_paid,
      grand_total,
      total_price,
      notes,
      items,
    } = request.all()

    return response.redirect().toRoute('sales.index')
  }


  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  // async destroy({ params }: HttpContext) { }
}