import Bouncer from '@adonisjs/bouncer'
import User from '#models/user'

Bouncer.define('adminOnly', (user: User) => {
  return user.roles === 'admin'
})

Bouncer.define('editorOrAdmin', (user: User) => {
  return ['admin', 'editor'].includes(user.role)
})

export const named = Bouncer.named
