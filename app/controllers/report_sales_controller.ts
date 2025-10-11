import Sale from '#models/sale'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
export default class ReportSalesController {
  async index({ inertia }: HttpContext) {
    const sales = await Sale.query().paginate(1, 10)
    const totalSalesResult = await Sale.query().sum('total_price as total')

    const totalSales = totalSalesResult[0].$extras.total
    const totalSalesCountResult = await Sale.query().count('* as total')

    const totalProducts = totalSalesCountResult[0].$extras.total
    const totalProductsSoldResult = await SaleProduct.query().sum('quantity as total')
    const totalSold = totalProductsSoldResult[0].$extras.total

    const productTerlaris = await SaleProduct.query()
      .whereNotNull('product_id')
      .preload('product')
      .orderBy('quantity', 'desc')
      .limit(5)

    const newTransaksi = await SaleProduct.query()
      .whereNotNull('product_id')
      .preload('sale', (query) => query.select(['id', 'invoice_number', 'created_at']))
      .preload('product', (query) => query.select(['id', 'name', 'image']))
      .orderBy('created_at', 'desc')
      .limit(5)

    const selectDataPer = await Sale.query()
      .select(db.raw('DATE(created_at) as day'))
      .count('* as total')
    // .groupBy(db.raw('DATE(created_at)'))
    // .whereDate('created_at', 'today')

    return inertia.render('report/sale', {
      sales,
      totalSales,
      totalProducts,
      totalSold,
      newTransaksi,
      productTerlaris,
      // dataPerDay,
      selectDataPer,
    })
  }
}
