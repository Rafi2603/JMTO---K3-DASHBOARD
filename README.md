
# Dashboard Monitoring K3

**Dashboard Monitoring K3** adalah aplikasi berbasis web yang digunakan oleh PT JMTO di Departemen Legal dan Manajemen Risiko untuk mengelola dan memonitor data keselamatan kerja (K3). Aplikasi ini memiliki fitur yang dirancang khusus untuk memfasilitasi pencatatan, pemantauan, dan pelaporan data K3 dengan berbagai opsi tampilan dan ekspor data.

## Tujuan Proyek
Tujuan utama dari aplikasi ini adalah menyediakan platform yang terpusat dan interaktif untuk manajemen data K3, sehingga memudahkan pengguna dalam mengakses informasi keselamatan kerja secara real-time, serta mendukung pemenuhan standar keselamatan yang diharuskan oleh regulasi.

## Fitur Utama

1. **Menampilkan Tabel Rekap Data K3**: 
   - Data K3 dari berbagai *ruas* seperti Jagorawi, Bali, Cikampek, dan Belmera ditampilkan dalam tabel interaktif dengan fitur sorting dan searching menggunakan **DataTables**.
   - Ekspor tabel ke file PDF menggunakan **jsPDF** dan **autoTable** untuk dokumentasi atau pelaporan.

2. **Menambah Data K3**:
   - Halaman input untuk menambah data K3 baru dengan form khusus untuk input yang sesuai dengan data K3 yang diperlukan.

3. **Memperbarui Data K3**:
   - Halaman input untuk memperbarui data K3 yang sudah ada sebelumnya dengan form khusus untuk input yang sesuai dengan data K3 yang diperlukan.

4. **Fitur Admin**:
   - Fitur khusus untuk admin yang memungkinkan akses ke seluruh data dari setiap *ruas* dan kemampuan mengekspor data tersebut ke dalam format **Excel**.
   - Halaman khusus untuk admin yang memuat tabel data dari tiap *ruas* dengan opsi untuk melihat semua data atau mengekspor data secara keseluruhan ke file Excel.

5. **Tabel Spesifik per Ruas**:
   - Setiap *ruas* memiliki tabel-tabel data spesifik yang terdiri dari berbagai kategori seperti:
     - **Personel K3**: Data terkait personel yang bertugas dalam bidang keselamatan kerja.
     - **Kecelakaan Kerja**: Mencatat insiden kecelakaan dengan rincian lengkap seperti tanggal, NIK, nama, jabatan, dan detail kecelakaan.
     - **Kejadian Darurat**: Dokumentasi kejadian darurat dengan kronologi, tindakan lanjutan, serta bukti pendukung.
     - **Rekap Data K3**: Ringkasan data keselamatan kerja per bulan, meliputi jumlah karyawan, jam kerja, dan metrik keselamatan.
     - **Struktur Organisasi**: Informasi struktur organisasi terkait personel K3.
     - **Checklist K3**: Data pemeriksaan checklist K3 dengan parameter keselamatan yang berbeda.

6. **Autentikasi User**:
   - Halaman login untuk autentikasi berdasarkan `ruas` dan `pass_ruas`, di mana setiap pengguna dapat mengakses data sesuai hak akses masing-masing. Admin memiliki akses tambahan untuk mengelola seluruh data dari setiap *ruas*.

## Teknologi yang Digunakan

- **Node.js**: Server-side environment.
- **Express.js**: Framework backend untuk routing dan pengaturan API.
- **PostgreSQL**: Database untuk penyimpanan data.
- **Bootstrap 5**: Library frontend untuk membuat antarmuka yang responsif dan menarik.
- **DataTables**: Plugin jQuery untuk sorting dan searching pada tabel.
- **jsPDF** dan **autoTable**: Untuk mengekspor tabel dalam bentuk PDF.
- **ExcelJS**: Untuk mengekspor data K3 ke dalam format Excel.

## Struktur Folder

```plaintext
├── Backend/
│   ├── index.js        # File utama backend
|   ├── package-lock.json
|   ├── package.json
|   ├── configs/
|       ├── db.js           # Koneksi dan query ke PostgreSQL
│   
├── Database/
|   ├── input_query.sql
|   ├── query.sql
|
├── public/
│   ├── index.html                # Halaman utama untuk menampilkan data K3
│   ├── admin_dashboard.html      # Halaman khusus admin untuk melihat seluruh data ruas
│   ├── [ruas]/
|       ├── add-checklist-[ruas].html
|       ├── add-data-[ruas].html
|       ├── add-kecelakaan-[ruas].html
|       ├── add-kejadian-[ruas].html
|       ├── add-personel-[ruas].html
|       ├── rekap-data-[ruas].html
|       ├── update-data-[ruas].html
|       ├── update-kecelakaan-[ruas].html
|       ├── update-kejadian-[ruas].html
|       ├── update-personel-k3-[ruas].html
|       ├── update-struktur-[ruas].html
|       ├── script-[ruas].js
└── README.md           # Dokumentasi project
```

## Instalasi

1. **Clone repository ini**: 
   ```bash
   git clone https://github.com/Rafi2603/JMTO---K3-DASHBOARD.git
   ```

2. **Masuk ke direktori project**:
   ```bash
   cd JMTO---K3-DASHBOARD
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Jalankan server**:
   ```bash
   node Backend/index.js
   ```

5. **Akses aplikasi** di browser:
   ```
   http://localhost:3000
   ```

## Catatan Tambahan
- **Autentikasi**: Proyek ini menggunakan autentikasi berbasis *ruas* untuk mengakses data. Admin dapat melihat data dari seluruh *ruas* dan mengekspor semua data sekaligus ke dalam file Excel.
- **Ekspor Data**: Admin dapat mengekspor data seluruh *ruas* ke file Excel melalui halaman admin dengan mengakses `admin.html`.

## Pengembangan Mendatang
- **Peningkatan keamanan autentikasi**: Menambahkan enkripsi kata sandi dan autentikasi berbasis token.
- **Integrasi fitur notifikasi**: Memberikan notifikasi kepada user mengenai data K3 tertentu atau update yang relevan.
