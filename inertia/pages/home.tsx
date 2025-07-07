import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon, ZapIcon, PackageIcon, BarChartIcon, UsersIcon, CreditCardIcon, SettingsIcon } from "lucide-react";
import dashboardPng from '../assets/image/dashboard.png'
import { Head } from "@inertiajs/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head title="SwiftTill" />
      {/* Modern Header with Gradient */}
      <nav className="px-12 py-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <RocketIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gray-800">SwiftTill</span>
        </div>
        <div className="flex items-center text-center justify-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">
            Fitur
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">
            Harga
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">
            Testimoni
          </a>
          <Button variant="outline" className="border-primary text-primary">
            Masuk
          </Button>
          <Button>Daftar Gratis</Button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold  mb-6 drop-shadow-xl animate-fade-in-up">
          Revolusi Sistem Kasir Anda dengan <span className="text-orange-600">SwiftTill</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Solusi Point of Sale modern yang cepat, intuitif, dan penuh fitur untuk mengubah cara Anda berbisnis.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="px-8">
            Mulai Gratis 14 Hari
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Demo Produk
          </Button>
        </div>
        <div className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          <img
            src={dashboardPng}
            alt="SwiftTill Dashboard"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600 mb-4">
              FITUR UNGGULAN
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Semua yang Anda Butuhkan dalam Satu Sistem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solusi lengkap untuk mengelola bisnis retail, F&B, atau layanan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="p-3 rounded-lg bg-blue-100 w-fit mb-4">
                  <ZapIcon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Transaksi Super Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Proses pembayaran dalam hitungan detik dengan antarmuka yang dioptimalkan. Kurangi antrian hingga 70% dengan teknologi terbaru kami.
                </p>
              </CardContent>
            </Card>

          
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="p-3 rounded-lg bg-green-100 w-fit mb-4">
                  <PackageIcon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Inventaris Real-time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lacak stok secara otomatis, dapatkan notifikasi saat stok rendah, dan kelola beberapa gudang dalam satu sistem terpadu.
                </p>
              </CardContent>
            </Card>

 
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="p-3 rounded-lg bg-purple-100 w-fit mb-4">
                  <BarChartIcon className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Analisis Bisnis Mendalam</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Laporan cerdas dan dashboard interaktif membantu Anda memahami tren penjualan, produk terlaris, dan kinerja karyawan.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="p-3 rounded-lg bg-amber-100 w-fit mb-4">
                  <UsersIcon className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Manajemen Pelanggan Pintar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistem loyalitas terintegrasi, riwayat pembelian, dan segmentasi pelanggan untuk meningkatkan retensi dan penjualan berulang.
                </p>
              </CardContent>
            </Card>

  
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="p-3 rounded-lg bg-emerald-100 w-fit mb-4">
                  <CreditCardIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Pembayaran Fleksibel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dukung semua metode pembayaran: tunai, kartu, e-wallet, QRIS, bahkan cicilan. Proses pembayaran lebih cepat dengan teknologi NFC.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader>
                <div className="p-3 rounded-lg bg-rose-100 w-fit mb-4">
                  <SettingsIcon className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Kustomisasi Tanpa Batas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sesuaikan tampilan, workflow, dan fitur sesuai kebutuhan bisnis Anda. Tambahkan modul khusus untuk industri spesifik.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Lihat SwiftTill Pro dalam Aksi
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Sistem POS yang mengubah cara ribuan bisnis beroperasi
          </p>
          <div className="aspect-video bg-gray-200 rounded-xl shadow-xl overflow-hidden mx-auto max-w-4xl">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-lg font-medium text-blue-600">Tonton Demo 2 Menit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600 mb-4">
              HARGA TERJANGKAU
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pilih Paket yang Cocok untuk Bisnis Anda
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mulai dari usaha kecil hingga enterprise, kami punya solusinya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:border-orange-600 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-700">Starter</CardTitle>
                <div className="text-4xl font-bold text-gray-900">Rp299.000<span className="text-base font-normal text-gray-500">/bulan</span></div>
                <p className="text-gray-500">Untuk usaha kecil yang baru mulai</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> 1 Outlet
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> 3 Pengguna
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Transaksi Cepat
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Manajemen Stok Dasar
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-orange-500 text-orange-600 hover:bg-orange-50">
                  Mulai Sekarang
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-600 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-orange-600 text-white px-3 py-1 text-xs font-bold rounded-tr-lg rounded-bl-lg">
                POPULER
              </div>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <div className="text-4xl font-bold text-gray-900">Rp599.000<span className="text-base font-normal text-gray-500">/bulan</span></div>
                <p className="text-gray-500">Untuk bisnis yang sedang berkembang</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> 3 Outlet
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> 10 Pengguna
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Semua Fitur Transaksi
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Analisis Bisnis
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Manajemen Pelanggan
                  </li>
                </ul>
                <Button className="w-full ">
                  Mulai Sekarang
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-orange-600 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-700">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900">Rp1.299.000<span className="text-base font-normal text-gray-500">/bulan</span></div>
                <p className="text-gray-500">Untuk bisnis besar dengan kebutuhan khusus</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Unlimited Outlet
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Unlimited Pengguna
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Semua Fitur Premium
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Kustomisasi Lanjutan
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-600 mr-2">✓</span> Dukungan Prioritas
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-orange-500 text-orange-600 hover:bg-orange-50">
                  Hubungi Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600 mb-4">
              TESTIMONI PELANGGAN
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dipercaya oleh Ribuan Bisnis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan apa kata mereka tentang SwiftTill Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">BS</div>
                  <div>
                    <h4 className="font-bold">Budi Santoso</h4>
                    <p className="text-gray-500 text-sm">Pemilik Kedai Kopi Budi</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Transaksi jadi 3x lebih cepat dengan SwiftTill Pro. Sistem inventaris real-time membantu kami mengurangi waste bahan baku hingga 20%."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4">AW</div>
                  <div>
                    <h4 className="font-bold">Ani Wijaya</h4>
                    <p className="text-gray-500 text-sm">Manajer Retail Fashions</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Analisis bisnisnya membantu kami mengidentifikasi produk terlaris dan waktu penjualan puncak. Penjualan meningkat 35% dalam 3 bulan."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">RS</div>
                  <div>
                    <h4 className="font-bold">Rudi Setiawan</h4>
                    <p className="text-gray-500 text-sm">Pemilik Restoran Sari Rasa</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Program loyalitas terintegrasi meningkatkan kunjungan pelanggan tetap kami. Sekarang 60% penjualan berasal dari pelanggan yang kembali."
                </p>
                <div className="flex mt-4">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="px-30 mb-10 mt-10">
        <section className="py-20 px-6 bg-gradient-to-r rounded-3xl from-orange-200 to-orange-400 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Siap Mengubah Bisnis Anda?</h2>
            <p className="text-xl mb-10 opacity-90">
              Bergabung dengan 5.000+ bisnis yang sudah menggunakan SwiftTill Pro
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-8 bg-white  hover:bg-white/90">
                Mulai Gratis 14 Hari
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-white text-blue-500 hover:bg-white/10">
                Hubungi Sales
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 px-20 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <RocketIcon className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">SwiftTill Pro</span>
            </div>
            <p className="text-sm">
              Solusi POS modern untuk bisnis yang ingin berkembang lebih cepat dan efisien.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Produk</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Fitur</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Harga</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Update</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hubungi Kami</h4>
            <ul className="space-y-2">
              <li>hello@swifttillpro.com</li>
              <li>+62 21 1234 5678</li>
              <li>Sudirman Central Business District<br />Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} SwiftTill Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}