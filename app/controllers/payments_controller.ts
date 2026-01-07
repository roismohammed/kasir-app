import MidtransService from "#services/MidtransService"

export default class PaymentsController {
  async create({ request }) {
    const { order_id, amount, customer } = request.all()

    const payload = {
      transaction_details: {
        order_id,
        gross_amount: amount,
      },
      customer_details: {
        first_name: customer.name,
        email: customer.email,
      },
    }

    const result = await MidtransService.createTransaction(payload)

    return {
      token: result.token,
    }
  }
}
