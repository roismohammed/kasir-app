import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ZapIcon, 
  PackageIcon, 
  BarChartIcon, 
  UsersIcon, 
  CreditCardIcon, 
  SettingsIcon,
  CheckCircle,
  Star,
  PlayCircle,
  ChevronRight,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  Smartphone,
  Cloud,
  Database,
  Heart,
  MessageCircle,
  Award,
  ArrowRight
} from "lucide-react";
import dashboardPng from '../assets/image/dashboard.png'
import { Head } from "@inertiajs/react";
import GuestLayout from "~/layouts/guest-layout";

export default function Home() {
  return (
    <GuestLayout>
      <Head title="Payloop - Sistem POS Modern" />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section - Enhanced */}
        <section className="relative py-24 px-6 max-w-7xl mx-auto text-center">
          <div className="relative z-10">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              #1 Sistem POS di Indonesia 2024
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Sistem Kasir{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Modern
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-30"></span>
              </span>
              {' '}untuk Bisnis Anda
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Solusi Point of Sale terintegrasi yang mengoptimalkan operasional bisnis Anda. 
              Dari transaksi cepat hingga analisis mendalam - semua dalam satu platform.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 animate-fade-in-up animation-delay-500">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                <span>Coba Gratis 14 Hari</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 group">
                <PlayCircle className="mr-2 w-5 h-5" />
                <span>Tonton Demo</span>
                <ChevronRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-16 animate-fade-in-up animation-delay-700">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-900">5,000+</div>
                  <div className="text-sm text-gray-500">Bisnis Aktif</div>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <div>
                  <div className="font-bold text-gray-900">4.9/5.0</div>
                  <div className="text-sm text-gray-500">Rating Pengguna</div>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image with Glow Effect */}
          <div className="relative max-w-6xl mx-auto animate-fade-in-up animation-delay-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 transform -translate-y-4"></div>
            <div className="relative rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <img
                src={dashboardPng}
                alt="Payloop Dashboard Preview"
                className="w-full h-auto object-cover rounded-3xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-32"></div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section id="features" className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 text-sm font-medium mb-4">
                ✨ FITUR UNGGULAN
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Semua yang Dibutuhkan Bisnis Modern
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Platform lengkap yang menggabungkan teknologi terkini dengan kemudahan penggunaan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: ZapIcon,
                  title: "Transaksi Kilat",
                  description: "Proses pembayaran dalam 2 detik dengan teknologi caching mutakhir",
                  color: "from-blue-500 to-cyan-500",
                  features: ["Multi-pembayaran", "Offline mode", "Auto-sync"]
                },
                {
                  icon: PackageIcon,
                  title: "Inventaris AI",
                  description: "Prediksi stok otomatis dengan machine learning untuk optimasi inventaris",
                  color: "from-emerald-500 to-green-500",
                  features: ["Prediksi stok", "Multi-gudang", "Auto-reorder"]
                },
                {
                  icon: BarChartIcon,
                  title: "Analisis Real-time",
                  description: "Dashboard interaktif dengan insight bisnis yang dapat ditindaklanjuti",
                  color: "from-purple-500 to-pink-500",
                  features: ["Live dashboard", "Custom report", "Predictive analytics"]
                },
                {
                  icon: UsersIcon,
                  title: "CRM Cerdas",
                  description: "Sistem manajemen pelanggan dengan segmentasi otomatis dan personalisasi",
                  color: "from-amber-500 to-orange-500",
                  features: ["Loyalty program", "Auto-segmentation", "Campaign manager"]
                },
                {
                  icon: CreditCardIcon,
                  title: "Payment Hub",
                  description: "Integrasi dengan 50+ metode pembayaran termasuk QRIS dan e-wallet",
                  color: "from-violet-500 to-indigo-500",
                  features: ["Unified payments", "Split bills", "Digital receipts"]
                },
                {
                  icon: SettingsIcon,
                  title: "Custom Workflow",
                  description: "Sesuaikan alur kerja sesuai kebutuhan bisnis Anda dengan mudah",
                  color: "from-rose-500 to-red-500",
                  features: ["Drag & drop", "API access", "Plugin ecosystem"]
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader className="relative z-10">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center group/btn">
                        Pelajari lebih lanjut
                        <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Cara Kerja Payloop
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Mulai dari pendaftaran hingga menghasilkan laporan hanya dalam 4 langkah mudah
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0">
                {[
                  {
                    step: "01",
                    title: "Daftar Gratis",
                    description: "Buat akun dan mulai uji coba 14 hari tanpa biaya",
                    icon: UserPlus
                  },
                  {
                    step: "02",
                    title: "Setup Cepat",
                    description: "Import data produk dan konfigurasi sesuai kebutuhan",
                    icon: Settings
                  },
                  {
                    step: "03",
                    title: "Transaksi Aktif",
                    description: "Mulai proses penjualan dengan sistem yang intuitif",
                    icon: ShoppingCart
                  },
                  {
                    step: "04",
                    title: "Analisis & Scale",
                    description: "Pantau performa dan kembangkan bisnis Anda",
                    icon: TrendingUp
                  }
                ].map((step, index) => (
                  <div key={index} className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-50 border-4 border-white shadow-xl flex items-center justify-center mb-6">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {step.step}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <step.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials - Enhanced */}
        <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600 text-sm font-medium mb-4">
                💬 TESTIMONIAL
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Dipilih oleh Bisnis Terbaik
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ribuan bisnis telah meningkatkan produktivitas dengan Payloop
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Budi Santoso",
                  role: "Owner, Kopi Kenangan",
                  content: "Transaksi jadi 3x lebih cepat! Sistem inventaris real-time membantu kami mengurangi waste hingga 20%.",
                  rating: 5,
                  avatar: "BS",
                  color: "from-blue-400 to-cyan-400"
                },
                {
                  name: "Ani Wijaya",
                  role: "GM, Fashionista",
                  content: "Analisis bisnis Payloop membantu kami mengidentifikasi produk terlaris. Penjualan naik 35% dalam 3 bulan!",
                  rating: 5,
                  avatar: "AW",
                  color: "from-purple-400 to-pink-400"
                },
                {
                  name: "Rudi Setiawan",
                  role: "CEO, Sari Rasa Group",
                  content: "Program loyalitas terintegrasi meningkatkan kunjungan pelanggan tetap kami sebesar 60%.",
                  rating: 4,
                  avatar: "RS",
                  color: "from-emerald-400 to-green-400"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg mr-4`}>
                          {testimonial.avatar}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <Award className="w-3 h-3 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${
                              i < testimonial.rating 
                                ? "text-yellow-400 fill-current" 
                                : "text-gray-300"
                            }`} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b from-blue-400 to-purple-400 before:rounded-full">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>Dibagikan 42 kali</span>
                        </div>
                        <MessageCircle className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Trusted Brands */}
            <div className="mt-20">
              <p className="text-center text-gray-500 mb-8">Dipercaya oleh perusahaan terkemuka</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
                {["Shopee", "Gojek", "Traveloka", "Tokopedia", "Bukalapak"].map((brand, index) => (
                  <div key={index} className="text-2xl font-bold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-center text-white shadow-2xl">
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full animate-pulse animation-delay-2000"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">
                  Siap Mengubah Cara Bisnis Anda Beroperasi?
                </h2>
                <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                  Bergabunglah dengan komunitas bisnis modern yang sudah meningkatkan efisiensi dengan Payloop
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="px-10 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all"
                  >
                    <span>Mulai Gratis 14 Hari</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-10 py-6 text-lg border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    Jadwalkan Demo
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-sm opacity-80">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Keamanan Data Terjamin</span>
                  </div>
                  <div className="h-4 w-px bg-white/30"></div>
                  <div className="flex items-center">
                    <Cloud className="w-4 h-4 mr-2" />
                    <span>Cloud-based & Auto Backup</span>
                  </div>
                  <div className="h-4 w-px bg-white/30"></div>
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-2" />
                    <span>Mobile & Desktop Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Payloop
              </div>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Sistem POS modern untuk bisnis yang berkembang di era digital
              </p>
              <div className="flex justify-center gap-6 mb-8">
                {["Twitter", "Facebook", "Instagram", "LinkedIn", "YouTube"].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Payloop. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

    </GuestLayout>
  );
}

// Import additional icons if needed
const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const UserPlus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);