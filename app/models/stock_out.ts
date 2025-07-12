import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Supplier from './supplier.js'

export default class StockOut extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string

  @column({ columnName: 'product_id' })
  declare productId: number

  @column({ columnName: 'supplier_id' })
  declare supplierId: number

  @column()
  declare description: string

  @column()
  declare quantity: number

  @belongsTo(() => Product)
  declare products: BelongsTo<typeof Product>

  @belongsTo(() => Supplier)
  declare suppliers: BelongsTo<typeof Supplier>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}