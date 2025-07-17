import { BaseSchema } from '@adonisjs/lucid/schema'


export default class Roles extends BaseSchema {
  public async up () {
    this.schema.createTable('roles', (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable('roles')
  }
}