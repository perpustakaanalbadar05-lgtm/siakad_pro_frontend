# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# SIAKAD IAIMU

Sistem Informasi Akademik Institut Agama Islam Miftahul Ulum Pamekasan

Versi: 1.0

Status: Draft

---

# BAB 1 - EXECUTIVE SUMMARY

## 1.1 Latar Belakang

Institut Agama Islam Miftahul Ulum Pamekasan (IAIMU) membutuhkan sebuah Sistem Informasi Akademik (SIAKAD) modern yang mampu mendukung seluruh proses akademik, administrasi, keuangan, pembelajaran, dan layanan kampus secara terintegrasi.

Saat ini banyak sistem akademik yang digunakan oleh perguruan tinggi masih memiliki beberapa keterbatasan seperti:

- Tampilan yang kurang modern.
- Sulit dikembangkan.
- Sulit dipelihara.
- Ketergantungan pada vendor tertentu.
- Tidak terintegrasi dengan seluruh proses kampus.
- Tidak siap untuk pengembangan aplikasi mobile.
- Tidak memiliki arsitektur yang mendukung pertumbuhan jangka panjang.

SIAKAD IAIMU dirancang sebagai platform akademik terintegrasi yang modern, scalable, aman, dan mudah dikembangkan untuk mendukung kebutuhan institusi dalam jangka panjang.

---

## 1.2 Tujuan Sistem

Membangun platform akademik terpadu yang mampu mengelola seluruh aktivitas kampus dalam satu sistem yang terintegrasi.

Sistem harus mampu melayani:

- Mahasiswa
- Dosen
- Admin Akademik
- Fakultas
- Program Studi
- Keuangan
- PMB
- Perpustakaan
- Alumni
- Orang Tua/Wali
- Pimpinan Kampus

dengan pengalaman pengguna yang modern dan efisien.

---

## 1.3 Nama Produk

Nama Sistem:

SIAKAD IAIMU

Kepanjangan:

Sistem Informasi Akademik Institut Agama Islam Miftahul Ulum Pamekasan

---

## 1.4 Visi Produk

Menjadi platform akademik digital terpadu yang modern, aman, dan berkelanjutan untuk mendukung transformasi digital Institut Agama Islam Miftahul Ulum Pamekasan.

---

## 1.5 Misi Produk

1. Mendigitalisasi seluruh proses akademik kampus.

2. Meningkatkan efisiensi administrasi akademik.

3. Mempermudah layanan mahasiswa dan dosen.

4. Menyediakan data akademik yang akurat dan real-time.

5. Mendukung integrasi dengan PDDIKTI.

6. Menyediakan fondasi teknologi yang mudah dikembangkan di masa depan.

---

## 1.6 Ruang Lingkup Sistem

Sistem akan mencakup:

### Akademik

- Dashboard
- Kalender Akademik
- KRS
- KHS
- Jadwal Kuliah
- Presensi
- Nilai
- Transkrip
- Yudisium
- Wisuda

### PMB

- Pendaftaran Online
- Upload Berkas
- Seleksi
- Pengumuman

### Keuangan

- Tagihan
- Pembayaran
- Cicilan
- Virtual Account Ready
- Laporan

### SDM

- Data Dosen
- BKD
- Jabatan Fungsional
- Sertifikasi

### Perpustakaan

- Katalog Buku
- Peminjaman
- Pengembalian
- Denda

### E-Learning

- Materi
- Tugas
- Quiz
- CBT

### Surat Menyurat

- Surat Aktif Kuliah
- Surat Riset
- Surat Magang
- Legalisir

### Alumni

- Tracer Study
- Survey Alumni
- Database Alumni

---

## 1.7 Fakultas dan Program Studi

### Fakultas Dakwah

- Bimbingan dan Penyuluhan Islam (BPI)
- Manajemen Dakwah (MD)

### Fakultas Syariah

- Hukum Keluarga Islam (HKI)
- Ekonomi Syariah (ES)

### Fakultas Tarbiyah

- Pendidikan Agama Islam (PAI)
- Pendidikan Bahasa Arab (PBA)

---

## 1.8 Target Pengguna

### Mahasiswa

Perkiraan:
1000+ pengguna

### Dosen

Perkiraan:
200 pengguna

### Staff dan Admin

Perkiraan:
20+ pengguna

### Alumni

Tidak terbatas

### Orang Tua/Wali

Tidak terbatas

---

## 1.9 Prinsip Pengembangan

Sistem harus memenuhi prinsip:

### Modular

Setiap modul dapat dikembangkan secara terpisah.

### Maintainable

Mudah diperbaiki dan dipelihara.

### Scalable

Mampu menangani pertumbuhan data dan pengguna.

### Secure

Mengutamakan keamanan data akademik.

### API First

Seluruh komunikasi menggunakan REST API.

### Mobile Ready

Siap digunakan oleh aplikasi mobile di masa depan.

### Audit Ready

Seluruh aktivitas dapat ditelusuri melalui audit log.

---

## 1.10 Sasaran Jangka Panjang

Versi 1.0

- Akademik
- PMB
- Keuangan
- E-Learning
- Perpustakaan

Versi 2.0

- Mobile Application
- WhatsApp Notification
- Integrasi Payment Gateway
- Dashboard Analytics Lanjutan

Versi 3.0

- AI Academic Assistant
- Smart Academic Recommendation
- Prediksi Kelulusan Mahasiswa
- Integrasi Sistem Nasional Tambahan

---

## 1.11 Indikator Keberhasilan

Sistem dianggap berhasil apabila:

- Seluruh proses akademik berjalan digital.
- Data akademik terpusat.
- Pengelolaan KRS dan KHS berjalan online.
- Laporan akademik dapat dihasilkan secara otomatis.
- Integrasi PDDIKTI dapat dilakukan.
- Waktu pelayanan administrasi berkurang minimal 70%.
- Kepuasan pengguna meningkat secara signifikan.

# BAB 2 - BUSINESS REQUIREMENTS & STAKEHOLDER ANALYSIS

# 2.1 Tujuan Bisnis

SIAKAD IAIMU dibangun untuk mendukung transformasi digital Institut Agama Islam Miftahul Ulum Pamekasan dengan mengintegrasikan seluruh proses akademik, administrasi, keuangan, pembelajaran, dan layanan kampus ke dalam satu platform terpusat.

Tujuan utama sistem:

- Mengurangi proses manual.
- Meningkatkan akurasi data.
- Mempercepat pelayanan akademik.
- Menyediakan informasi real-time.
- Mendukung pengambilan keputusan pimpinan.
- Mendukung integrasi dengan PDDIKTI.
- Menyediakan fondasi sistem yang dapat berkembang dalam jangka panjang.

---

# 2.2 Permasalahan Saat Ini

Beberapa permasalahan yang umum terjadi pada pengelolaan akademik kampus:

## Akademik

- Pengelolaan data mahasiswa tersebar.
- KRS dilakukan secara manual atau semi digital.
- Rekap nilai memerlukan waktu lama.
- Sulit memonitor progres studi mahasiswa.

## Administrasi

- Pembuatan surat membutuhkan proses manual.
- Verifikasi dokumen memerlukan banyak tahapan.

## Keuangan

- Monitoring pembayaran tidak real-time.
- Rekonsiliasi pembayaran membutuhkan waktu lama.

## Pembelajaran

- Materi dan tugas tidak terpusat.
- Sulit melakukan monitoring aktivitas pembelajaran.

## Pelaporan

- Laporan akademik membutuhkan pengolahan manual.
- Risiko kesalahan data tinggi.

---

# 2.3 Sasaran Bisnis

## Jangka Pendek (1 Tahun)

- Digitalisasi proses akademik.
- Implementasi PMB Online.
- Implementasi KRS dan KHS Online.
- Implementasi sistem nilai.
- Implementasi presensi digital.

## Jangka Menengah (2–3 Tahun)

- Integrasi penuh dengan PDDIKTI.
- Digitalisasi layanan administrasi.
- Implementasi e-learning.
- Dashboard analitik pimpinan.

## Jangka Panjang (3–5 Tahun)

- Mobile Application.
- Integrasi pembayaran otomatis.
- Integrasi WhatsApp Notification.
- Artificial Intelligence Academic Assistant.

---

# 2.4 Stakeholder Sistem

Stakeholder adalah pihak yang menggunakan atau terlibat dalam sistem.

## Internal

### Rektor

Kebutuhan:

- Statistik kampus.
- Monitoring mahasiswa.
- Monitoring dosen.
- Monitoring keuangan.
- Monitoring PMB.

### Wakil Rektor

Kebutuhan:

- Monitoring operasional akademik.
- Monitoring kualitas pendidikan.

### Dekan

Kebutuhan:

- Monitoring fakultas.
- Monitoring dosen.
- Monitoring mahasiswa.

### Kaprodi

Kebutuhan:

- Monitoring program studi.
- Monitoring kurikulum.
- Monitoring mahasiswa.

### Admin Akademik

Kebutuhan:

- Mengelola data akademik.
- Mengelola jadwal.
- Mengelola nilai.

### Admin Fakultas

Kebutuhan:

- Mengelola data fakultas.
- Mengelola dosen.
- Mengelola mahasiswa.

### Admin Prodi

Kebutuhan:

- Mengelola data program studi.
- Mengelola kurikulum.

### Dosen

Kebutuhan:

- Mengajar.
- Input nilai.
- Input presensi.
- Upload materi.

### Mahasiswa

Kebutuhan:

- KRS.
- KHS.
- Jadwal.
- Nilai.
- Surat.
- Pembayaran.

### Keuangan

Kebutuhan:

- Pengelolaan tagihan.
- Verifikasi pembayaran.
- Laporan keuangan.

### PMB

Kebutuhan:

