
import { Bouncer } from '@adonisjs/bouncer'

export const RolePolicy = Bouncer.define('is', async (user, roleName: string) => {
  await user.load('role')
  return user.role?.name === roleName
})