import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('invoice_number').nullable().unique()
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE').nullable()
      table.enum('payment_type', ['cash', 'card', 'qris']).notNullable()
      table.decimal('discount', 12, 2).defaultTo(0)
      table.decimal('grand_total', 12, 2).notNullable()
      table.decimal('total_price', 12, 2).notNullable()
      table.decimal('tax', 12, 2).defaultTo(0)
      table.text('notes').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}