- Verifikasi pendaftaran.
- Verifikasi dokumen.
- Pengumuman hasil seleksi.

### Perpustakaan

Kebutuhan:

- Pengelolaan buku.
- Pengelolaan peminjaman.

### Alumni

Kebutuhan:

- Update data alumni.
- Mengisi tracer study.

### Orang Tua/Wali

Kebutuhan:

- Monitoring akademik mahasiswa.
- Monitoring pembayaran.

---

# 2.5 Role Sistem

Sistem menggunakan Role Based Access Control (RBAC).

Role yang tersedia:

1. Super Admin
2. Rektor
3. Wakil Rektor
4. Dekan
5. Kaprodi
6. Admin Akademik
7. Admin Fakultas
8. Admin Prodi
9. Dosen
10. Mahasiswa
11. Keuangan
12. PMB
13. Perpustakaan
14. Alumni
15. Orang Tua/Wali

---

# 2.6 Kebutuhan Umum Pengguna

## Login

Semua pengguna wajib login.

Fitur:

- Username
- Password
- JWT Authentication
- Session Management
- Forgot Password

---

## Dashboard

Setiap role memiliki dashboard berbeda.

Dashboard menampilkan:

- Statistik
- Notifikasi
- Aktivitas terbaru
- Informasi penting

---

## Notifikasi

Sistem wajib menyediakan:

- Notifikasi dalam aplikasi
- Email Notification
- Sistem Announcement

---

## Audit Log

Semua aktivitas harus dicatat.

Contoh:

- Login
- Logout
- Tambah data
- Ubah data
- Hapus data
- Verifikasi data

---

# 2.7 Business Flow Utama

## PMB

Calon Mahasiswa
↓
Registrasi
↓
Upload Dokumen
↓
Verifikasi
↓
Seleksi
↓
Pengumuman
↓
Registrasi Ulang
↓
Menjadi Mahasiswa

---

## Akademik

Mahasiswa
↓
Isi KRS
↓
Persetujuan Dosen Wali
↓
Perkuliahan
↓
Presensi
↓
Input Nilai Dosen
↓
KHS
↓
Transkrip

---

## Pembayaran

Mahasiswa
↓
Tagihan Dibuat
↓
Pembayaran
↓
Verifikasi
↓
Status Lunas

---

## Surat Menyurat

Mahasiswa
↓
Ajukan Surat
↓
Verifikasi
↓
Generate PDF
↓
Tanda Tangan Digital
↓
Surat Terbit

---

# 2.8 Key Performance Indicator (KPI)

## Akademik

- KRS online berhasil 100%.
- KHS tersedia real-time.
- Presensi tercatat digital.

## PMB

- Pendaftaran online 100%.
- Verifikasi lebih cepat 70%.

## Keuangan

- Rekonsiliasi pembayaran lebih cepat 80%.

## Administrasi

- Surat otomatis selesai dalam < 5 menit.

## Pimpinan

- Dashboard real-time tersedia 24/7.

---

# 2.9 Ruang Lingkup Versi 1.0

Termasuk:

- PMB
- Akademik
- KRS
- KHS
- Jadwal
- Nilai
- Presensi
- Keuangan
- Surat Menyurat
- E-Learning
- Perpustakaan
- Alumni
- Dashboard Pimpinan
- PDDIKTI Ready

Tidak Termasuk:

- Mobile App
- AI Assistant
- Face Recognition
- Payment Gateway Otomatis

Fitur tersebut disiapkan pada roadmap versi berikutnya.

# BAB 3 - FUNCTIONAL REQUIREMENTS

# 3.1 Gambaran Umum

Functional Requirements menjelaskan fitur-fitur yang wajib tersedia dalam SIAKAD IAIMU.

Setiap fitur harus memiliki:

- Tujuan
- Aktor
- Input
- Proses
- Output
- Hak akses

---

# MODUL 1 - AUTHENTICATION & AUTHORIZATION

## Tujuan

Mengelola autentikasi pengguna dan hak akses sistem.

---

## Fitur Login

### Aktor

- Super Admin
- Rektor
- Wakil Rektor
- Dekan
- Kaprodi
- Admin Akademik
- Admin Fakultas
- Admin Prodi
- Dosen
- Mahasiswa
- Keuangan
- PMB
- Perpustakaan
- Alumni
- Orang Tua/Wali

---

### Input

- Username
- Password

---

### Output

- Access Token (JWT)
- Refresh Token

---

### Validasi

- Username wajib diisi
- Password wajib diisi
- Akun aktif

---

## Forgot Password

Fitur:

- Kirim email reset password
- Generate token reset
- Ganti password baru

---

## Logout

Fitur:

- Menghapus token aktif
- Mengakhiri sesi pengguna

---

## Role Permission

Hak akses harus menggunakan:

RBAC (Role Based Access Control)

Bukan hardcode.

---

# MODUL 2 - DASHBOARD

## Tujuan

Menyediakan informasi utama berdasarkan peran pengguna.

---

## Dashboard Mahasiswa

Menampilkan:

- Biodata singkat
- Semester aktif
- SKS ditempuh
- IPK
- Jadwal hari ini
- Tagihan aktif
- Notifikasi

---

## Dashboard Dosen

Menampilkan:

- Jadwal mengajar
- Mata kuliah aktif
- Jumlah mahasiswa
- Tugas menunggu penilaian
- Notifikasi

---

## Dashboard Kaprodi

Menampilkan:

- Jumlah mahasiswa
- Jumlah dosen
- Statistik nilai
- Statistik presensi
- Statistik kelulusan

---

## Dashboard Dekan

Menampilkan:

- Statistik fakultas
- Statistik mahasiswa
- Statistik dosen

---

## Dashboard Rektor

Menampilkan:

- Total mahasiswa
- Total dosen
- Total alumni
- Statistik PMB
- Statistik pembayaran
- Statistik kelulusan

---

# MODUL 3 - MASTER DATA

## Tujuan

Menyimpan seluruh data dasar kampus.

---

## Data Kampus

Fitur:

- Profil kampus
- Logo kampus
- Alamat
- Kontak

---

## Data Fakultas

Fakultas:

### Fakultas Dakwah

- BPI
- MD

### Fakultas Syariah

- HKI
- ES

### Fakultas Tarbiyah

- PAI
- PBA

---

Fitur:

- Tambah fakultas
- Edit fakultas
- Hapus fakultas
- Detail fakultas

---

## Data Program Studi

Fitur:

- Tambah prodi
- Edit prodi
- Hapus prodi

---

## Data Kurikulum

Fitur:

- Tahun kurikulum
- Status aktif
- Mapping mata kuliah

---

## Data Mata Kuliah

Fitur:

- Kode MK
- Nama MK
- SKS
- Semester
- Jenis MK

---

## Data Ruangan

Fitur:

- Kode ruangan
- Nama ruangan
- Kapasitas

---

## Data Gedung

Fitur:

- Nama gedung
- Lokasi
- Status aktif

---

# MODUL 4 - MANAJEMEN MAHASISWA

## Tujuan

Mengelola seluruh data mahasiswa.

---

## Data Mahasiswa

Data yang disimpan:

- NIM
- Nama
- NIK
- Tempat lahir
- Tanggal lahir
- Jenis kelamin
- Agama
- Alamat
- Nomor HP
- Email
- Fakultas
- Prodi
- Angkatan

---

## Status Mahasiswa

Status:

- Aktif
- Cuti
- Nonaktif
- Lulus
- Drop Out
- Mengundurkan Diri

---

## Riwayat Akademik

Menyimpan:

- Riwayat semester
- Riwayat KRS
- Riwayat nilai
- Riwayat pembayaran

---

## Import Mahasiswa

Format:

- Excel
- CSV

---

## Export Mahasiswa

Format:

- Excel
- PDF

---

# MODUL 5 - MANAJEMEN DOSEN

## Tujuan

Mengelola seluruh data dosen.

---

## Data Dosen

Data:

- NIDN
- NIDK
- Nama
- Gelar
- Fakultas
- Program Studi
- Email
- Nomor HP

---

## Status Dosen

- Aktif
- Tugas Belajar
- Cuti
- Pensiun

---

## Beban Mengajar

Fitur:

- Total SKS
- Mata Kuliah
- Jadwal Mengajar

---

## Riwayat Mengajar

Menyimpan:

- Semester
- Mata Kuliah
- Jumlah Mahasiswa

---

# MODUL 6 - TAHUN AKADEMIK

## Tujuan

Mengatur periode akademik.

---

## Tahun Akademik

Contoh:

2026/2027

---

## Semester

- Ganjil
- Genap
- Pendek

---

## Fitur

- Buka semester
- Tutup semester
- Aktifkan semester

---

# MODUL 7 - KALENDER AKADEMIK

## Tujuan

Mengatur seluruh jadwal akademik kampus.

---

## Fitur

- Awal perkuliahan
- Akhir perkuliahan
- UTS
- UAS
- KRS
- Wisuda
- Libur nasional

---

## Output

Ditampilkan pada dashboard seluruh pengguna.

---

# MODUL 8 - PMB (PENERIMAAN MAHASISWA BARU)

## Tujuan

Mengelola penerimaan mahasiswa baru secara online.

---

## Registrasi Akun PMB

Calon mahasiswa dapat:

- Membuat akun
- Login
- Melengkapi biodata

---

## Biodata PMB

Data:

- NIK
- Nama
- Alamat
- Email
- Nomor HP
- Sekolah Asal

---

## Upload Dokumen

Dokumen:

- KTP
- KK
- Ijazah
- Pas Foto

---

## Seleksi

Status:

- Menunggu
- Lulus
- Tidak Lulus

---

## Pengumuman

Calon mahasiswa dapat melihat hasil seleksi.

---

## Registrasi Ulang

Jika lulus:

