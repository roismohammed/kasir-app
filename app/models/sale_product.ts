import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Sale from './sale.js'
import Product from './product.js'

export default class SaleProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'sale_id' })
  declare saleId: number

  @column({ columnName: 'product_id' })
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
