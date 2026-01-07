import midtransClient from 'midtrans-client'
import env from '#start/env'

class MidtransService {
  public snap

  constructor() {
    this.snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: env.get('MIDTRANS_SERVER_KEY'),
    })
  }

  async createTransaction() {
    return this.snap.createTransaction({
      transaction_details: {
        order_id: 'ORDER-' + Date.now(),
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: 'Budi',
        last_name: 'Pratama',
        email: 'budi@example.com',
        phone: '08111222333',
      },
    })
  }
}

export default new MidtransService()