- Aktivasi mahasiswa
- Generate NIM otomatis

---

# MODUL 9 - NOTIFICATION CENTER

## Tujuan

Memberikan informasi secara real-time kepada seluruh pengguna.

---

## Jenis Notifikasi

- Sistem
- Akademik
- Keuangan
- PMB

---

## Media

- In-App Notification
- Email

---

## Fitur

- Tandai dibaca
- Arsip notifikasi
- Hapus notifikasi

# BAB 3 - FUNCTIONAL REQUIREMENTS (LANJUTAN)

# MODUL 10 - KRS (KARTU RENCANA STUDI)

## Tujuan

Memungkinkan mahasiswa melakukan pengambilan mata kuliah secara online setiap semester.

---

## Aktor

- Mahasiswa
- Dosen Wali
- Admin Akademik
- Kaprodi

---

## Fitur Pengisian KRS

Mahasiswa dapat:

- Melihat mata kuliah yang tersedia
- Melihat jumlah SKS maksimum
- Memilih mata kuliah
- Menyimpan draft KRS
- Mengajukan KRS

---

## Validasi KRS

Sistem wajib memeriksa:

- Status mahasiswa aktif
- Tidak memiliki blokir akademik
- Tidak memiliki blokir keuangan
- Mata kuliah tidak bentrok jadwal
- Total SKS sesuai aturan
- Prasyarat mata kuliah terpenuhi

---

## Approval KRS

Alur:

Mahasiswa
↓
Ajukan KRS
↓
Dosen Wali Review
↓
Disetujui / Ditolak
↓
KRS Aktif

---

## Output

- KRS PDF
- Riwayat KRS
- Rekap KRS

---

# MODUL 11 - KHS (KARTU HASIL STUDI)

## Tujuan

Menampilkan hasil studi mahasiswa setiap semester.

---

## Data KHS

- Semester
- Mata Kuliah
- SKS
- Nilai Huruf
- Nilai Angka
- IPS
- IPK

---

## Fitur

- Lihat KHS
- Download PDF
- Cetak KHS

---

## Perhitungan

Sistem menghitung otomatis:

- IPS
- IPK
- Total SKS Lulus
- Total SKS Tempuh

---

# MODUL 12 - JADWAL KULIAH

## Tujuan

Mengatur jadwal perkuliahan kampus.

---

## Data Jadwal

- Mata Kuliah
- Dosen
- Ruangan
- Hari
- Jam Mulai
- Jam Selesai

---

## Validasi

Sistem wajib menolak:

- Dosen bentrok
- Ruangan bentrok
- Mata kuliah bentrok

---

## Tampilan

- Kalender
- List View
- Filter per Prodi
- Filter per Dosen

---

# MODUL 13 - PRESENSI MAHASISWA

## Tujuan

Mencatat kehadiran mahasiswa.

---

## Metode Presensi

Versi 1.0:

- Input oleh dosen

Roadmap:

- QR Code
- GPS
- Face Recognition

---

## Status Kehadiran

- Hadir
- Izin
- Sakit
- Alfa

---

## Rekap Presensi

Sistem menghitung:

- Persentase Kehadiran
- Jumlah Alfa
- Jumlah Izin
- Jumlah Sakit

---

## Syarat UAS

Sistem otomatis memeriksa:

Minimal 75% kehadiran.

---

# MODUL 14 - PRESENSI DOSEN

## Tujuan

Mencatat aktivitas mengajar dosen.

---

## Data

- Tanggal
- Mata Kuliah
- Jam Masuk
- Jam Keluar
- Materi

---

## Monitoring

Dekan dan Kaprodi dapat melihat:

- Kehadiran dosen
- Jam mengajar
- Persentase kehadiran

---

# MODUL 15 - PENILAIAN AKADEMIK

## Tujuan

Mengelola penilaian mahasiswa.

---

## Komponen Nilai

- Kehadiran
- Tugas
- Quiz
- UTS
- UAS

---

## Bobot

Dapat diatur per mata kuliah.

Contoh:

- Kehadiran 10%
- Tugas 20%
- Quiz 10%
- UTS 30%
- UAS 30%

---

## Perhitungan Nilai

Sistem menghitung otomatis:

Nilai Akhir
Nilai Huruf
Mutu Nilai

---

## Grade

A
AB
B
BC
C
D
E

Konfigurasi dapat diubah admin.

---

# MODUL 16 - TRANSKRIP AKADEMIK

## Tujuan

Menghasilkan transkrip akademik mahasiswa.

---

## Data

- Semua mata kuliah lulus
- Total SKS
- IPK

---

## Fitur

- Preview
- PDF
- Cetak

---

## Validasi

Hanya mata kuliah lulus yang masuk transkrip.

---

# MODUL 17 - DOSEN WALI

## Tujuan

Mengelola pembimbing akademik mahasiswa.

---

## Fitur

- Penunjukan dosen wali
- Persetujuan KRS
- Catatan akademik

---

## Monitoring

Dosen wali dapat melihat:

- IPK mahasiswa
- Presensi mahasiswa
- Riwayat studi

---

# MODUL 18 - YUDISIUM

## Tujuan

Mengelola proses kelulusan akademik.

---

## Validasi

Sistem memeriksa:

- SKS terpenuhi
- IPK terpenuhi
- Tidak memiliki tunggakan
- Tidak memiliki pinjaman buku

---

## Status

- Belum Memenuhi
- Memenuhi
- Lulus Yudisium

---

# MODUL 19 - WISUDA

## Tujuan

Mengelola proses wisuda.

---

## Fitur

- Pendaftaran wisuda
- Verifikasi
- Penetapan peserta

---

## Dokumen

- Transkrip
- Surat bebas pustaka
- Surat bebas keuangan

---

# MODUL 20 - E-LEARNING

## Tujuan

Menyediakan pembelajaran digital.

---

## Materi

Dosen dapat:

- Upload PDF
- Upload PPT
- Upload Video
- Upload Dokumen

---

## Tugas

Dosen dapat:

- Membuat tugas
- Menentukan deadline
- Menilai tugas

---

## Submission

Mahasiswa dapat:

- Upload tugas
- Melihat status penilaian

---

# MODUL 21 - QUIZ

## Tujuan

Menyediakan evaluasi pembelajaran.

---

## Jenis Soal

- Pilihan Ganda
- Benar Salah
- Essay

---

## Fitur

- Timer
- Auto Submit
- Auto Grading

---

# MODUL 22 - CBT (COMPUTER BASED TEST)

## Tujuan

Menyelenggarakan ujian online.

---

## Fitur

- Bank Soal
- Paket Soal
- Acak Soal
- Acak Jawaban
- Timer
- Auto Save

---

## Monitoring

Dosen dapat melihat:

- Peserta online
- Status pengerjaan
- Hasil ujian

---

# MODUL 23 - AKADEMIC ANALYTICS

## Tujuan

Menyediakan analisis akademik.

---

## Statistik Mahasiswa

- IPK Tertinggi
- IPK Terendah
- Mahasiswa Berprestasi

---

## Statistik Mata Kuliah

- Tingkat Kelulusan
- Tingkat Kehadiran

---

## Statistik Dosen

- Beban Mengajar
- Kehadiran Mengajar

---

# MODUL 24 - DOKUMEN AKADEMIK

## Dokumen Otomatis

Sistem dapat menghasilkan:

- KRS
- KHS
- Transkrip
- Jadwal Kuliah
- Rekap Nilai
- Rekap Presensi

Format:

- PDF
- Excel

Dengan QR Verification.

# BAB 3 - FUNCTIONAL REQUIREMENTS (LANJUTAN)

# MODUL 25 - KEUANGAN AKADEMIK

## Tujuan

Mengelola seluruh transaksi keuangan mahasiswa dan kampus.

---

## Jenis Tagihan

Sistem harus mendukung:

- SPP
- UKT
- Her Registrasi
- Ujian
- Praktikum
- Wisuda
- PMB
- Tagihan Khusus

---

## Data Tagihan

Menyimpan:

- Nomor Tagihan
- Mahasiswa
- Semester
- Jenis Tagihan
- Nominal
- Jatuh Tempo
- Status

---

## Status Tagihan

- Belum Dibayar
- Menunggu Verifikasi
- Dibayar Sebagian
- Lunas
- Kadaluarsa

---

## Pembayaran Manual

Mahasiswa dapat:

- Upload bukti transfer
- Melihat status verifikasi

---

## Verifikasi Pembayaran

Petugas keuangan dapat:

- Menyetujui pembayaran
- Menolak pembayaran
- Memberikan catatan

---

## Riwayat Pembayaran

Sistem menyimpan:

- Tanggal pembayaran
- Nominal
- Metode pembayaran
- Bukti pembayaran

---

# MODUL 26 - CICILAN PEMBAYARAN

## Tujuan

Memungkinkan pembayaran secara bertahap.

---

## Fitur

- Skema cicilan
- Jadwal cicilan
- Monitoring cicilan

---

## Validasi

Sistem wajib menghitung:

- Total tagihan
- Total terbayar
- Sisa tagihan

---

# MODUL 27 - VIRTUAL ACCOUNT READY

## Tujuan

Menyiapkan integrasi pembayaran otomatis pada versi berikutnya.

---

## Fitur Awal

- Struktur database siap VA
- Struktur API siap VA
- Mapping bank

---

## Roadmap

Integrasi:

- BRI
- BNI
- Mandiri
- BSI

---

# MODUL 28 - SURAT MENYURAT

## Tujuan

Mengotomatisasi layanan administrasi kampus.

---

## Surat Aktif Kuliah

Mahasiswa dapat:

- Mengajukan surat
- Melihat status
- Mengunduh surat

---

## Surat Penelitian

Mahasiswa dapat:

- Mengajukan penelitian
- Memilih lokasi penelitian

