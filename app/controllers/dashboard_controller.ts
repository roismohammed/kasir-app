import Product from '#models/product'
import SaleProduct from '#models/sale_product'
import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const productTerlaris = await SaleProduct.query()
      .whereNotNull('product_id')
      .preload('product')
      .limit(5)
    const result = await Supplier.query().count('*')
    // const total = result[0].total
    const product = await Product.query().count('*')
    return inertia.render('dashboard/index', {
      product,
      productTerlaris,
      result,
    })
  }
}
