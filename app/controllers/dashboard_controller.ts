import Customer from '#models/customer'
import Product from '#models/product'
import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia, auth, response }: HttpContext) {
    try {
      // Metode 1: Menggunakan count dengan alias
      const [totalProductResult, totalSupplierResult, totalCustomerResult] = await Promise.all([
        Product.query().count('* as total'),
        Supplier.query().count('* as total'),
        Customer.query().count('* as total'),
      ])
      console.log('Product count result:', totalProductResult)
      console.log('Supplier count result:', totalSupplierResult)
      console.log('Customer count result:', totalCustomerResult)

      const totalProduct = Number(totalProductResult[0]?.total || 0)
      const totalSupplier = Number(totalSupplierResult[0]?.total || 0)
      const totalCustomer = Number(totalCustomerResult[0]?.total || 0)

      await auth.user?.load('role')

      return inertia.render('dashboard/index', {
        totalProduct,
        totalSupplier,
        totalCustomer,
      })
    } catch (error) {
      console.error('Dashboard error:', error)
      
      return inertia.render('dashboard/index', {
        totalProduct: 0,
        totalSupplier: 0,
        totalCustomer: 0,
        error: 'Failed to load dashboard data'
      })
    }
  }
}