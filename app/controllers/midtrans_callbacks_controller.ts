import { Env } from '@adonisjs/core/env'
import midtransClient from 'midtrans-client'

export default class MidtransCallbackController {
  async handle({ request, response }) {
    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: Env.get('MIDTRANS_SERVER_KEY'),
    })

    const status = await core.transaction.status(
      request.input('order_id')
    )

    // settlement | pending | expire | cancel
    // update status order di database

    return response.ok({ success: true })
  }
}
