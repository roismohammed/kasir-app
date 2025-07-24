import type { HttpContext } from '@adonisjs/core/http'

export default class ReportStockInsController {
    async index({ inertia }: HttpContext) {
        return inertia.render('report/stockIn')
    }
}