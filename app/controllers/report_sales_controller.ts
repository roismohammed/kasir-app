import Sale from '#models/sale'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ReportSalesController {
  async index({ request, inertia }: HttpContext) {
    const period = request.input('period', '30days')
    const now = DateTime.now()
    let startDate: DateTime

    switch (period) {
      case 'today':
        startDate = now.startOf('day')
        break
      case '7days':
        startDate = now.minus({ days: 7 })
        break
      case '30days':
        startDate = now.minus({ days: 30 })
        break
      case '90days':
        startDate = now.minus({ days: 90 })
        break
      case '1year':
        startDate = now.minus({ years: 1 })
        break
      default:
        startDate = now.minus({ days: 30 })
    }

    // Sales dengan filter tanggal dan pagination
    const sales = await Sale.query()
      .where('created_at', '>=', startDate.toSQL())
      .orderBy('created_at', 'desc')
      .paginate(1, 10)

    // Total penjualan dengan filter
    const totalSalesResult = await Sale.query().where('created_at', '>=', startDate.toSQL()).sum('total_price as total')
    const totalSales = totalSalesResult[0].$extras.total || 0

    // Total transaksi dengan filter
    const totalSalesCountResult = await Sale.query().where('created_at', '>=', startDate.toSQL()).count('* as total')
    const totalProducts = totalSalesCountResult[0].$extras.total || 0

    // Total produk terjual dengan filter (join dengan sales untuk filter tanggal)
    const totalProductsSoldResult = await SaleProduct.query()
      .join('sales', 'sale_products.sale_id', 'sales.id').where('sales.created_at', '>=', startDate.toSQL()).sum('sale_products.quantity as total')
    const totalSold = totalProductsSoldResult[0].$extras.total || 0

    // Produk terlaris dengan filter
    const productTerlaris = await SaleProduct.query()
      .select('product_id')
      .sum('quantity as total_quantity')
      .whereNotNull('product_id')
      .join('sales', 'sale_products.sale_id', 'sales.id')
      .where('sales.created_at', '>=', startDate.toSQL())
      .groupBy('product_id')
      .orderBy('total_quantity', 'desc')
      .preload('product')
      .limit(5)

    // Transaksi terbaru dengan filter
    const newTransaksi = await SaleProduct.query()
      .whereNotNull('product_id')
      .join('sales', 'sale_products.sale_id', 'sales.id')
      .where('sales.created_at', '>=', startDate.toSQL())
      .preload('sale', (query) => query.select(['id', 'invoice_number', 'created_at']))
      .preload('product', (query) => query.select(['id', 'name', 'image']))
      .orderBy('sale_products.created_at', 'desc')
      .limit(5)

    // Data penjualan per hari dengan filter
    const selectDataPerDay = await Sale.query()
      .where('created_at', '>=', startDate.toSQL())
      .orderBy('created_at', 'desc')

    return inertia.render('report/sale', {
      sales,
      totalSales,
      totalProducts,
      totalSold,
      newTransaksi,
      productTerlaris,
      selectDataPerDay,
      selectedPeriod: period, // Kirim kembali period yang dipilih
      startDate: startDate.toFormat('dd/MM/yyyy'),
      endDate: now.toFormat('dd/MM/yyyy'),
    })
  }
}