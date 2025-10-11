import Product from '#models/product'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const productTerlaris = await SaleProduct.query()
      .whereNotNull('product_id')
      .preload('product')
      .limit(5)
    const product = await Product.query().count('* as total')
    return inertia.render('dashboard/index', {
      product,
      productTerlaris,
    })
  }
}
