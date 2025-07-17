import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    await Role.updateOrCreateMany('name', [
      { name: 'admin' },
      { name: 'cashier' },
      { name: 'manager' },
    ])
  }
}
