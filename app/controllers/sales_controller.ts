import Category from '#models/category'
import Product from '#models/product'
import Sale from '#models/sale'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async index({ inertia, request }: HttpContext) {
    const selectedCategoryId = request.input('category_id')
    const sales = await Sale.query()
      .preload('customer')
      .preload('saleProducts', (saleProduct) => {
        saleProduct.preload('product', (product) => {
          product.preload('category')
        })
      })

    const productsQuery = Product.query().preload('category').where('stock', '>', 0)
    if (selectedCategoryId) {
      productsQuery.where('category_id', selectedCategoryId)
    }

    const products = await productsQuery.exec()
    const categories = await Category.query().preload('products', (product) => {
      product.select('id', 'name', 'stock').where('stock', '>', 0)
    })
    return inertia.render('sales/index', {
      sales,
      categories,
      products,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = request.only([
      'invoice_number',
      'customer_id',
      'payment_type',
      'discount',
      'grand_total',
      'total_price',
      'tax',
      'notes',
      'items',
    ])

    const { items, ...saleData } = payload

    if (!items || items.length === 0) {
      session.flash('error', 'Item tidak boleh kosong')
      return response.redirect().back()
    }

    try {
      const sale = await Sale.create(saleData)
      const saleItems = items.map((item: any) => ({
        saleId: sale.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }))

      for (const item of items) {
        const product = await Product.findOrFail(item.productId)
        product.stock = Number(product.stock) - Number(item.quantity)
        await product.save()
      }

      await SaleProduct.createMany(saleItems)

      session.flash('success', 'Transaksi berhasil disimpan!')
      return response.redirect().toRoute('sales.index')
    } catch (error) {
      console.error(error)
      session.flash('error', 'Terjadi kesalahan saat menyimpan transaksi')
      return response.redirect().toRoute('sales.index')
    }
  }
}

