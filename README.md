# 🛒 Kasir-App (Point of Sale)

Selamat datang di **Kasir-App**, sebuah aplikasi Point of Sales (POS) sederhana namun powerfull yang dirancang untuk memudahkan manajemen transaksi.

Proyek ini menggunakan pendekatan **Monolith** modern dengan **Inertia.js**, memberikan pengalaman *Single Page Application* (SPA) namun dengan kenyamanan pengembangan sisi server.

---

## 🚀 Tech Stack

Aplikasi ini dibangun menggunakan kombinasi teknologi terkini:

* **Backend:** [AdonisJS](https://adonisjs.com/) (Robust Node.js Framework)
* **Frontend:** [React.js](https://reactjs.org/) dengan **TypeScript**
* **Bridge:** [Inertia.js](https://inertiajs.com/) (The modern monolith)
* **Data Management:** [TanStack Table](https://tanstack.com/table/v8) (Pengolahan data tabel yang efisien)
* **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)

---

## 🛠️ Cara Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di mesin lokal Anda:

### 1. Clone Repositori
```bash

gh repo clone roismohammed/kasir-app

cd nama-repo

2. Instal Dependensi
Gunakan flag --legacy-peer-deps untuk memastikan kompatibilitas antar library:

Bash
npm install --legacy-peer-deps

3. Konfigurasi Environment
Salin file .env.example menjadi .env dan sesuaikan konfigurasi database Anda:

Bash
cp .env.example .env
Pastikan server database Anda (MySQL/PostgreSQL) sudah aktif.

4. Jalankan Aplikasi
Jalankan server pengembangan:

Bash
npm run dev
Aplikasi dapat diakses melalui http://localhost:3333 (atau port sesuai konfigurasi AdonisJS Anda).

Saya sangat terbuka untuk diskusi, kolaborasi, atau sekadar bertukar pikiran mengenai pengembangan web. Mari terhubung di:
Dibuat dengan ❤️ untuk open source.