---

## Surat Magang

Mahasiswa dapat:

- Mengajukan magang
- Mengunggah dokumen pendukung

---

## Legalisir

Mahasiswa atau alumni dapat:

- Mengajukan legalisir
- Melihat status

---

## Workflow Surat

Pemohon
↓
Verifikasi
↓
Generate PDF
↓
Tanda Tangan Digital
↓
Terbit

---

## QR Verification

Semua surat wajib memiliki:

- QR Code
- Nomor Verifikasi
- Link Verifikasi

---

# MODUL 29 - PERPUSTAKAAN

## Tujuan

Mengelola seluruh layanan perpustakaan.

---

## Master Buku

Data:

- ISBN
- Judul
- Penulis
- Penerbit
- Tahun Terbit
- Kategori

---

## Peminjaman

Petugas dapat:

- Meminjamkan buku
- Menentukan jatuh tempo

---

## Pengembalian

Petugas dapat:

- Mengembalikan buku
- Menghitung keterlambatan

---

## Denda

Sistem otomatis menghitung:

- Jumlah hari terlambat
- Total denda

---

## Kartu Perpustakaan

Setiap mahasiswa otomatis memiliki akun perpustakaan.

---

# MODUL 30 - ALUMNI

## Tujuan

Mengelola data alumni kampus.

---

## Data Alumni

- NIM
- Nama
- Tahun Lulus
- Program Studi
- Email
- Nomor HP

---

## Profil Alumni

Alumni dapat:

- Mengubah profil
- Menambahkan pekerjaan
- Menambahkan pendidikan lanjut

---

# MODUL 31 - TRACER STUDY

## Tujuan

Mengumpulkan data lulusan.

---

## Kuesioner

Data:

- Status pekerjaan
- Nama perusahaan
- Jabatan
- Gaji
- Kesesuaian pekerjaan

---

## Statistik

Sistem menghasilkan:

- Tingkat serapan kerja
- Masa tunggu kerja
- Distribusi pekerjaan

---

# MODUL 32 - SURVEY PENGGUNA ALUMNI

## Tujuan

Mengukur kualitas lulusan.

---

## Responden

- Instansi
- Sekolah
- Perusahaan
- Organisasi

---

## Penilaian

- Kompetensi
- Integritas
- Komunikasi
- Kepemimpinan
- Kerjasama

---

# MODUL 33 - PORTAL ORANG TUA/WALI

## Tujuan

Menyediakan akses informasi akademik mahasiswa kepada wali.

---

## Informasi Akademik

Orang tua dapat melihat:

- KRS
- KHS
- IPK
- Jadwal

---

## Informasi Presensi

Melihat:

- Kehadiran
- Alfa
- Izin
- Sakit

---

## Informasi Keuangan

Melihat:

- Tagihan
- Pembayaran
- Tunggakan

---

# MODUL 34 - DASHBOARD PIMPINAN

## Tujuan

Membantu pengambilan keputusan kampus.

---

## Dashboard Rektor

Menampilkan:

- Total mahasiswa
- Total dosen
- Total alumni
- PMB aktif
- Pendapatan kampus

---

## Dashboard Dekan

Menampilkan:

- Statistik fakultas
- Statistik prodi
- Statistik dosen

---

## Dashboard Kaprodi

Menampilkan:

- Statistik mahasiswa
- Statistik nilai
- Statistik kelulusan

---

## Grafik

Sistem menyediakan:

- Grafik mahasiswa
- Grafik pembayaran
- Grafik kelulusan
- Grafik PMB

---

# MODUL 35 - AUDIT LOG

## Tujuan

Mencatat seluruh aktivitas sistem.

---

## Aktivitas Dicatat

- Login
- Logout
- Tambah Data
- Edit Data
- Hapus Data
- Approval

---

## Data Log

- User
- IP Address
- Browser
- Aktivitas
- Waktu

---

# MODUL 36 - ACTIVITY LOG

## Tujuan

Monitoring aktivitas pengguna.

---

## Contoh

Mahasiswa:

- Mengisi KRS
- Upload Tugas

Dosen:

- Input Nilai
- Input Presensi

Admin:

- Mengubah Data

---

# MODUL 37 - NOTIFICATION CENTER

## Tujuan

Pusat notifikasi sistem.

---

## Jenis

- Akademik
- Keuangan
- PMB
- Sistem

---

## Delivery

- In-App
- Email

---

## Fitur

- Tandai Dibaca
- Hapus
- Arsip

---

# MODUL 38 - ANNOUNCEMENT CENTER

## Tujuan

Pusat pengumuman kampus.

---

## Kategori

- Akademik
- Keuangan
- PMB
- Umum

---

## Target Pengguna

- Semua
- Fakultas tertentu
- Prodi tertentu
- Mahasiswa tertentu

---

# MODUL 39 - PDDIKTI READY

## Tujuan

Mempersiapkan integrasi dengan PDDIKTI.

---

## Data Akademik

Data yang harus siap sinkron:

- Mahasiswa
- Dosen
- Kurikulum
- Mata Kuliah
- Nilai
- KRS
- Kelas Kuliah

---

## Validasi

Sistem melakukan validasi data sebelum sinkronisasi.

---

## Monitoring

Admin dapat melihat:

- Status sinkronisasi
- Riwayat sinkronisasi
- Error sinkronisasi

---

# MODUL 40 - FILE MANAGEMENT

## Tujuan

Mengelola seluruh dokumen digital kampus.

---

## Jenis File

- Dokumen Mahasiswa
- Dokumen Dosen
- Surat
- Materi Kuliah
- Dokumen PMB

---

## Fitur

- Upload
- Download
- Preview
- Versioning

---

## Keamanan

- Validasi file
- Scan file berbahaya
- Hak akses file

# BAB 4 - NON FUNCTIONAL REQUIREMENTS (NFR)

# 4.1 Tujuan

Non Functional Requirements mendefinisikan standar kualitas yang wajib dipenuhi oleh SIAKAD IAIMU.

Bab ini menjadi fondasi agar sistem:

- Mudah dikembangkan
- Mudah dipelihara
- Aman
- Cepat
- Stabil
- Siap berkembang dalam jangka panjang

---

# 4.2 PRINSIP ARSITEKTUR

SIAKAD IAIMU wajib menggunakan pendekatan:

## API First Architecture

Seluruh proses bisnis harus berjalan melalui API.

Frontend tidak boleh mengakses database secara langsung.

---

## Separation of Concerns

Frontend dan Backend wajib dipisahkan.

Frontend:

- Tampilan
- User Interface
- User Experience

Backend:

- Business Logic
- Validasi
- Database
- Security

---

## Modular Architecture

Setiap modul harus berdiri sendiri.

Contoh:

- PMB
- Akademik
- Keuangan
- Perpustakaan
- Alumni

Perubahan pada satu modul tidak boleh merusak modul lain.

---

# 4.3 ARSITEKTUR SISTEM

## Frontend Layer

Teknologi:

- React 19
- Vite
- Tailwind CSS
- Axios
- Zustand
- React Router
- TanStack Query
- React Hook Form
- Zod
- Shadcn UI

Tanggung jawab:

- Rendering UI
- State Management
- Routing
- API Communication

Tidak boleh:

- Menyimpan business logic utama
- Mengakses database

---

## Backend Layer

Teknologi:

- PHP Native
- Composer
- REST API
- JWT Authentication

Tanggung jawab:

- Business Logic
- Validation
- Authorization
- Database Access

---

## Database Layer

Teknologi:

PostgreSQL

Alasan:

- Stabil
- Enterprise Grade
- Scalable
- Mendukung relasi kompleks
- Cocok untuk data akademik

---

# 4.4 STRUKTUR FRONTEND

Struktur minimal:

frontend/

├── src/
│
├── api/
│
├── assets/
│
├── components/
│
├── layouts/
│
├── pages/
│
├── routes/
│
├── stores/
│
├── hooks/
│
├── services/
│
├── utils/
│
├── constants/
│
├── types/
│
└── validations/

---

Penjelasan:

api/

Seluruh komunikasi API.

components/

Komponen reusable.

pages/

Halaman aplikasi.

stores/

Global state.

services/

Business helper frontend.

validations/

Schema validasi.

---

# 4.5 STRUKTUR BACKEND

Struktur minimal:

backend/

├── app/
│
├── Controllers/
│
├── Services/
│
├── Repositories/
│
├── Models/
│
├── Validators/
│
├── Middleware/
│
├── Helpers/
│
├── Exceptions/
│
└── Policies/
│
├── routes/
│
├── config/
│
├── storage/
│
├── public/
│
├── vendor/
│
└── tests/

---

Penjelasan:

Controllers

Menerima request.

Services

Business logic.

Repositories

Akses database.

Models

Representasi data.

Middleware

Autentikasi dan keamanan.

Validators

Validasi request.

---

# 4.6 STANDAR API

Arsitektur:

REST API

---

Base URL

https://api.iaimu.ac.id/api/v1

---

Format Response

Success

{
"success": true,
"message": "Data ditemukan",
"data": {}
}

---

Error

{
"success": false,
"message": "Data tidak ditemukan"
}

---

# 4.7 AUTHENTICATION

Metode:

JWT Authentication

---

Token

Access Token

Durasi:

15 menit

---

Refresh Token

Durasi:

7 hari

---

Keuntungan

- Aman
- Ringan
- Cocok untuk SPA
- Cocok untuk Mobile App

---

# 4.8 AUTHORIZATION

Metode:

RBAC

Role Based Access Control

---

Setiap menu wajib memiliki:

- View
- Create
- Update
- Delete
- Export
- Approve

Permission terpisah.

Tidak boleh hardcode role.

---

# 4.9 PERFORMANCE REQUIREMENTS

Target:

