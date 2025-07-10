import Category from '#models/category'
import Product from '#models/product'
import Unit from '#models/unit'
import { ProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
export default class ProductsController {
  /**
   * Display a list of resource
   */
  public async index({ inertia }: HttpContext) {
    const products = await Product.query().preload('category').preload('unit').paginate(1, 10)
    // const stockin = await Product.query().where('stock' )

    // products.stock_in += hasil
    return inertia.render('product/index', { products })
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

    const validateBarcode = await Product.findBy('barcode', data.barcode)
    // if (validateBarcode) {
    //   session.flash('errors', {
    //     barcode: ['Barcode sudah dipakai']
    //   })
    //   return response.redirect().back()
    // }

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

    await product.delete()

    session.flash('success', 'Product berhasil dihapus')
    return response.redirect('/products')
  }
}
