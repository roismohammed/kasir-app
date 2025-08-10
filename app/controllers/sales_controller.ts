import Category from '#models/category'
import Product from '#models/product'
import Sale from '#models/sale'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  /**
   * Display a list of resource
   */


  // SaleController.ts
  async index({ inertia, request }: HttpContext) {
    const selectedCategoryId = request.input('category_id')
    const sales = await Sale.query()
      .preload('customer')
      .preload('saleProducts', (saleProduct) => {
        saleProduct.preload('product', (product) => {
          product.preload('category')
        })
      })

    const productsQuery = Product.query()
      .preload('category')
      .where('stock', '>', 0)
    if (selectedCategoryId) {
      productsQuery.where('category_id', selectedCategoryId)
    }

    const products = await productsQuery.exec()
    const categories = await Category.query().preload('products', (product) => {
      product
        .select('id', 'name', 'stock')
        .where('stock', '>', 0)
    })

    return inertia.render('sales/index', {
      sales,
      products,
      categories
    })
  }
  async store({ request, response }: HttpContext) {
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
      return response.badRequest({ message: 'Item produk tidak boleh kosong' })
    }
    try {
      const sale = await Sale.create(saleData)

      const saleItems = items.map((item: any) => ({
        saleId: sale.id,
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }))

      await SaleProduct.createMany(saleItems)
      return response.redirect().toRoute('sales.index')
    } catch (error) {
      console.log(error);
    }
  }



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
  // async destroy({ params }: HttpContext) { }
}