## Login

< 2 detik

---

## Dashboard

< 3 detik

---

## Pencarian

< 1 detik

---

## Generate PDF

< 5 detik

---

## Export Excel

< 10 detik

---

# 4.10 DATABASE PERFORMANCE

Database harus mampu menangani:

Mahasiswa:

1000+

---

Dosen:

200+

---

User Bersamaan:

300+

---

Pertumbuhan Data:

10 tahun+

---

# 4.11 CACHING

Sistem harus mendukung:

- Cache Dashboard
- Cache Statistik
- Cache Pengumuman

Tujuan:

Mengurangi beban database.

---

# 4.12 AUDITABILITY

Semua aktivitas wajib tercatat.

---

Minimal:

- Login
- Logout
- Create
- Update
- Delete
- Approve

---

Data Audit:

- User
- Waktu
- IP
- Browser
- Aktivitas

---

# 4.13 LOGGING

Sistem wajib memiliki:

Application Log

---

Error Log

---

Security Log

---

API Log

---

# 4.14 SECURITY REQUIREMENTS

Wajib memiliki:

## SQL Injection Protection

Menggunakan prepared statement.

---

## XSS Protection

Semua input disanitasi.

---

## CSRF Protection

Untuk endpoint sensitif.

---

## Brute Force Protection

Maksimal:

5 kali login gagal

Lock:

15 menit

---

## Password Policy

Minimal:

8 karakter

Harus mengandung:

- Huruf besar
- Huruf kecil
- Angka

---

# 4.15 FILE SECURITY

File upload wajib:

- Dicek ukuran
- Dicek ekstensi
- Dicek MIME Type

---

Ukuran maksimal:

20 MB

---

Format:

PDF
DOCX
XLSX
JPG
PNG

---

# 4.16 BACKUP & RECOVERY

Backup Database

Harian

---

Backup File

Harian

---

Retensi

30 hari

---

Recovery Target

Maksimal kehilangan data:

24 jam

---

# 4.17 HIGH AVAILABILITY

Target Uptime:

99%

---

Downtime terencana:

Maksimal 4 jam per bulan

---

# 4.18 RESPONSIVE DESIGN

Wajib mendukung:

Desktop

Laptop

Tablet

Mobile Browser

---

# 4.19 BROWSER SUPPORT

Google Chrome

Mozilla Firefox

Microsoft Edge

Safari

---

Versi:

2 versi terakhir

---

# 4.20 ACCESSIBILITY

Minimal:

- Keyboard Navigation
- Kontras warna baik
- Label Form lengkap
- Responsive Text

---

# 4.21 PDF ENGINE

Sistem wajib mendukung:

Generate:

- KRS
- KHS
- Transkrip
- Surat
- Laporan

---

Format:

PDF

---

QR Verification wajib tersedia.

---

# 4.22 SCALABILITY

Sistem harus dapat berkembang menjadi:

- Mobile App Android
- Mobile App iOS
- WhatsApp Gateway
- AI Assistant
- Payment Gateway
- Integrasi PDDIKTI

Tanpa perubahan besar pada arsitektur.

---

# 4.23 MAINTAINABILITY

Target:

Developer baru dapat memahami struktur sistem dalam waktu kurang dari 7 hari.

---

Kode wajib:

- Modular
- Konsisten
- Terdokumentasi

---

# 4.24 DEVELOPMENT STANDARD

Backend

PSR Standard

---

Frontend

ESLint

Prettier

---

Git Flow

main

develop

feature/\*

hotfix/\*

---

# 4.25 SUCCESS CRITERIA

SIAKAD IAIMU dianggap memenuhi standar apabila:

- Frontend dan backend terpisah sepenuhnya.
- Semua fitur berjalan melalui API.
- Sistem dapat dikembangkan minimal 10 tahun ke depan.
- Sistem aman dan stabil.
- Sistem siap integrasi mobile.
- Sistem siap integrasi PDDIKTI.
- Sistem mudah dipelihara oleh developer baru.

# BAB 5 - SYSTEM ARCHITECTURE & TECHNICAL DESIGN

# 5.1 TUJUAN

Bab ini mendefinisikan arsitektur teknis SIAKAD IAIMU yang akan menjadi pedoman pengembangan jangka panjang.

Tujuan utama:

- Mudah dikembangkan
- Mudah diperbaiki
- Mudah di-scale
- Aman
- Stabil
- Mendukung pengembangan mobile di masa depan

---

# 5.2 ARSITEKTUR TINGKAT TINGGI

## High Level Architecture

User
↓
Frontend React
↓
REST API PHP
↓
PostgreSQL Database
↓
File Storage

---

## Penjelasan

Frontend bertugas:

- Menampilkan data
- Mengelola UI
- Mengelola state

Backend bertugas:

- Validasi
- Autentikasi
- Business Logic
- Database

Database bertugas:

- Menyimpan data

Storage bertugas:

- Menyimpan file

---

# 5.3 DOMAIN SYSTEM

## Frontend

https://siakad.iaimu.ac.id

---

## Backend API

https://api.iaimu.ac.id

---

## File Storage

https://files.iaimu.ac.id

---

# 5.4 REQUEST FLOW

Contoh Login

Frontend
↓
POST /auth/login
↓
Backend
↓
Validasi
↓
Database
↓
Generate JWT
↓
Response
↓
Frontend

---

Contoh Ambil KHS

Frontend
↓
GET /khs
↓
JWT Validation
↓
Business Logic
↓
Database
↓
Response

---

# 5.5 FRONTEND ARCHITECTURE

## Pattern

Feature Based Architecture

---

src/

api/

components/

features/

layouts/

pages/

routes/

stores/

hooks/

services/

utils/

types/

assets/

---

# 5.6 FEATURES STRUCTURE

Contoh

features/

auth/

dashboard/

mahasiswa/

dosen/

krs/

khs/

nilai/

jadwal/

keuangan/

pmb/

perpustakaan/

alumni/

surat/

---

Keuntungan:

- Mudah dikembangkan
- Mudah dicari
- Mudah dipelihara

---

# 5.7 COMPONENT STRATEGY

## Global Component

Button

Input

Modal

Table

Card

Badge

Dropdown

Pagination

---

## Module Component

KRSForm

KHSTable

NilaiForm

JadwalCard

---

# 5.8 STATE MANAGEMENT

Menggunakan:

Zustand

---

Global State

Auth

User

Theme

Notification

Permission

---

Server State

TanStack Query

---

Tujuan:

Mengurangi request berulang.

---

# 5.9 BACKEND ARCHITECTURE

Pattern:

MVC + Service + Repository

---

Request

↓

Controller

↓

Service

↓

Repository

↓

Database

---

Keuntungan:

- Clean Code
- Mudah testing
- Mudah maintenance

---

# 5.10 CONTROLLER LAYER

Tugas:

- Menerima request
- Validasi awal
- Memanggil service
- Mengembalikan response

---

Controller tidak boleh:

- Query database langsung
- Menyimpan business logic

---

# 5.11 SERVICE LAYER

Tugas:

- Menjalankan aturan bisnis
- Mengatur workflow

---

Contoh

KRS Service

- Validasi SKS
- Validasi Jadwal
- Validasi Pembayaran

---

# 5.12 REPOSITORY LAYER

Tugas:

- Query database

---

Semua query harus melalui repository.

---

# 5.13 DATABASE ARCHITECTURE

Database:

PostgreSQL

---

Schema utama:

academic

finance

library

pmb

elearning

system

alumni

---

Keuntungan:

- Terstruktur
- Mudah maintenance

---

# 5.14 ESTIMASI DATABASE

Core Tables

± 120 tabel

---

Relation

± 250 relasi

---

Audit Tables

± 20 tabel

---

Master Tables

± 30 tabel

---

# 5.15 FILE STORAGE ARCHITECTURE

Folder:

storage/

students/

lecturers/

pmb/

assignments/

library/

letters/

exports/

backups/

---

# 5.16 FILE NAMING STANDARD

Format:

entity_uuid_timestamp.ext

Contoh:

student_234234234_20260701.pdf

---

Tujuan:

Menghindari konflik file.

---

# 5.17 QUEUE ARCHITECTURE

Versi 1.0

Database Queue

---

Digunakan untuk:

- Email
- Export Excel
- Generate PDF
- Notifikasi

---

# 5.18 CACHE ARCHITECTURE

Target Cache:

Dashboard

Statistik

Pengumuman

---

Future Ready:

Redis

---

# 5.19 SEARCH ARCHITECTURE

Global Search

Mahasiswa

Dosen

Mata Kuliah

Surat

Buku

---

Harus mendukung:

Pencarian cepat

Filter

Sorting

Pagination

---

# 5.20 PDF GENERATION

Dokumen:

KRS

KHS

Transkrip

Surat

Laporan

---

Wajib:

QR Verification

Nomor Dokumen

Digital Signature Ready

---

# 5.21 EXPORT ENGINE

Format:

Excel

CSV

PDF

---

Data besar wajib:

Background Process

---

# 5.22 API VERSIONING

Wajib

/api/v1

---

Tujuan:

Aman untuk upgrade.

---

Contoh:

/api/v1/auth

/api/v1/students

/api/v1/krs

---

# 5.23 ENVIRONMENT

Development

digunakan developer

---

Staging

digunakan testing

---

Production

digunakan pengguna

---

Tidak boleh langsung deploy ke production.

---

# 5.24 CONFIGURATION MANAGEMENT

Semua konfigurasi menggunakan:

.env

---

Contoh

APP_NAME

APP_URL

DB_HOST

DB_NAME

JWT_SECRET

MAIL_HOST

---

Tidak boleh hardcode.

---

# 5.25 DEPLOYMENT ARCHITECTURE

Server

Ubuntu LTS

---

Web Server

Nginx

