import Unit from '#models/unit'
import type { HttpContext } from '@adonisjs/core/http'

export default class UnitsController {
  /**
   * Display a list of resource
   */
  public async index({ inertia }: HttpContext) {
    return inertia.render('units/index')
  }

  /**
   * Display form to create a new record
   */
  public async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description'])
    const unit = new Unit()
    unit.merge(data)
    await unit.save()

    return response.created(unit)
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
  public async update({ params, request, response }: HttpContext) {
    const unit = await Unit.findOrFail(params.id)
    const data = request.only(['name', 'description'])
    unit.merge(data)
    await unit.save()

    return response.ok(unit)
  }

  /**
   * Delete record
   */
  public async destroy({ params, response }: HttpContext) {
    const unit = await Unit.findOrFail(params.id)
    await unit.delete()

    return response.ok({ message: 'Unit deleted successfully' })
  }
}
