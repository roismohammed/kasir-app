import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import Unit from '#models/unit'
import Supplier from '#models/supplier'
import Customer from '#models/customer'
import Product from '#models/product'

const categoryNames = ['Makanan', 'Minuman', 'Snack', 'ATK', 'Lainnya']
const unitNames = ['Pcs', 'Kg', 'Liter', 'Box', 'Pack']

const supplierData = [
  { name: 'PT Sumber Makmur', phone: '081234567891', address: 'Jl. Merdeka No. 1', description: 'Supplier bahan baku utama' },
  { name: 'CV Berkah Jaya', phone: '081234567892', address: 'Jl. Sudirman No. 2', description: 'Supplier minuman kemasan' },
  { name: 'UD Barokah', phone: '081234567893', address: 'Jl. Ahmad Yani No. 3', description: 'Supplier snack ringan' },
  { name: 'PT Indah Logistik', phone: '081234567894', address: 'Jl. Diponegoro No. 4', description: 'Supplier logistik' },
  { name: 'CV Maju Bersama', phone: '081234567895', address: 'Jl. Gajah Mada No. 5', description: 'Supplier ATK & alat tulis' },
]

const customerData = [
  { name: 'Budi Santoso', phone: '085111111111', address: 'Jl. Anggrek No.1', gender: 'male' },
  { name: 'Ani Wijaya', phone: '085111111112', address: 'Jl. Melati No.2', gender: 'female' },
  { name: 'Rudi Hermawan', phone: '085111111113', address: 'Jl. Mawar No.3', gender: 'male' },
  { name: 'Siti Nurhaliza', phone: '085111111114', address: 'Jl. Kenanga No.4', gender: 'female' },
  { name: 'Doni Prasetyo', phone: '085111111115', address: 'Jl. Dahlia No.5', gender: 'male' },
]

const productData = [
  { name: 'Nasi Goreng', barcode: '8991001', price: 15000, stock: 50, catIdx: 0, unitIdx: 0 },
  { name: 'Mie Ayam', barcode: '8991002', price: 12000, stock: 40, catIdx: 0, unitIdx: 0 },
  { name: 'Ayam Geprek', barcode: '8991003', price: 18000, stock: 30, catIdx: 0, unitIdx: 0 },
  { name: 'Es Teh Manis', barcode: '8991004', price: 5000, stock: 100, catIdx: 1, unitIdx: 2 },
  { name: 'Kopi Susu', barcode: '8991005', price: 8000, stock: 80, catIdx: 1, unitIdx: 2 },
]

export default class MasterDataSeeder extends BaseSeeder {
  async run() {
    // Categories
    const cats = await Promise.all(
      categoryNames.map((name) => Category.firstOrCreate({ name }, { description: `Kategori ${name}` }))
    )
    console.log(`  ✓ ${cats.length} categories`)

    // Units
    const units = await Promise.all(
      unitNames.map((name) => Unit.firstOrCreate({ name }, { description: `Satuan ${name}` }))
    )
    console.log(`  ✓ ${units.length} units`)

    // Suppliers
    for (const s of supplierData) {
      await Supplier.firstOrCreate({ name: s.name }, s)
    }
    console.log(`  ✓ ${supplierData.length} suppliers`)

    // Customers
    for (const c of customerData) {
      await Customer.firstOrCreate({ name: c.name }, c)
    }
    console.log(`  ✓ ${customerData.length} customers`)

    // Products
    for (const p of productData) {
      await Product.firstOrCreate(
        { barcode: p.barcode },
        {
          name: p.name,
          price: String(p.price),
          stock: String(p.stock),
          image: '',
          categoryId: cats[p.catIdx].id,
          unitId: units[p.unitIdx].id,
        }
      )
    }
    console.log(`  ✓ ${productData.length} products`)

    console.log('Seed completed!')
  }
}
