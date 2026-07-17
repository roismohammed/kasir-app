import Customer from '#models/customer'
import Product from '#models/product'
import SaleProduct from '#models/sale_product'
import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const [productTerlaris, productCount, customerCount, supplierCount] = await Promise.all([
      SaleProduct.query()
        .whereNotNull('product_id')
        .preload('product', (category) => {
          category.preload('category')
        })
        .limit(5),
      Product.query().count('* as total'),
      Customer.query().count('* as total'),
      Supplier.query().count('* as total'),
    ])

    return inertia.render('dashboard/index', {
      product: productCount,
      productTerlaris,
      totalProduct: productCount[0].$extras.total,
      totalSupliers: supplierCount[0].$extras.total,
      totalCustomer: customerCount[0].$extras.total,
    })
  }
}
