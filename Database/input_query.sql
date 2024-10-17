INSERT INTO rekap_data_k3 
(
    bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops, jumlah_jam_kerja, 
    kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, 
    kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops, 
    jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
) 
VALUES 
(
    'February', 
    115, 
    75,  
    20,  
    19,  
    1600, 
    1,   
    0,   
    1,   
    2,   
    0,   
    1,   
    2,   
    1,   
    0,   
    0,   
    1,   
    0,   
    1,   
    1,   
    21,  
    17,  
    90,  
    70,  
    1500, 
    1300  
);

INSERT INTO kecelakaan_kerja_jagorawi 
(Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS) 
VALUES 
('2023-09-15', '1234567890', 'Pekerja 1', 'Supervisor', 'JAGORAWI', 'Kecelakaan terjadi saat bekerja di lapangan.', 'Ringan', 'Memberikan istirahat selama 2 hari', '2023-09-16');


-- Insert example data for section A: Perlengkapan Keadaan Darurat
INSERT INTO checklist_k3 (section, indikator_k3, jumlah_item, kriteria, evidence)
VALUES
('A', 'APAR 6 Kg (Powder)', NULL, 'Expired date', NULL),
('A', 'APAR 6 Kg (Powder)', NULL, 'Check list Pemeriksaan', NULL),
('A', 'APAR 6 Kg (Powder)', NULL, 'Rambu APAR', NULL),
('A', 'APAR 6,8 Kg (CO)', NULL, 'Expired date', NULL),
('A', 'APAR 6,8 Kg (CO)', NULL, 'Check list Pemeriksaan', NULL),
('A', 'APAR 6,8 Kg (CO)', NULL, 'Rambu APAR', NULL),
('A', 'Hydrant', NULL, 'Check list Pemeriksaan', NULL),
('A', 'Hydrant', NULL, 'Kelengkapan Box Hydrant', NULL),
('A', 'Rambu-rambu evakuasi', NULL, NULL, NULL),
('A', 'Titik/ Rambu Assembly point', NULL, NULL, NULL),
('A', 'Kotak P3K dan isinya lengkap', NULL, NULL, NULL),
('A', 'Ruang Kesehatan - Ruang Laktasi', NULL, NULL, NULL),
('A', 'Ruang Kesehatan - Ruang P3K', NULL, NULL, NULL),
('A', 'Nomor telepon penting saat keadaan darurat', NULL, NULL, NULL),
('A', 'Dokumen HIRADC', NULL, NULL, NULL),
('A', 'Prosedur keadaan darurat terpasang', NULL, NULL, NULL);

-- Insert example data for section B: Operasional
INSERT INTO checklist_k3 (section, indikator_k3, jumlah_item, kriteria, evidence)
VALUES
('B', 'Pengelolaan Sampah', NULL, 'Organik', NULL),
('B', 'Pengelolaan Sampah', NULL, 'Non Organik', NULL),
('B', 'Pengelolaan Sampah', NULL, 'Limbah B3', NULL),
('B', 'Penerangan', NULL, NULL, NULL),
('B', 'Kenyamanan dan keamanan prasarana', NULL, 'Smoking Area', NULL),
('B', 'Kenyamanan dan keamanan prasarana', NULL, 'Keamanan dan Ketertiban tempat parkir, tenant, dll', NULL),
('B', 'Petugas keamanan', NULL, NULL, NULL);
