import Product from '#models/product'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const productTerlaris = await SaleProduct.query()
      .preload('product')
      .select('productId')
      .count('quantity as total_quantity')
      .groupBy('productId')
      .orderBy('total_quantity', 'desc')
      .limit(5)
    const product = await Product.query().count('* as total')
    return inertia.render('dashboard/index', {
      productTerlaris,
      product
    })
  }
}
