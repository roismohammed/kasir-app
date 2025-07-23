import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invoice_number: string

  @column({ columnName: 'product_id' })
  declare productId: number

  @column({ columnName: 'customer_id' })
  declare customerId: number

  @column()
  declare discount: number

  @column()
  declare grand_total: number

  @column()
  declare total_price: number

  @column()
  declare tax: number

  @column()
  declare payment_type: string

  @column()
  declare notes: string

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}