import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ZapIcon,
  PackageIcon,
  BarChartIcon,
  UsersIcon,
  CreditCardIcon,
  SettingsIcon,
  ArrowRight,
} from "lucide-react";
import dashboardPng from '../assets/image/dashboard.png'
import { Head } from "@inertiajs/react";
import GuestLayout from "~/layouts/guest-layout";

export default function Home() {
  return (
    <GuestLayout>
      <Head title="Payloop - Sistem POS Modern" />

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero */}
        <section className="py-20 px-6 max-w-6xl mx-auto text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistem Kasir{' '}
              <span className="text-blue-600">Modern</span>
              {' '}untuk Bisnis
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Solusi Point of Sale terintegrasi. Transaksi cepat, laporan real-time, dan manajemen stok otomatis.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Button size="lg" className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                <span>Coba Gratis 14 Hari</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Tonton Demo
              </Button>
            </div>

            {/* Hero Image */}
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg">
              <img
                src={dashboardPng}
                alt="Payloop Dashboard Preview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Fitur Unggulan
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Platform lengkap untuk kebutuhan operasional bisnis Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ZapIcon,
                  title: "Transaksi Cepat",
                  description: "Proses pembayaran dalam hitungan detik dengan berbagai metode pembayaran.",
                  color: "bg-blue-500",
                },
                {
                  icon: PackageIcon,
                  title: "Manajemen Stok",
                  description: "Pantau stok barang secara real-time, multi-gudang, dan notifikasi stok minimum.",
                  color: "bg-emerald-500",
                },
                {
                  icon: BarChartIcon,
                  title: "Laporan Penjualan",
                  description: "Dashboard interaktif dengan laporan harian, bulanan, dan tahunan.",
                  color: "bg-purple-500",
                },
                {
                  icon: UsersIcon,
                  title: "Manajemen Pelanggan",
                  description: "Catat riwayat transaksi dan kelola data pelanggan dengan mudah.",
                  color: "bg-amber-500",
                },
                {
                  icon: CreditCardIcon,
                  title: "Multi Pembayaran",
                  description: "Terima pembayaran tunai, QRIS, e-wallet, dan transfer bank.",
                  color: "bg-indigo-500",
                },
                {
                  icon: SettingsIcon,
                  title: "Kustomisasi",
                  description: "Sesuaikan fitur sesuai kebutuhan bisnis tanpa ribet.",
                  color: "bg-gray-500",
                },
              ].map((feature, index) => (
                <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className={`p-3 rounded-lg ${feature.color} w-fit mb-3`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Cara Kerja
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Mulai dari pendaftaran hingga laporan dalam 4 langkah
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Daftar", desc: "Buat akun dan mulai uji coba gratis" },
                { step: "02", title: "Setup", desc: "Import produk dan atur preferensi" },
                { step: "03", title: "Transaksi", desc: "Mulai proses penjualan" },
                { step: "04", title: "Analisis", desc: "Pantau performa bisnis" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-blue-600">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Siap Memulai?
            </h2>
            <p className="text-blue-200 mb-8 max-w-lg mx-auto">
              Coba gratis 14 hari. Tanpa kartu kredit. Batalkan kapan saja.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-10 py-6 text-lg bg-white text-blue-700 hover:bg-gray-100 shadow-lg">
                Mulai Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-10 py-6 text-lg border-2 border-white/80 text-white hover:bg-white/10">
                Jadwalkan Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-semibold text-gray-900 mb-1">Payloop</p>
            <p className="text-sm text-gray-500 mb-4">
              Sistem POS untuk bisnis modern
            </p>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Payloop.
            </p>
          </div>
        </footer>
      </div>
    </GuestLayout>
  );
}
