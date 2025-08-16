import Category from '#models/category'
import Product from '#models/product'
import Unit from '#models/unit'
import { ProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
export default class ProductsController {
  /**
   * Display a list of resource
   */
  public async index({ inertia }: HttpContext) {
    const products = await Product.query()
      .preload('category')
      .preload('unit')
      .paginate(1, 10)

    return inertia.render('product/index', {
      products,
    })
  }


  /**
   * Display form to create a new record
   */
  public async create({ inertia }: HttpContext) {
    const categories = await Category.all()
    const unit = await Unit.all()

    return inertia.render('product/create', {
      categories,
      unit
    })
  }

  /**
   * Handle form submission for the create action
   */
  public async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(ProductValidator)
    const image = request.file('image')

    if (image) {
      await image.move(app.makePath('storage/products'))

  
      data.image = image.fileName!
    }
    await Product.create(data)
    session.flash('success', 'Product berhasil ditambahkan')
    return response.redirect('/products')
  }

  /**
   * Show individual record
   */
  public async show({ params, inertia }: HttpContext) {
    const product = await Product.findOrFail(params.id);

    return inertia.render('product/show', { product })
  }

  /**
   * Edit individual record
   */
  public async edit({ params, inertia }: HttpContext) {
    const product = await Product.query().where('id', params.id).preload('category').preload('unit').firstOrFail()
    const categories = await Category.all()
    const unit = await Unit.all()

    return inertia.render('product/edit', { product, categories, unit })
  }

  /**
   * Handle form submission for the edit action
   */
  public async update({ params, request, response, session }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const data = await request.validateUsing(ProductValidator)

    product.merge(data)
    await product.save()

    session.flash('success', 'Product berhasil diperbarui')
    return response.redirect('/products')
  }

  /**
   * Delete record
   */
  public async destroy({ params, response, session }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    // Ambil semua data stock-in yang terkait dengan produk ini
    const stockIns = await product.related('stockIns').query()

    // Hitung total quantity dari stock-in
    const totalStockIn = stockIns.reduce((total, stockIn) => total + stockIn.quantity, 0)

    // Kurangi total dari stok sekarang
    product.stock -= totalStockIn
    await product.save()

    // Setelah stok dikurangi, baru produk dihapus
    await product.delete()

    session.flash('success', 'Product berhasil dihapus & stok dikurangi')
    return response.redirect('/products')
  }

}
