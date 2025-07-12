import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import StockIn from './stock_in.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import StockOut from './stock_out.js'
export default class Supplier extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column()
  declare description: string

  @hasMany(() => StockIn)
  declare stockIn: HasMany<typeof StockIn>

  @hasMany(() => StockOut)
  declare stockOut: HasMany<typeof StockOut>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}