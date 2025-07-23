import Category from '#models/category'
import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const selectedCategoryId = request.input('category_id')
    const sales = await Sale.query()
      .preload('customer')
      .preload('product', (product) => {
        product.preload('category')
      })
    const productsQuery = Product.query()
      .preload('category')
      .where('stock', '>', 0)

    if (selectedCategoryId) {
      productsQuery.where('category_id', selectedCategoryId)
    }
    const products = await productsQuery.exec()
    const categories = await Category.query().preload('products', (product) => {
      product.select('id', 'name', 'stock').where('stock', '>', 0)
    })
    return inertia.render('sales/index', { sales, products, categories })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('sales/create')
  }

  /**
   * Handle form submission for the create action
   */
  // Di controller backend
async store({ request, response, session }: HttpContext) {
  const {
    invoice_number,
    customer_id,
    payment_type,
    discount,
    grand_total,
    total_price,
    tax,
    notes,
    items,
  } = request.all();

  if (!items || items.length === 0) {
    session.flash('error', 'Tidak ada produk yang dipilih');
    return response.redirect().back();
  }

  try {
    const sale = await Sale.create({
      invoice_number,
      customerId: customer_id,
      payment_type,
      discount,
      grand_total,
      total_price,
      tax,
      notes,
    });

    for (const item of items) {
      // Simpan detail item penjualan
      await sale.related('product').create({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      });

      // Kurangi stok produk
      const product = await Product.find(item.product_id);
      if (product) {
        product.stock = product.stock - item.quantity;
        await product.save();
      }
    }

    session.flash('success', 'Penjualan berhasil disimpan');
    return response.redirect().toRoute('sales.index');

  } catch (error) {
    console.error(error);
    session.flash('error', 'Terjadi kesalahan saat menyimpan penjualan.');
    return response.redirect().back();
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