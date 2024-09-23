const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./configs/db.configs.js');
const path = require('path');

// Middleware (session)
app.use(
    session({
        secret: 'ini contoh secret',
        saveUninitialized: false,
        resave: false
    })
);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static('public'));

// Route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Routing TABEL REKAP DATA K3
// Menampilkan seluruh data dari Tabel
router.get('/getdata', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh data dari Tabel Jagorawi
router.get('/getdatajagorawi', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3_jagorawi', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh data dari Tabel Cipularang
router.get('/getdatacipularang', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3_cipularang', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh personel dari Tabel Jagorawi
router.get('/getpersoneljagorawi', (req, res) => {
    db.query('SELECT * FROM personel_k3_jagorawi', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh personel dari Tabel Cipularang
router.get('/getpersonelcipularang', (req, res) => {
    db.query('SELECT * FROM personel_k3_cipularang', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh kecelakaan dari Tabel Jagorawi
router.get('/getkecelakaanjagorawi', (req, res) => {
    db.query('SELECT * FROM kecelakaan_kerja_jagorawi', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh kecelakaan dari Tabel Cipularang
router.get('/getkecelakaancipularang', (req, res) => {
    db.query('SELECT * FROM personel_k3_cipularang', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});



// Routing TABEL REKAP DATA K3
// Menambahkan data baru ke dalam Tabel 
router.post('/adddata', (req, res) => {
    const {
        bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops, jumlah_jam_kerja,
        kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops,
        jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
    } = req.body;

    const query = `
        INSERT INTO rekap_data_k3 (
            bulan, 
            jumlah_karyawan_ops, 
            jumlah_karyawan_non_ops, 
            jumlah_hari_kerja_ops, 
            jumlah_hari_kerja_non_ops, 
            jumlah_jam_kerja,
            kecelakaan_berat_ops, 
            kecelakaan_berat_non_ops, 
            kecelakaan_ringan_ops, 
            kecelakaan_ringan_non_ops, 
            kecelakaan_meninggal_ops, 
            kecelakaan_meninggal_non_ops,
            kecelakaan_near_miss_ops, 
            kecelakaan_near_miss_non_ops, 
            fire_accident_ops, 
            fire_accident_non_ops, 
            damaged_property_ops, 
            damaged_property_non_ops,
            jumlah_hari_hilang_ops, 
            jumlah_hari_hilang_non_ops, 
            jumlah_hari_tanpa_hilang_ops, 
            jumlah_hari_tanpa_hilang_non_ops, 
            lti_ops, 
            lti_non_ops, 
            man_hour_ops, 
            man_hour_non_ops)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
    `;
    const values = [
        bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops, jumlah_jam_kerja,
        kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops,
        jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database Error' });
            return;
        }
        res.json({ message: 'Data Added Successfully' });
    });
});


// Menambahkan data baru ke dalam Tabel Jagorawi
router.post('/adddatajagorawi', (req, res) => {
    const {
        bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops, jumlah_jam_kerja,
        kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops,
        jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
    } = req.body;

    const query = `
        INSERT INTO rekap_data_k3_jagorawi (
            bulan, 
            jumlah_karyawan_ops, 
            jumlah_karyawan_non_ops, 
            jumlah_hari_kerja_ops, 
            jumlah_hari_kerja_non_ops, 
            jumlah_jam_kerja,
            kecelakaan_berat_ops, 
            kecelakaan_berat_non_ops, 
            kecelakaan_ringan_ops, 
            kecelakaan_ringan_non_ops, 
            kecelakaan_meninggal_ops, 
            kecelakaan_meninggal_non_ops,
            kecelakaan_near_miss_ops, 
            kecelakaan_near_miss_non_ops, 
            fire_accident_ops, 
            fire_accident_non_ops, 
            damaged_property_ops, 
            damaged_property_non_ops,
            jumlah_hari_hilang_ops, 
            jumlah_hari_hilang_non_ops, 
            jumlah_hari_tanpa_hilang_ops, 
            jumlah_hari_tanpa_hilang_non_ops, 
            lti_ops, 
            lti_non_ops, 
            man_hour_ops, 
            man_hour_non_ops)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
    `;
    const values = [
        bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops, jumlah_jam_kerja,
        kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops,
        jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database Error' });
            return;
        }
        res.json({ message: 'Success' }); // Pastikan 'Success' ini dikirim
    });
    
});


// Menambahkan kecelakaan baru ke dalam Tabel Jagorawi
router.post('/addkecelakaanjagorawi', (req, res) => {
    const { Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk insert data
    const query = `
        INSERT INTO kecelakaan_kerja_jagorawi 
        (Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS])
        .then(() => {
            res.status(200).json({ message: 'Success' });
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data' });
        });
});


// Menambahkan personel baru ke dalam Tabel Jagorawi
router.post('/addpersoneljagorawi', (req, res) => {
    const { nama, role_personel_k3, batas_masa_berlaku } = req.body;
    
    // Query untuk memasukkan data ke dalam tabel personel_k3_jagorawi
    const query = `
        INSERT INTO personel_k3_jagorawi (nama, role_personel_k3, batas_masa_berlaku) 
        VALUES ($1, $2, $3) 
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [nama, role_personel_k3, batas_masa_berlaku])
        .then(() => {
            res.status(200).json({ message: 'Success' });
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data' });
        });
});



// Mengupdate data personel berdasarkan personel_k3_id
// Route untuk memperbarui data personel K3
router.put('/updatepersoneljagorawi', (req, res) => {
    const { personel_k3_id, nama, role_personel_k3, batas_masa_berlaku } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE personel_k3_jagorawi 
        SET nama = $1, role_personel_k3 = $2, batas_masa_berlaku = $3
        WHERE personel_k3_id = $4
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [nama, role_personel_k3, batas_masa_berlaku, personel_k3_id])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});

// Mengupdate data personel berdasarkan kecelakaan_kerja_id
// Route untuk memperbarui data kecelakaan
router.put('/updatekecelakaanjagorawi', (req, res) => {
    const { kecelakaan_kerja_id, Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE kecelakaan_kerja_jagorawi 
        SET Tanggal = $1, NIK = $2, Nama = $3, Jabatan = $4, Ruas = $5, Kronologis = $6, 
        Kategori_Kecelakaan = $7, Tindak_Lanjut = $8, Perawatan_di_RS = $9
        WHERE kecelakaan_kerja_id = $10
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS, kecelakaan_kerja_id])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


// Mengupdate data personel berdasarkan data rekap id
// Update rekap data k3 entry
router.put('/updaterekapdatajagorawi', (req, res) => {
    const {
        no, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops,
        jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops,
        lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
    } = req.body;

    const query = `
        UPDATE rekap_data_k3_jagorawi
        SET bulan = $1, jumlah_karyawan_ops = $2, jumlah_karyawan_non_ops = $3, jumlah_hari_kerja_ops = $4, jumlah_hari_kerja_non_ops = $5, 
            jumlah_jam_kerja = $6, kecelakaan_berat_ops = $7, kecelakaan_berat_non_ops = $8, kecelakaan_ringan_ops = $9, 
            kecelakaan_ringan_non_ops = $10, kecelakaan_meninggal_ops = $11, kecelakaan_meninggal_non_ops = $12, 
            kecelakaan_near_miss_ops = $13, kecelakaan_near_miss_non_ops = $14, fire_accident_ops = $15, fire_accident_non_ops = $16, 
            damaged_property_ops = $17, damaged_property_non_ops = $18, jumlah_hari_hilang_ops = $19, jumlah_hari_hilang_non_ops = $20, 
            jumlah_hari_tanpa_hilang_ops = $21, jumlah_hari_tanpa_hilang_non_ops = $22, lti_ops = $23, lti_non_ops = $24, 
            man_hour_ops = $25, man_hour_non_ops = $26
        WHERE no = $27
    `;

    db.query(query, [
        bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops,
        jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops,
        lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, no
    ])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});




//Login Page
router.post('/login', async (req, res) => {
    const { ruas, pass_ruas } = req.body;
    const query = 'SELECT ruas, pass_ruas, userrole FROM akun_ruas WHERE ruas = $1;';
    db.query(query, [ruas], (err, results) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
  
      if (results.rowCount < 1) {
        return res.status(401).send('Nama Ruas salah'); // Nama tidak ditemukan
      }
  
      const storedPassword = results.rows[0].pass_ruas;
      const userRole = results.rows[0].userrole;
  
      if (pass_ruas === storedPassword) {
        if (userRole === 'admin' || userRole === 'user') {
          req.session.userRole = userRole;
            return res.status(200).json({
                message: "Login successful", showItems: results.rows
            });
        } else {
            return res.status(401).send('Hanya user dan admin yang dapat login');
        }
      } 
      return res.status(401).send('Password salah');
    });
});



app.get('/session', (req, res) => {
    const sessionData = req.session;
    res.json(sessionData);
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
