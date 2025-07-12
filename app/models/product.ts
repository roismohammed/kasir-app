import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import Unit from './unit.js'
import StockIn from './stock_in.js'
import StockOut from './stock_out.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare barcode: string

  @column()
  declare name: string

  @column({ columnName: 'category_id' })
  declare categoryId: number

  @column({ columnName: 'unit_id' })
  declare unitId: number

  @column()
  declare price: string

  @column()
  declare stock: string

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Unit)
  declare unit: BelongsTo<typeof Unit>

  @hasMany(() => StockIn)
  public stockIns: HasMany<typeof StockIn>

  @hasMany(() => StockOut)
  public stockouts: HasMany<typeof StockOut>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
