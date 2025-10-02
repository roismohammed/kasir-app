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
      .select('product_id')
      .groupBy('product_id')
      .orderByRaw('SUM(quantity) DESC')
      .limit(5)

    const perMonth = await SaleProduct
      .query()
      .sum('quantity as total')
      .groupByRaw('MONTH(created_at)')
      .orderByRaw('MONTH(created_at)')
    const newTransaksi = await SaleProduct.query().preload('product').preload('sale').limit(5).orderBy('created_at', 'desc')
    const reportDay = await SaleProduct.query().whereRaw('created_at BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 DAY)');
    // return inertia.render('report/sale', {
    //   sales,
    //   totalSales,
    //   totalProducts,
    //   totalSold,
    //   productTerlaris,
    //   newTransaksi,
    //   perMonth,
    //   reportDay
    // })
  }

}