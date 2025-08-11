import Sale from '#models/sale'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'
export default class ReportSalesController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const sales = await Sale.query().paginate(1, 10)
    const totalSalesResult = await Sale.query().sum('total_price as total')
    const totalSales = totalSalesResult[0].$extras.total
    const totalSalesCountResult = await Sale.query().count('* as total')
    const totalProducts = totalSalesCountResult[0].$extras.total
    const totalProductsSoldResult = await SaleProduct.query().sum('quantity as total')
    const totalSold = totalProductsSoldResult[0].$extras.total

    const productTerlaris = await SaleProduct.query()
      .preload('product')
      .select('product_id', 'quantity')
      .groupBy('product_id')
      .orderByRaw('SUM(quantity) DESC')
      .limit(5)

   const perMonth = await SaleProduct
      .query()
      .sum('quantity as total')
      .groupByRaw('MONTH(created_at)')
      .orderByRaw('MONTH(created_at)')
    const newTransaksi = await SaleProduct.query().preload('product').preload('sale').limit(5).orderBy('created_at', 'desc')
    return inertia.render('report/sale', {
      sales,
      totalSales,
      totalProducts,
      totalSold,
      productTerlaris,
      newTransaksi,
      perMonth
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