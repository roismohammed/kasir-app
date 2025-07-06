import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, hasMany } from '@adonisjs/lucid/orm'
import Product from './product.js'
export default class Unit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}