---

PHP

PHP 8.4+

---

Database

PostgreSQL

---

SSL

HTTPS wajib

---

# 5.26 MONITORING

Monitoring:

CPU

RAM

Disk

Database

Error

---

Log wajib tersedia.

---

# 5.27 CI/CD STRATEGY

Repository:

Git

---

Branch:

main

develop

feature/\*

hotfix/\*

---

Deployment:

Staging
↓
Testing
↓
Production

---

# 5.28 SECURITY ARCHITECTURE

Layer 1

HTTPS

---

Layer 2

JWT

---

Layer 3

RBAC

---

Layer 4

Input Validation

---

Layer 5

Audit Log

---

Layer 6

Backup

---

# 5.29 MOBILE READY ARCHITECTURE

Android

↓

API

↓

Backend

↓

Database

---

iOS

↓

API

↓

Backend

↓

Database

---

Tidak memerlukan perubahan database.

---

# 5.30 FUTURE ROADMAP ARCHITECTURE

Versi 2.0

WhatsApp Gateway

Payment Gateway

Mobile App

---

Versi 3.0

AI Academic Assistant

Predictive Analytics

Business Intelligence

---

# 5.31 TECHNICAL SUCCESS CRITERIA

Arsitektur dianggap berhasil jika:

- Frontend dapat diganti tanpa mengubah backend.
- Backend dapat dikembangkan tanpa mengubah frontend.
- Mobile App dapat dibuat menggunakan API yang sama.
- Sistem mampu melayani pertumbuhan data selama 10+ tahun.
- Developer baru dapat memahami struktur sistem dengan cepat.
- Penambahan modul baru tidak merusak modul lama.

# BAB 6 - DATABASE DESIGN & ENTITY RELATIONSHIP MODEL (ERD)

# 6.1 TUJUAN

Bab ini mendefinisikan struktur database utama SIAKAD IAIMU.

Tujuan:

- Menjamin konsistensi data.
- Mendukung pengembangan jangka panjang.
- Mempermudah integrasi PDDIKTI.
- Mempermudah maintenance.
- Menghindari duplikasi data.

---

# 6.2 STANDAR DATABASE

Database Engine:

PostgreSQL

---

Character Set:

UTF-8

---

Timezone:

Asia/Jakarta

---

Soft Delete:

Wajib untuk tabel penting.

---

Audit Columns:

Semua tabel utama wajib memiliki:

created_at

updated_at

created_by

updated_by

deleted_at

---

# 6.3 DATABASE SCHEMA

Database dibagi menjadi beberapa schema.

## system

Data sistem.

---

## academic

Data akademik.

---

## pmb

Data PMB.

---

## finance

Data keuangan.

---

## library

Data perpustakaan.

---

## elearning

Data pembelajaran.

---

## alumni

Data alumni.

---

# 6.4 MASTER USER SYSTEM

Tabel:

system.users

---

Kolom:

id

uuid

username

email

password_hash

role_id

status

last_login_at

created_at

updated_at

---

Relasi:

users
↓
roles

---

# 6.5 ROLE MANAGEMENT

Tabel:

system.roles

---

Data:

Super Admin

Rektor

Dekan

Kaprodi

Dosen

Mahasiswa

Keuangan

PMB

Perpustakaan

Alumni

Orang Tua

---

Tabel:

system.permissions

---

Tabel:

system.role_permissions

---

# 6.6 MASTER FAKULTAS

Tabel:

academic.faculties

---

Kolom:

id

kode_fakultas

nama_fakultas

status

---

Data Awal:

FAKULTAS DAKWAH

FAKULTAS SYARIAH

FAKULTAS TARBIYAH

---

# 6.7 MASTER PROGRAM STUDI

Tabel:

academic.study_programs

---

Kolom:

id

faculty_id

kode_prodi

nama_prodi

jenjang

status

---

Data Awal:

BPI

MD

HKI

ES

PAI

PBA

---

Relasi:

faculty
↓
study_programs

---

# 6.8 MASTER TAHUN AKADEMIK

Tabel:

academic.academic_years

---

Kolom:

id

tahun

semester

status_aktif

tanggal_mulai

tanggal_selesai

---

# 6.9 MASTER KURIKULUM

Tabel:

academic.curriculums

---

Kolom:

id

study_program_id

nama_kurikulum

tahun_berlaku

status

---

# 6.10 MASTER MATA KULIAH

Tabel:

academic.courses

---

Kolom:

id

kode_mk

nama_mk

sks

semester

jenis_mk

kurikulum_id

---

Relasi:

curriculum
↓
courses

---

# 6.11 MASTER GEDUNG

Tabel:

academic.buildings

---

Kolom:

id

kode_gedung

nama_gedung

lokasi

---

# 6.12 MASTER RUANGAN

Tabel:

academic.rooms

---

Kolom:

id

building_id

kode_ruangan

nama_ruangan

kapasitas

---

Relasi:

building
↓
room

---

# 6.13 DATA DOSEN

Tabel:

academic.lecturers

---

Kolom:

id

user_id

nidn

nidk

nama_lengkap

gelar_depan

gelar_belakang

email

telepon

status

---

Relasi:

users
↓
lecturers

---

# 6.14 DATA MAHASISWA

Tabel:

academic.students

---

Kolom:

id

user_id

nim

nama_lengkap

nik

tempat_lahir

tanggal_lahir

jenis_kelamin

agama

alamat

telepon

email

angkatan

study_program_id

status_mahasiswa

---

Relasi:

users
↓
students

---

# 6.15 ORANG TUA / WALI

Tabel:

academic.student_guardians

---

Kolom:

id

student_id

nama_ayah

nama_ibu

nama_wali

telepon

alamat

---

# 6.16 DOSEN WALI

Tabel:

academic.academic_advisors

---

Kolom:

id

student_id

lecturer_id

academic_year_id

---

# 6.17 KELAS PERKULIAHAN

Tabel:

academic.course_classes

---

Kolom:

id

course_id

lecturer_id

academic_year_id

nama_kelas

kuota

---

# 6.18 JADWAL KULIAH

Tabel:

academic.class_schedules

---

Kolom:

id

course_class_id

room_id

hari

jam_mulai

jam_selesai

---

# 6.19 KRS

Tabel:

academic.study_plans

---

Header KRS

---

Kolom:

id

student_id

academic_year_id

status

tanggal_pengajuan

tanggal_persetujuan

---

# 6.20 DETAIL KRS

Tabel:

academic.study_plan_details

---

Kolom:

id

study_plan_id

course_class_id

---

# 6.21 PRESENSI MAHASISWA

Tabel:

academic.student_attendances

---

Kolom:

id

student_id

course_class_id

tanggal

status

---

Status:

Hadir

Izin

Sakit

Alfa

---

# 6.22 PRESENSI DOSEN

Tabel:

academic.lecturer_attendances

---

Kolom:

id

lecturer_id

course_class_id

tanggal

materi

jam_masuk

jam_keluar

---

# 6.23 KOMPONEN NILAI

Tabel:

academic.grade_components

---

Kolom:

id

course_class_id

nama_komponen

bobot

---

Contoh:

UTS

UAS

Tugas

Quiz

Kehadiran

---

# 6.24 NILAI MAHASISWA

Tabel:

academic.student_grades

---

Kolom:

id

student_id

course_class_id

nilai_akhir

nilai_huruf

mutu

---

# 6.25 KHS

Tabel:

academic.study_results

---

Kolom:

id

student_id

academic_year_id

ips

ipk

total_sks

---

# 6.26 TRANSKRIP

Tabel:

academic.transcripts

---

Kolom:

id

student_id

ipk

total_sks

tanggal_generate

---

# 6.27 PMB

Tabel:

pmb.applicants

---

Kolom:

id

nomor_pendaftaran

nik

nama_lengkap

email

telepon

asal_sekolah

status

---

# 6.28 DOKUMEN PMB

Tabel:

pmb.applicant_documents

---

Kolom:

id

applicant_id

jenis_dokumen

file_path

status_verifikasi

---

# 6.29 PEMBAYARAN PMB

Tabel:

finance.pmb_payments

---

Kolom:

id

applicant_id

nominal

status

tanggal_bayar

---

# 6.30 TAGIHAN MAHASISWA

Tabel:

finance.student_bills

---

Kolom:

id

student_id

jenis_tagihan

nominal

jatuh_tempo

status

---

# 6.31 PEMBAYARAN MAHASISWA

Tabel:

finance.student_payments

---

Kolom:

id

bill_id

nominal

tanggal_bayar

bukti_bayar

status

---

# 6.32 CICILAN

Tabel:

finance.installments

---

Kolom:

id

bill_id

nominal

jatuh_tempo

status

---

# 6.33 SURAT MENYURAT

Tabel:

system.letter_requests

---

Kolom:

id

student_id

jenis_surat

status

tanggal_pengajuan

---

# 6.34 DOKUMEN SURAT

Tabel:

system.letters

---

Kolom:

id

request_id

nomor_surat

file_pdf

verification_code

---

# 6.35 PERPUSTAKAAN

Tabel:

library.books

---

Kolom:

id

isbn

judul

penulis

penerbit

tahun

stok

---

# 6.36 PEMINJAMAN BUKU

Tabel:

library.book_loans

---

Kolom:

id

book_id

student_id

tanggal_pinjam

jatuh_tempo

tanggal_kembali

---

# 6.37 DENDA

Tabel:

library.fines

---

Kolom:

id

loan_id

jumlah_denda

status

---

# 6.38 E-LEARNING

Tabel:

elearning.materials

---

Kolom:

id

course_class_id

judul

deskripsi

file_path

---

# 6.39 TUGAS

Tabel:

elearning.assignments

---

Kolom:

id

course_class_id

judul

deadline

---

