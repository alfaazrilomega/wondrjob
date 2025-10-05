# Analisis Sistem dan Rencana Pengembangan

Dokumen ini merangkum analisis dari struktur database dan rencana pengembangan berdasarkan permintaan pengguna.

## 1. Analisis Skema Database (`prisma/schema.prisma`)

- **`User`**: Model utama untuk pengguna.
  - Memiliki kolom `role` (enum: `ADMIN`, `SOCIETY`, `COMPANY`, `HRD`). Default: `SOCIETY`.
  - Terhubung ke `Society`, `Company`, dan `Admin`.

- **`Society`**: Profil untuk pencari kerja.
  - Menyimpan informasi personal dan keahlian (`skills`).

- **`Company`**: Profil untuk perusahaan.
  - Menyimpan informasi perusahaan dan terhubung dengan lowongan kerja (`AvailablePosition`).

- **`Admin`**: Model khusus untuk admin.
  - Terhubung dengan `User` dan memiliki kredensial sendiri (`password`). Ini mengindikasikan mekanisme otentikasi yang mungkin berbeda.

- **`HRD`**: Peran ini sudah ada di enum `UserRole`, tetapi **tidak ada model yang menghubungkan HRD ke perusahaan tertentu**. Ini adalah celah utama yang harus diatasi.

## 2. Rencana Implementasi

### Fase 1: Perbaikan Struktur & UI Dasar

1.  **Modifikasi Skema Database:**
    - Tambahkan model `HRD` baru untuk membuat relasi antara `User` dan `Company`.
    - Model ini akan berisi `userId` dan `companyId`.

2.  **Perubahan UI Halaman Profil:**
    - Identifikasi file layout di `src/app/profile/`.
    - Hapus komponen header.
    - Tambahkan tombol "Kembali" (Back Button) yang fungsional.

### Fase 2: Fitur Manajemen Peran (Role Management)

1.  **Backend (API Endpoint):**
    - Buat endpoint `POST /api/role-management/change-role`:
      - Menerima `targetRole` dan data tambahan (`companyId`, dll.).
      - Melakukan validasi berdasarkan peran yang diminta.
      - Mengubah `role` pada model `User`.
      - Membuat entitas baru jika diperlukan (misal: entitas di model `HRD` yang baru).
    - Buat endpoint `POST /api/companies/create`:
      - Menerima data perusahaan baru.
      - Membuat entitas `Company` baru.
      - Mengubah peran pengguna yang membuat menjadi `COMPANY`.

2.  **Frontend (UI):**
    - Buat halaman baru (misal: `/profile/settings/role`) untuk manajemen peran.
    - UI akan menampilkan opsi peran (`Society`, `Company`, `HRD`).
    - Form akan berubah secara dinamis berdasarkan pilihan:
      - **Menjadi Company:** Opsi untuk membuat perusahaan baru atau (opsional) bergabung dengan yang sudah ada.
      - **Menjadi HRD:** Input untuk memasukkan `companyId`.
    - Buat halaman dan form untuk membuat perusahaan baru (`/company/create`).

### Fase 3: Peran Admin dan Perbaikan Logika

1.  **Fitur Admin:**
    - Implementasikan logika login khusus untuk admin (sesuai email yang ditentukan: `alfajriazril1@gmail.com`).
    - Buat halaman dashboard admin di mana admin bisa:
      - Membuat pengguna baru dengan peran apa pun.
      - Membuat perusahaan.
      - Mengelola data lain (fitur penuh).

2.  **Perbaikan Logika Halaman Profil:**
    - Setelah fitur utama selesai, lakukan review dan perbaikan pada:
      - `src/app/profile/page.tsx`
      - `src/app/profile/edit/form.tsx`
    - Fokus pada alur pengambilan data, pembaruan (update), dan penanganan state untuk memastikan semua berjalan sesuai harapan.

