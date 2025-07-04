/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import DashboardController from '#controllers/dashboard_controller'
import SuppliersController from '#controllers/suppliers_controller'
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')

router.get('/dashboard', [DashboardController,'index']).as('dashboard')
router.resource('/suppliers', SuppliersController).as('suppliers')