# 6.40 PENGUMPULAN TUGAS

Tabel:

elearning.assignment_submissions

---

Kolom:

id

assignment_id

student_id

file_path

nilai

---

# 6.41 QUIZ

Tabel:

elearning.quizzes

---

# 6.42 SOAL QUIZ

Tabel:

elearning.quiz_questions

---

# 6.43 JAWABAN QUIZ

Tabel:

elearning.quiz_answers

---

# 6.44 CBT

Tabel:

elearning.exams

---

# 6.45 SOAL CBT

Tabel:

elearning.exam_questions

---

# 6.46 ALUMNI

Tabel:

alumni.alumni_profiles

---

Kolom:

id

student_id

tahun_lulus

pekerjaan

instansi

---

# 6.47 TRACER STUDY

Tabel:

alumni.tracer_studies

---

# 6.48 SURVEY PENGGUNA ALUMNI

Tabel:

alumni.employer_surveys

---

# 6.49 NOTIFIKASI

Tabel:

system.notifications

---

Kolom:

id

user_id

judul

pesan

dibaca

---

# 6.50 PENGUMUMAN

Tabel:

system.announcements

---

Kolom:

id

judul

isi

target

tanggal_publish

---

# 6.51 AUDIT LOG

Tabel:

system.audit_logs

---

Kolom:

id

user_id

aksi

tabel

record_id

ip_address

browser

created_at

---

# 6.52 ACTIVITY LOG

Tabel:

system.activity_logs

---

Kolom:

id

user_id

aktivitas

created_at

---

# 6.53 ESTIMASI DATABASE FINAL

Core Academic:
± 60 tabel

PMB:
± 15 tabel

Finance:
± 20 tabel

Library:
± 10 tabel

E-Learning:
± 20 tabel

Alumni:
± 10 tabel

System:
± 25 tabel

Total Estimasi:

± 160 tabel

---

# 6.54 DATABASE PRINCIPLES

Database wajib:

- Normalisasi minimal 3NF
- Foreign Key wajib
- Index pada kolom pencarian
- Soft Delete pada data penting
- Audit Log penuh
- Backup harian
- Mendukung pertumbuhan 10+ tahun

Dengan struktur ini, database SIAKAD IAIMU siap mendukung lebih dari 1000 mahasiswa, ratusan dosen, dan ekspansi sistem pada masa depan tanpa perubahan besar.

# BAB 7 - API DESIGN & ENDPOINT SPECIFICATION

# 7.1 TUJUAN

Bab ini mendefinisikan standar API yang digunakan oleh Frontend React dan Backend PHP.

Prinsip utama:

- Frontend tidak mengakses database langsung.
- Seluruh data melalui REST API.
- Mendukung pengembangan Web dan Mobile.
- Mendukung versioning API.
- Mudah dikembangkan pada masa depan.

---

# 7.2 BASE URL

Production

https://api.iaimu.ac.id/api/v1

---

Staging

https://staging-api.iaimu.ac.id/api/v1

---

Development

http://localhost:8000/api/v1

---

# 7.3 RESPONSE STANDARD

## Success Response

HTTP 200

{
"success": true,
"message": "Berhasil",
"data": {}
}

---

## Validation Error

HTTP 422

{
"success": false,
"message": "Validation Error",
"errors": {}
}

---

## Unauthorized

HTTP 401

{
"success": false,
"message": "Unauthorized"
}

---

## Forbidden

HTTP 403

{
"success": false,
"message": "Forbidden"
}

---

## Not Found

HTTP 404

{
"success": false,
"message": "Data tidak ditemukan"
}

---

# 7.4 AUTH MODULE

## Login

POST

/auth/login

---

Request

{
"username": "",
"password": ""
}

---

Response

{
"access_token": "",
"refresh_token": "",
"user": {}
}

---

## Logout

POST

/auth/logout

---

## Refresh Token

POST

/auth/refresh

---

## Forgot Password

POST

/auth/forgot-password

---

## Reset Password

POST

/auth/reset-password

---

## Profile

GET

/auth/profile

---

# 7.5 USER MANAGEMENT

## List User

GET

/users

---

## Detail User

GET

/users/{id}

---

## Create User

POST

/users

---

## Update User

PUT

/users/{id}

---

## Delete User

DELETE

/users/{id}

---

## Change Status

PATCH

/users/{id}/status

---

# 7.6 FACULTY MODULE

## List Fakultas

GET

/faculties

---

## Detail Fakultas

GET

/faculties/{id}

---

## Create Fakultas

POST

/faculties

---

## Update Fakultas

PUT

/faculties/{id}

---

## Delete Fakultas

DELETE

/faculties/{id}

---

# 7.7 STUDY PROGRAM MODULE

GET

/study-programs

POST

/study-programs

PUT

/study-programs/{id}

DELETE

/study-programs/{id}

---

# 7.8 COURSE MODULE

GET

/courses

GET

/courses/{id}

POST

/courses

PUT

/courses/{id}

DELETE

/courses/{id}

---

# 7.9 STUDENT MODULE

## List Mahasiswa

GET

/students

---

## Detail Mahasiswa

GET

/students/{id}

---

## Create Mahasiswa

POST

/students

---

## Update Mahasiswa

PUT

/students/{id}

---

## Delete Mahasiswa

DELETE

/students/{id}

---

## Import Mahasiswa

POST

/students/import

---

## Export Mahasiswa

GET

/students/export

---

## Riwayat Akademik

GET

/students/{id}/academic-history

---

# 7.10 LECTURER MODULE

GET

/lecturers

GET

/lecturers/{id}

POST

/lecturers

PUT

/lecturers/{id}

DELETE

/lecturers/{id}

---

## Beban Mengajar

GET

/lecturers/{id}/teaching-load

---

# 7.11 ACADEMIC YEAR MODULE

GET

/academic-years

POST

/academic-years

PUT

/academic-years/{id}

DELETE

/academic-years/{id}

---

## Set Active

PATCH

/academic-years/{id}/activate

---

# 7.12 CLASS MODULE

GET

/classes

GET

/classes/{id}

POST

/classes

PUT

/classes/{id}

DELETE

/classes/{id}

---

# 7.13 SCHEDULE MODULE

GET

/schedules

POST

/schedules

PUT

/schedules/{id}

DELETE

/schedules/{id}

---

# 7.14 KRS MODULE

## List KRS

GET

/study-plans

---

## Detail KRS

GET

/study-plans/{id}

---

## Submit KRS

POST

/study-plans

---

## Approval KRS

POST

/study-plans/{id}/approve

---

## Reject KRS

POST

/study-plans/{id}/reject

---

## Download PDF

GET

/study-plans/{id}/pdf

---

# 7.15 KHS MODULE

GET

/study-results

GET

/study-results/{id}

---

## PDF

GET

/study-results/{id}/pdf

---

# 7.16 ATTENDANCE MODULE

## Presensi Mahasiswa

GET

/student-attendances

POST

/student-attendances

PUT

/student-attendances/{id}

---

## Presensi Dosen

GET

/lecturer-attendances

POST

/lecturer-attendances

PUT

/lecturer-attendances/{id}

---

# 7.17 GRADING MODULE

## Input Nilai

POST

/grades

---

## Update Nilai

PUT

/grades/{id}

---

## Publish Nilai

POST

/grades/publish

---

## Rekap Nilai

GET

/grades/report

---

# 7.18 TRANSCRIPT MODULE

GET

/transcripts

---

GET

/transcripts/{student_id}

---

GET

/transcripts/{student_id}/pdf

---

# 7.19 PMB MODULE

## Registrasi

POST

/pmb/register

---

## Login PMB

POST

/pmb/login

---

## Biodata

PUT

/pmb/profile

---

## Upload Dokumen

POST

/pmb/documents

---

## Status Seleksi

GET

/pmb/status

---

## Pengumuman

GET

/pmb/result

---

## Registrasi Ulang

POST

/pmb/re-registration

---

# 7.20 FINANCE MODULE

## Tagihan

GET

/bills

---

POST

/bills

---

PUT

/bills/{id}

---

## Pembayaran

GET

/payments

POST

/payments

---

## Upload Bukti

POST

/payments/upload

---

## Verifikasi

POST

/payments/{id}/verify

---

## Tolak Pembayaran

POST

/payments/{id}/reject

---

# 7.21 INSTALLMENT MODULE

GET

/installments

POST

/installments

PUT

/installments/{id}

---

# 7.22 LETTER MODULE

## Ajukan Surat

POST

/letters/request

---

## List Surat

GET

/letters

---

## Detail Surat

GET

/letters/{id}

---

## Approve Surat

POST

/letters/{id}/approve

---

## Generate PDF

POST

/letters/{id}/generate

---

## Download

GET

/letters/{id}/download

---

# 7.23 LIBRARY MODULE

## Buku

GET

/books

POST

/books

PUT

/books/{id}

DELETE

/books/{id}

---

## Peminjaman

POST

/book-loans

---

## Pengembalian

POST

/book-returns

---

## Denda

GET

/fines

---

# 7.24 E-LEARNING MODULE

## Materi

GET

/materials

POST

/materials

PUT

/materials/{id}

DELETE

/materials/{id}

---

## Tugas

GET

/assignments

POST

/assignments

PUT

/assignments/{id}

---

## Pengumpulan

POST

/assignment-submissions

---

# 7.25 QUIZ MODULE

GET

/quizzes

POST

/quizzes

PUT

/quizzes/{id}

---

## Submit Jawaban

POST

/quizzes/{id}/submit

---

# 7.26 CBT MODULE

GET

/exams

POST

/exams

PUT

/exams/{id}

---

## Mulai Ujian

POST

/exams/{id}/start

---

## Selesai Ujian

POST

/exams/{id}/finish

---

# 7.27 ALUMNI MODULE

