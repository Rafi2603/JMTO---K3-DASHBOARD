const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./configs/db.configs.js');

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


app.get('/session', (req, res) => {
    const sessionData = req.session;
    res.json(sessionData);
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
