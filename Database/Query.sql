CREATE TYPE user_role AS ENUM (
    'admin',
    'user'
);

CREATE TYPE MonthEnum AS ENUM (
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
);


--Tabel Personel K3
CREATE TABLE personel_k3 (
    personel_k3_id SERIAL PRIMARY KEY,           
    nama VARCHAR(100),     
    role_personel_k3 VARCHAR(100),      
    batas_masa_berlaku DATE 
);

--Tabel Kecelakaan Kerja
CREATE TABLE kecelakaan_kerja (
    kecelakaan_kerja_id SERIAL PRIMARY KEY,
    Tanggal DATE,
    NIK VARCHAR(20),
    Nama VARCHAR(100),
    Jabatan VARCHAR(50),
    Ruas VARCHAR(50),
    Kronologis TEXT,
    Kategori_Kecelakaan VARCHAR(50),
    Tindak_Lanjut TEXT,
    Perawatan_di_RS DATE
);

--Tabel Kejadian Darurat
CREATE TABLE kejadian_darurat (
    kejadian_darurat_id SERIAL PRIMARY KEY,
    Kejadian_Darurat VARCHAR(100),
    Lokasi VARCHAR(100),
    Kronologi_Kejadian TEXT,
    Tindak_Lanjut TEXT,
    evidence BYTEA
);

--Tabel Rekap Data K3
CREATE TABLE rekap_data_k3 (
    no SERIAL PRIMARY KEY,
    bulan monthenum,
    jumlah_karyawan_ops NUMERIC,
    jumlah_karyawan_non_ops NUMERIC,
    jumlah_hari_kerja_ops NUMERIC,
    jumlah_hari_kerja_non_ops NUMERIC,
    jumlah_jam_kerja NUMERIC,
    kecelakaan_berat_ops NUMERIC,
    kecelakaan_berat_non_ops NUMERIC,
    kecelakaan_ringan_ops NUMERIC,
    kecelakaan_ringan_non_ops NUMERIC,
    kecelakaan_meninggal_ops NUMERIC,
    kecelakaan_meninggal_non_ops NUMERIC,
    kecelakaan_near_miss_ops NUMERIC,
    kecelakaan_near_miss_non_ops NUMERIC,
    fire_accident NUMERIC,
    damaged_property NUMERIC,
    jumlah_hari_hilang_ops NUMERIC,
    jumlah_hari_hilang_non_ops NUMERIC,
    jumlah_hari_tanpa_hilang_ops NUMERIC,
    jumlah_hari_tanpa_hilang_non_ops NUMERIC,
    lti_ops NUMERIC,
    lti_non_ops NUMERIC,
    man_hour_ops NUMERIC,
    man_hour_non_ops NUMERIC,
    fr NUMERIC,
    sr NUMERIC,
    ir NUMERIC,
    atlr NUMERIC,
    tahun INT
);

--Tabel Struktur Organisasi
CREATE TABLE struktur_organisasi (
    struktur_id SERIAL PRIMARY KEY  ,
    nama VARCHAR(100) ,
    jabatan VARCHAR(50) 
);

-- Tabel Checklist K3
CREATE TABLE checklist_k3 (
    checklist_id SERIAL PRIMARY KEY,
    section TEXT,  
    indikator_k3 TEXT,
    expired_date BYTEA,
    check_list_Pemeriksaan BYTEA,
    rambu_apar BYTEA,
    kelengkapan_box_hydrant BYTEA,
    ruang_laktasi BYTEA,
    ruang_p3k BYTEA,
    organik BYTEA,
    non_organik BYTEA,
    limbah_b3 BYTEA,
    smoking_area BYTEA,
    dll BYTEA
);

--Tabel Akun Ruas
CREATE TABLE akun_ruas (
    ruas_id SERIAL PRIMARY KEY,
    ruas VARCHAR(100),
    pass_ruas TEXT
);

