GET

/alumni

POST

/alumni

PUT

/alumni/{id}

---

## Tracer Study

GET

/tracer-studies

POST

/tracer-studies

---

# 7.28 DASHBOARD MODULE

## Dashboard Mahasiswa

GET

/dashboard/student

---

## Dashboard Dosen

GET

/dashboard/lecturer

---

## Dashboard Kaprodi

GET

/dashboard/head-program

---

## Dashboard Dekan

GET

/dashboard/dean

---

## Dashboard Rektor

GET

/dashboard/rector

---

# 7.29 NOTIFICATION MODULE

GET

/notifications

---

POST

/notifications/read

---

POST

/notifications/read-all

---

# 7.30 ANNOUNCEMENT MODULE

GET

/announcements

---

POST

/announcements

---

PUT

/announcements/{id}

---

DELETE

/announcements/{id}

---

# 7.31 AUDIT LOG MODULE

GET

/audit-logs

---

GET

/audit-logs/{id}

---

# 7.32 FILE MODULE

POST

/files/upload

---

GET

/files/{id}

---

DELETE

/files/{id}

---

# 7.33 SEARCH MODULE

GET

/search

---

Parameter

?q=
&type=

---

Pencarian:

- Mahasiswa
- Dosen
- Mata Kuliah
- Buku
- Surat

---

# 7.34 REPORT MODULE

## Akademik

GET

/reports/academic

---

## Keuangan

GET

/reports/finance

---

## PMB

GET

/reports/pmb

---

## Alumni

GET

/reports/alumni

---

# 7.35 PDDIKTI MODULE

## Validasi Data

GET

/pddikti/validation

---

## Sinkronisasi

POST

/pddikti/sync

---

## Status Sinkronisasi

GET

/pddikti/status

---

## Riwayat Sinkronisasi

GET

/pddikti/history

---

# 7.36 ESTIMASI ENDPOINT

Authentication:
10+

Master Data:
50+

Akademik:
80+

PMB:
20+

Keuangan:
30+

Perpustakaan:
20+

E-Learning:
30+

Alumni:
15+

Dashboard:
20+

System:
30+

Total Estimasi:

± 300 Endpoint REST API

---

# 7.37 API DEVELOPMENT PRINCIPLES

Semua endpoint wajib:

- Menggunakan JWT
- Menggunakan RBAC
- Memiliki validation
- Memiliki pagination
- Memiliki filtering
- Memiliki sorting
- Memiliki audit log

---

# 7.38 API SUCCESS CRITERIA

API dianggap siap produksi apabila:

- Konsisten.
- Teruji.
- Terdokumentasi.
- Mendukung mobile.
- Mendukung frontend React.
- Mendukung pengembangan jangka panjang.

# BAB 8 - UI/UX DESIGN SYSTEM

## Filosofi Desain

SIAKAD IAIMU harus memiliki tampilan modern, profesional, cepat, dan mudah digunakan.

Inspirasi:

- Dashboard SaaS Modern
- Sistem Kampus Internasional
- Clean Design
- Mobile Friendly

---

## Design Principles

- Simple
- Consistent
- Responsive
- Accessible
- Professional

---

## Color System

Primary:
Green Islamic Modern

Secondary:
Emerald

Success:
Green

Warning:
Orange

Danger:
Red

Info:
Blue

---

## Typography

Font:

Inter

Fallback:

Segoe UI

Roboto

Sans Serif

---

## Layout

Sidebar Navigation

Top Navigation

Content Area

Notification Panel

---

## UI Components

- Button
- Input
- Select
- Date Picker
- Table
- Card
- Modal
- Badge
- Tabs
- Breadcrumb
- Pagination

---

## Dark Mode

Wajib tersedia.

---

## Responsive Breakpoints

Mobile

Tablet

Laptop

Desktop

---

# BAB 9 - ROLE & PERMISSION MATRIX

## Super Admin

Akses penuh seluruh sistem.

---

## Rektor

View seluruh data.

Tidak dapat mengubah data akademik.

---

## Dekan

View data fakultas.

Approval tertentu.

---

## Kaprodi

Mengelola program studi.

Monitoring mahasiswa.

---

## Admin Akademik

Mengelola seluruh proses akademik.

---

## Admin Fakultas

Mengelola data fakultas.

---

## Admin Prodi

Mengelola data prodi.

---

## Dosen

- Presensi
- Nilai
- Materi
- Tugas

---

## Mahasiswa

- KRS
- KHS
- Jadwal
- Pembayaran

---

## Keuangan

- Tagihan
- Pembayaran
- Laporan

---

## PMB

- Pendaftaran
- Seleksi
- Verifikasi

---

## Perpustakaan

- Buku
- Peminjaman
- Denda

---

## Alumni

- Tracer Study
- Profil Alumni

---

## Orang Tua

View akademik mahasiswa.

View pembayaran.

---

# BAB 10 - SECURITY ARCHITECTURE

## Security Layers

Layer 1

HTTPS

---

Layer 2

JWT Authentication

---

Layer 3

RBAC

---

Layer 4

Input Validation

---

Layer 5

Audit Log

---

Layer 6

Backup

---

## Security Features

- SQL Injection Protection
- XSS Protection
- CSRF Protection
- Rate Limiting
- Password Hashing
- Session Management

---

## Password

Minimal 8 karakter.

Harus mengandung:

- Huruf Besar
- Huruf Kecil
- Angka

---

# BAB 11 - TESTING STRATEGY

## Unit Testing

Controller

Service

Repository

---

## Integration Testing

API

Database

Authentication

---

## User Acceptance Test

Admin

Dosen

Mahasiswa

Keuangan

PMB

---

## Load Testing

Minimal:

300 concurrent users

---

## Security Testing

Authentication

Authorization

Input Validation

---

# BAB 12 - DEPLOYMENT & DEVOPS

## Environment

Development

Staging

Production

---

## Server

Ubuntu LTS

---

## Web Server

Nginx

---

## PHP

PHP 8.4+

---

## Database

PostgreSQL

---

## SSL

HTTPS Wajib

---

## Backup

Database Harian

File Harian

---

## Monitoring

CPU

RAM

Disk

Database

Logs

---

# BAB 13 - DEVELOPMENT ROADMAP

## Phase 1

Core System

- Authentication
- Master Data
- Mahasiswa
- Dosen
- Fakultas
- Prodi

Durasi:

4 Minggu

---

## Phase 2

Akademik

- KRS
- KHS
- Jadwal
- Nilai
- Presensi

Durasi:

6 Minggu

---

## Phase 3

PMB

Durasi:

3 Minggu

---

## Phase 4

Keuangan

Durasi:

4 Minggu

---

## Phase 5

E-Learning

Durasi:

4 Minggu

---

## Phase 6

Perpustakaan

Durasi:

2 Minggu

---

## Phase 7

Alumni

Durasi:

2 Minggu

---

## Phase 8

PDDIKTI Ready

Durasi:

3 Minggu

---

# BAB 14 - FRONTEND PROJECT STRUCTURE

frontend/

src/

api/

assets/

components/

features/

hooks/

layouts/

pages/

routes/

services/

stores/

types/

utils/

validations/

---

## Feature Modules

auth/

dashboard/

students/

lecturers/

krs/

khs/

grades/

finance/

pmb/

library/

alumni/

letters/

---

## Frontend Principles

- Reusable Component
- Feature Based
- Clean Architecture
- Type Safe
- Responsive

---

# BAB 15 - BACKEND PROJECT STRUCTURE

backend/

app/

Controllers/

Services/

Repositories/

Models/

Validators/

Middleware/

Policies/

Helpers/

Exceptions/

routes/

config/

storage/

tests/

vendor/

public/

---

## Backend Principles

Controller

↓

Service

↓

Repository

↓

Database

---

Tidak boleh:

Controller → Database langsung

---

# BAB 16 - ACCEPTANCE CRITERIA & DEFINITION OF DONE

## Sistem dianggap selesai apabila:

### Authentication

- Login berjalan
- Logout berjalan
- Permission berjalan

---

### Akademik

- KRS berjalan
- KHS berjalan
- Nilai berjalan
- Presensi berjalan

---

### PMB

- Registrasi berjalan
- Upload dokumen berjalan

---

### Keuangan

- Tagihan berjalan
- Pembayaran berjalan

---

### Surat

- Generate PDF berjalan
- QR Verification berjalan

---

### Perpustakaan

- Peminjaman berjalan
- Pengembalian berjalan

---

### E-Learning

- Materi berjalan
- Tugas berjalan
- Quiz berjalan

---

### Alumni

- Tracer Study berjalan

---

### Dashboard

- Statistik tampil

---

### Security

- JWT aktif
- RBAC aktif
- Audit Log aktif

---

### Performance

- Login < 2 detik
- Dashboard < 3 detik

---

### Deployment

- HTTPS aktif
- Backup aktif
- Monitoring aktif

---

# PENUTUP

SIAKAD IAIMU dirancang sebagai sistem informasi akademik modern dengan arsitektur Frontend dan Backend yang sepenuhnya terpisah.

Frontend menggunakan:

- React
- Vite
- Tailwind CSS
- Axios
- Zustand
- TanStack Query

Backend menggunakan:

- PHP Native Enterprise Architecture
- REST API
- JWT Authentication
- Repository Pattern
- Service Layer

Database menggunakan:

- PostgreSQL

Arsitektur ini dipilih karena:

- Mudah dikembangkan
- Mudah dipelihara
- Mudah diperbaiki
- Mendukung Mobile App
- Mendukung Integrasi PDDIKTI
- Siap digunakan 10+ tahun ke depan

Dokumen PRD ini menjadi acuan resmi seluruh proses desain, pengembangan, pengujian, deployment, dan pemeliharaan SIAKAD IAIMU.
