import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class StrucksController {
  async index({ params, inertia }: HttpContext) {
    const transaction = await Sale.query()
      .where('id', params.id)
      .preload('customer') 
      .preload('saleProducts', (query) => {
        query.preload('product') 
      })
      .firstOrFail()

    // Map items dari saleProducts
    const items = transaction.saleProducts.map(item => ({
      name: item.product.name,
      price: item.price,
      qty: item.quantity,
    }))

    // Format customer info
    const customerInfo = transaction.customer 
      ? `${transaction.customer.name}\n${transaction.customer.phone || ''}\n${transaction.customer.address || ''}`
      : 'Pelanggan Umum'

    return inertia.render('sales/partials/invoice', {
      invoiceNumber: transaction.invoice_number,
      customerInfo: customerInfo,
      invoiceDate: transaction.createdAt.toFormat('dd LLL yyyy'),
      dueDate: transaction.createdAt.plus({ days: 7 }).toFormat('dd LLL yyyy'),
      items: items,
      notes: transaction.notes || 'Terima kasih atas pembelian Anda',
      subtotal: transaction.total_price, 
      discount: transaction.discount,
      tax: transaction.tax,
      grandTotal: transaction.grand_total, 
      paymentType: transaction.payment_type,
      paid: transaction.grand_total,
      change: 0,
    })
  }
}