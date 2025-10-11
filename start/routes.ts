import AuthController from '#controllers/auth_controller'
import CategoriesController from '#controllers/categories_controller'
import CustomersController from '#controllers/customers_controller'
import DashboardController from '#controllers/dashboard_controller'
import ProductsController from '#controllers/products_controller'
import SalesController from '#controllers/sales_controller'
import StockInsController from '#controllers/stock_ins_controller'
import StockOutsController from '#controllers/stock_outs_controller'
import SuppliersController from '#controllers/suppliers_controller'
import UnitsController from '#controllers/units_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import ReportSalesController from '#controllers/report_sales_controller'
import ReportStockInsController from '#controllers/report_stock_ins_controller'
// import { middleware } from './kernel.js'
router.on('/').renderInertia('home')

router.group(() => {
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')
    router.resource('/suppliers', SuppliersController).as('suppliers')
    router.resource('/customers', CustomersController).as('customers')
    router.resource('/products', ProductsController).as('products')
    router.resource('/categories', CategoriesController).as('categories')
    router.resource('/units', UnitsController).as('units')
    router.resource('/stock-in', StockInsController).as('stock-in')
    router.resource('/stock-out', StockOutsController).as('stock-out')
    router.resource('/sales', SalesController).as('sales')
    router.post('/logout', [AuthController, 'logout']).as('logout')
    router.resource('/users', UsersController).as('users')
    router.get('/report', [ReportSalesController, 'index']).as('report')
    router.get('/report_stockin', [ReportStockInsController, 'index']).as('report_stock_in')
})
// .use(middleware.auth())
router.get('/login', [AuthController, 'index']).as('login')
router.post('/login', [AuthController, 'store']).as('login.store')  
