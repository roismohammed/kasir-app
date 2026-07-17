import Unit from '#models/unit'
import type { HttpContext } from '@adonisjs/core/http'

export default class UnitsController {
  /**
   * Display a list of resource
   */
  public async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    return inertia.render('units/index', {
      units: await Unit.query().orderBy('created_at', 'desc').paginate(page, 10)
    }
    )
  }

  /**
   * Display form to create a new record
   */
  public async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  public async store({ request, session, response }: HttpContext) {
    const data = request.only(['name', 'description'])
    const unit = new Unit()
    unit.merge(data)
    await unit.save()

    session.flash('success', 'Unit berhasil ditambahkan')
    return response.redirect('/units')
  }

  /**
   * Show individual record
   */
  public async show({ params, response }: HttpContext) {
    const unit = await Unit.findOrFail(params.id)

    return response.ok(unit)
  }

  /**
   * Edit individual record
   */
  public async edit({ params }: HttpContext) {
    const unit = await Unit.findOrFail(params.id)

    return unit
  }

  /**
   * Handle form submission for the edit action
   */
  public async update({ params, session, request, response }: HttpContext) {
    const unit = await Unit.findOrFail(params.id)
    const data = request.only(['name', 'description'])
    unit.merge(data)
    await unit.save()

    session.flash('success', 'Unit berhasil di update')
    return response.redirect('/units')
  }

  /**
   * Delete record
   */
  public async destroy({ params, response }: HttpContext) {
    const unit = await Unit.findOrFail(params.id)
    await unit.delete()

    return response.redirect('/units')
  }
}
