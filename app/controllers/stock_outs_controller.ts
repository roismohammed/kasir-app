import Product from '#models/product';
import StockOut from '#models/stock_out';
import Supplier from '#models/supplier';
import { StockOutValidator } from '#validators/stock_out';
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';

export default class StockOutsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('stockOut/index', {
      stock_out: await StockOut.query().preload('products').preload('suppliers').paginate(1, 10)
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const suppliers = await Supplier.all();
    const products = await Product.query().preload('category').preload('unit')
    return inertia.render('stockOut/create', {
      suppliers,
      products
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const stockOut = await request.validateUsing(StockOutValidator)
      await StockOut.create(stockOut)

      const product = await Product.findOrFail(stockOut.product_id)
      if(product){
        product.stock -= stockOut.quantity;
        await product.save();
      }

      session.flash('Success', 'Data berhasil di simpan')
      return response.redirect('/stock-out')
    } catch (error) {
      session.flash('error', 'Data gagal disimpan')
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const stockOut = await StockOut
      .query()
      .where('id', params.id)
      .preload('products')
      .preload('suppliers')
      .firstOrFail()

    const supplier = await Supplier.all()
    const products = await Product.query().preload('category').preload('unit')
    const formattedDate = DateTime.fromJSDate(stockOut.date).toFormat('yyyy-MM-dd')
    return inertia.render('stockOut/edit', {
      stockOut: {
        id: stockOut.id,
        date: formattedDate,
        product_id: stockOut.productId,
        supplier_id: stockOut.supplierId,
        description: stockOut.description,
        quantity: stockOut.quantity,
      },
      supplier,
      products,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    try {
      const stockOut = await StockOut.findOrFail(params.id)
      const data = await request.validateUsing(StockOutValidator)

      const product = await Product.findOrFail(stockOut.productId)
      if(product){
        product.stock += stockOut.quantity;
      }else{
        product.stock -= stockOut.quantity;
      }

      stockOut.merge(data)
      await stockOut.save()

      session.flash('Success', 'Data Berhasil di simpan')
      return response.redirect('/stock-out')
    } catch (error) {
      session.flash('Error', 'Stock Out Gagal Di simpan')
      return response.redirect('/stock-out')
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    try {
      const stockOut = await StockOut.findOrFail(params.id)

      const product = await Product.findOrFail(stockOut.productId)
      product.stock += stockOut.quantity
      await product.save()

      await stockOut.delete()

      session.flash('Success', 'Data berhasil di hapus ')
      return response.redirect('/stock-out')
    } catch (error) {
      session.flash('error', 'Data gagal di hapus ')
      return response.redirect('/stock-out')
    }
  }
}