// app/models/sale_product.ts
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sale from './sale.js'
import Product from './product.js'

export default class SaleProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare saleId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column()
  declare price: number

  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
