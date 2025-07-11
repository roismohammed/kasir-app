import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

async index({ inertia }: HttpContext) {
  const total  = await Product.query().count('* as total')
  return inertia.render('dashboard/index', { totalProduct: Number(total) })
}

}