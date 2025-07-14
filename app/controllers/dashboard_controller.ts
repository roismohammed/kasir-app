import Customer from '#models/customer'
import Product from '#models/product'
import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

async index({ inertia }: HttpContext) {
  const [totalProduct, totalSupplier, totalCustomer] = await Promise.all([
    Product.query().count('* as total'),
    Supplier.query().count('* as total'),
    Customer.query().count('* as total'),
  ])
  return inertia.render('dashboard/index', {
    totalProduct: Number(totalProduct[0].total),
    totalSupplier: Number(totalSupplier[0].total),
    totalCustomer: Number(totalCustomer[0].total),
  })
}

}