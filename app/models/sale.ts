import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import SaleProduct from './sale_product.js'
export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invoice_number: string

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

  @hasMany(() => SaleProduct)
  declare saleProducts: HasMany<typeof SaleProduct>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}