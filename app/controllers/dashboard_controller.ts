import Customer from '#models/customer'
import Product from '#models/product'
import SaleProduct from '#models/sale_product'
import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia, auth, response }: HttpContext) {
    try {
      const totalProductResult = await Product.query().count('* as total')
      const totalSupplierResult = await Supplier.query().count('* as total')
      const totalCustomerResult = await Customer.query().count('* as total')
      const totalProduct = Number(totalProductResult[0]?.total || 0)
      const totalSupplier = Number(totalSupplierResult[0]?.total || 0)
      const totalCustomer = Number(totalCustomerResult[0]?.total || 0)

      await auth.user?.load('role')

      const productTerlaris = await SaleProduct.query()
        .preload('product', (productQuery) => {
          productQuery.preload('category')
        })
        .select('product_id')
        .groupBy('product_id')
        .orderByRaw('SUM(quantity) DESC')
        .limit(5)

      return inertia.render('dashboard/index', {
        totalProduct,
        totalSupplier,
        totalCustomer,
        productTerlaris
      })
    } catch (error) {

      return inertia.render('dashboard/index', {
        totalProduct: 0,
        totalSupplier: 0,
        totalCustomer: 0,
        error: 'Failed to load dashboard data'
      })
    }
  }
}