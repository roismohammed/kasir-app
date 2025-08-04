import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReportSalesController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const sale = await Sale.query().paginate(1, 10)

    // Hitung total uang penjualan dari semua data tanpa pagination
    const totalPenjualanResult = await Sale.query().sum('total_price as total')
    const total_penjualan = totalPenjualanResult[0].$extras.total
    const tota_productResult = await Sale.query().count('* as total')
    const tota_product = tota_productResult[0].$extras.total

    return inertia.render('report/sale', {
      sale,
      total_penjualan,
      tota_product
    })
  }



  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  // async store({ request }: HttpContext) { }

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
  async destroy({ params }: HttpContext) { }
}