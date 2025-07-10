import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('barcode').unique()
      table.string('name')
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.integer('unit_id').unsigned().references('units.id').onDelete('CASCADE')
      table.integer('stock').defaultTo(0)
      table.string('price')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}