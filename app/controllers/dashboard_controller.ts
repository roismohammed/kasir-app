import Customer from '#models/customer'
import Product from '#models/product'
import SaleProduct from '#models/sale_product'
import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const productTerlaris = await SaleProduct.query()
      .whereNotNull('product_id')
      .preload('product', (category) => {
        category.preload('category')
      })
      .limit(5)

    const product = await Product.query().count('* as total')
    const totalProduct = product[0].$extras.total

    const customer = await Customer.query().count('* as total')
    const totalCustomer = customer[0].$extras.total

    const supplier = await Supplier.query().count('* as total')
    const totalSupliers = supplier[0].$extras.total
    return inertia.render('dashboard/index', {
      product,
      productTerlaris,
      totalProduct,
      totalSupliers,
      totalCustomer,
    })
  }
}
