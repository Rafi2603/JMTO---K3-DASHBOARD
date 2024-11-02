const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./configs/db.configs.js');
const path = require('path');
const cors = require('cors');
// Middleware (session)

app.use(cors({
    origin: '*' // or '*' for all origins
}));

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



// Menampilkan seluruh data dari Tabel cikampek
router.get('/getdatacikampek', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3_cikampek', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getdatabali', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3_bali', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getdatabalsam', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3_balsam', (err, results) => {
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


router.get('/getpersonelcikampek', (req, res) => {
    db.query('SELECT * FROM personel_k3_cikampek', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});



// Menampilkan seluruh personel dari Tabel Cipularang
router.get('/getpersonelbali', (req, res) => {
    db.query('SELECT * FROM personel_k3_bali', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getpersonelbalsam', (req, res) => {
    db.query('SELECT * FROM personel_k3_balsam', (err, results) => {
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


router.get('/getkecelakaancikampek', (req, res) => {
    db.query('SELECT * FROM kecelakaan_kerja_cikampek', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getkecelakaanbali', (req, res) => {
    db.query('SELECT * FROM kecelakaan_kerja_bali', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getkecelakaanbalsam', (req, res) => {
    db.query('SELECT * FROM kecelakaan_kerja_balsam', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});



// Assuming you're using Express and pg for PostgreSQL
router.get('/getkejadianjagorawi', (req, res) => {
    const query = 'SELECT * FROM kejadian_darurat_jagorawi';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const evidenceBase64 = row.evidence ? Buffer.from(row.evidence).toString('base64') : null;

                return {
                    ...row,
                    evidence: evidenceBase64 // Set the encoded image
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});


// Assuming you're using Express and pg for PostgreSQL
router.get('/getkejadiancikampek', (req, res) => {
    const query = 'SELECT * FROM kejadian_darurat_cikampek';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const evidenceBase64 = row.evidence ? Buffer.from(row.evidence).toString('base64') : null;

                return {
                    ...row,
                    evidence: evidenceBase64 // Set the encoded image
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});


router.get('/getkejadianbali', (req, res) => {
    const query = 'SELECT * FROM kejadian_darurat_bali';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const evidenceBase64 = row.evidence ? Buffer.from(row.evidence).toString('base64') : null;

                return {
                    ...row,
                    evidence: evidenceBase64 // Set the encoded image
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});


router.get('/getkejadianbalsam', (req, res) => {
    const query = 'SELECT * FROM kejadian_darurat_balsam';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const evidenceBase64 = row.evidence ? Buffer.from(row.evidence).toString('base64') : null;

                return {
                    ...row,
                    evidence: evidenceBase64 // Set the encoded image
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});



router.get('/getstrukturjagorawi', (req, res) => {
    db.query('SELECT * FROM struktur_organisasi_jagorawi ORDER BY jabatan', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getstrukturcikampek', (req, res) => {
    db.query('SELECT * FROM struktur_organisasi_cikampek ORDER BY jabatan', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getstrukturbali', (req, res) => {
    db.query('SELECT * FROM struktur_organisasi_bali ORDER BY jabatan', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getstrukturbalsam', (req, res) => {
    db.query('SELECT * FROM struktur_organisasi_balsam ORDER BY jabatan', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


router.get('/getstrukturbelmara', (req, res) => {
    db.query('SELECT * FROM struktur_organisasi_belmara ORDER BY jabatan', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});





router.get('/getchecklistjagorawi', (req, res) => {
    const query = 'SELECT * FROM checklist_k3_jagorawi';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const expired_dateBase64 = row.expired_date ? Buffer.from(row.expired_date).toString('base64') : null;
                const check_list_pemeriksaanBase64 = row.check_list_pemeriksaan ? Buffer.from(row.check_list_pemeriksaan).toString('base64') : null;
                const rambu_aparBase64 = row.rambu_apar ? Buffer.from(row.rambu_apar).toString('base64') : null;
                const kelengkapan_box_hydrantBase64 = row.kelengkapan_box_hydrant ? Buffer.from(row.kelengkapan_box_hydrant).toString('base64') : null;
                const ruang_laktasiBase64 = row.ruang_laktasi ? Buffer.from(row.ruang_laktasi).toString('base64') : null;
                const ruang_p3kBase64 = row.ruang_p3k ? Buffer.from(row.ruang_p3k).toString('base64') : null;
                const organikBase64 = row.organik ? Buffer.from(row.organik).toString('base64') : null;
                const non_organikBase64 = row.non_organik ? Buffer.from(row.non_organik).toString('base64') : null;
                const limbah_b3Base64 = row.limbah_b3 ? Buffer.from(row.limbah_b3).toString('base64') : null;
                const smoking_areaBase64 = row.smoking_area ? Buffer.from(row.smoking_area).toString('base64') : null;
                const dllBase64 = row.dll ? Buffer.from(row.dll).toString('base64') : null;

                // Return all fields
                return {
                    ...row,
                    expired_date: expired_dateBase64,
                    check_list_pemeriksaan: check_list_pemeriksaanBase64,
                    rambu_apar: rambu_aparBase64,
                    kelengkapan_box_hydrant: kelengkapan_box_hydrantBase64,
                    ruang_laktasi: ruang_laktasiBase64,
                    ruang_p3k: ruang_p3kBase64,
                    organik: organikBase64,
                    non_organik: non_organikBase64,
                    limbah_b3: limbah_b3Base64,
                    smoking_area: smoking_areaBase64,
                    dll: dllBase64
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});


router.get('/getchecklistcikampek', (req, res) => {
    const query = 'SELECT * FROM checklist_k3_cikampek';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const expired_dateBase64 = row.expired_date ? Buffer.from(row.expired_date).toString('base64') : null;
                const check_list_pemeriksaanBase64 = row.check_list_pemeriksaan ? Buffer.from(row.check_list_pemeriksaan).toString('base64') : null;
                const rambu_aparBase64 = row.rambu_apar ? Buffer.from(row.rambu_apar).toString('base64') : null;
                const kelengkapan_box_hydrantBase64 = row.kelengkapan_box_hydrant ? Buffer.from(row.kelengkapan_box_hydrant).toString('base64') : null;
                const ruang_laktasiBase64 = row.ruang_laktasi ? Buffer.from(row.ruang_laktasi).toString('base64') : null;
                const ruang_p3kBase64 = row.ruang_p3k ? Buffer.from(row.ruang_p3k).toString('base64') : null;
                const organikBase64 = row.organik ? Buffer.from(row.organik).toString('base64') : null;
                const non_organikBase64 = row.non_organik ? Buffer.from(row.non_organik).toString('base64') : null;
                const limbah_b3Base64 = row.limbah_b3 ? Buffer.from(row.limbah_b3).toString('base64') : null;
                const smoking_areaBase64 = row.smoking_area ? Buffer.from(row.smoking_area).toString('base64') : null;
                const dllBase64 = row.dll ? Buffer.from(row.dll).toString('base64') : null;

                // Return all fields
                return {
                    ...row,
                    expired_date: expired_dateBase64,
                    check_list_pemeriksaan: check_list_pemeriksaanBase64,
                    rambu_apar: rambu_aparBase64,
                    kelengkapan_box_hydrant: kelengkapan_box_hydrantBase64,
                    ruang_laktasi: ruang_laktasiBase64,
                    ruang_p3k: ruang_p3kBase64,
                    organik: organikBase64,
                    non_organik: non_organikBase64,
                    limbah_b3: limbah_b3Base64,
                    smoking_area: smoking_areaBase64,
                    dll: dllBase64
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});


router.get('/getchecklistbali', (req, res) => {
    const query = 'SELECT * FROM checklist_k3_bali';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const expired_dateBase64 = row.expired_date ? Buffer.from(row.expired_date).toString('base64') : null;
                const check_list_pemeriksaanBase64 = row.check_list_pemeriksaan ? Buffer.from(row.check_list_pemeriksaan).toString('base64') : null;
                const rambu_aparBase64 = row.rambu_apar ? Buffer.from(row.rambu_apar).toString('base64') : null;
                const kelengkapan_box_hydrantBase64 = row.kelengkapan_box_hydrant ? Buffer.from(row.kelengkapan_box_hydrant).toString('base64') : null;
                const ruang_laktasiBase64 = row.ruang_laktasi ? Buffer.from(row.ruang_laktasi).toString('base64') : null;
                const ruang_p3kBase64 = row.ruang_p3k ? Buffer.from(row.ruang_p3k).toString('base64') : null;
                const organikBase64 = row.organik ? Buffer.from(row.organik).toString('base64') : null;
                const non_organikBase64 = row.non_organik ? Buffer.from(row.non_organik).toString('base64') : null;
                const limbah_b3Base64 = row.limbah_b3 ? Buffer.from(row.limbah_b3).toString('base64') : null;
                const smoking_areaBase64 = row.smoking_area ? Buffer.from(row.smoking_area).toString('base64') : null;
                const dllBase64 = row.dll ? Buffer.from(row.dll).toString('base64') : null;

                // Return all fields
                return {
                    ...row,
                    expired_date: expired_dateBase64,
                    check_list_pemeriksaan: check_list_pemeriksaanBase64,
                    rambu_apar: rambu_aparBase64,
                    kelengkapan_box_hydrant: kelengkapan_box_hydrantBase64,
                    ruang_laktasi: ruang_laktasiBase64,
                    ruang_p3k: ruang_p3kBase64,
                    organik: organikBase64,
                    non_organik: non_organikBase64,
                    limbah_b3: limbah_b3Base64,
                    smoking_area: smoking_areaBase64,
                    dll: dllBase64
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});


router.get('/getchecklistbalsam', (req, res) => {
    const query = 'SELECT * FROM checklist_k3_balsam';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const expired_dateBase64 = row.expired_date ? Buffer.from(row.expired_date).toString('base64') : null;
                const check_list_pemeriksaanBase64 = row.check_list_pemeriksaan ? Buffer.from(row.check_list_pemeriksaan).toString('base64') : null;
                const rambu_aparBase64 = row.rambu_apar ? Buffer.from(row.rambu_apar).toString('base64') : null;
                const kelengkapan_box_hydrantBase64 = row.kelengkapan_box_hydrant ? Buffer.from(row.kelengkapan_box_hydrant).toString('base64') : null;
                const ruang_laktasiBase64 = row.ruang_laktasi ? Buffer.from(row.ruang_laktasi).toString('base64') : null;
                const ruang_p3kBase64 = row.ruang_p3k ? Buffer.from(row.ruang_p3k).toString('base64') : null;
                const organikBase64 = row.organik ? Buffer.from(row.organik).toString('base64') : null;
                const non_organikBase64 = row.non_organik ? Buffer.from(row.non_organik).toString('base64') : null;
                const limbah_b3Base64 = row.limbah_b3 ? Buffer.from(row.limbah_b3).toString('base64') : null;
                const smoking_areaBase64 = row.smoking_area ? Buffer.from(row.smoking_area).toString('base64') : null;
                const dllBase64 = row.dll ? Buffer.from(row.dll).toString('base64') : null;

                // Return all fields
                return {
                    ...row,
                    expired_date: expired_dateBase64,
                    check_list_pemeriksaan: check_list_pemeriksaanBase64,
                    rambu_apar: rambu_aparBase64,
                    kelengkapan_box_hydrant: kelengkapan_box_hydrantBase64,
                    ruang_laktasi: ruang_laktasiBase64,
                    ruang_p3k: ruang_p3kBase64,
                    organik: organikBase64,
                    non_organik: non_organikBase64,
                    limbah_b3: limbah_b3Base64,
                    smoking_area: smoking_areaBase64,
                    dll: dllBase64
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});


// Routing TABEL REKAP DATA K3
// Menambahkan data baru ke dalam Tabel Jagorawi
// Route untuk menambahkan data
// Menambahkan data baru ke dalam Tabel Jagorawi
router.post('/adddatajagorawi', (req, res) => {
    const {
        tahun,
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
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops,
        jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops,
        lti_ops,
        lti_non_ops,
        man_hour_ops,
        man_hour_non_ops,
        fr,
        sr,
        ir,
        atlr
    } = req.body;

    const query = `
        INSERT INTO rekap_data_k3_bali (
                tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
                jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
                kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
                fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
                jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25,
             $26, $27, $28, $29)
    `;
    const values = [
        tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database Error' });
            return;
        }
        res.status(201).json({ message: 'Success' }); // Send 201 status code for success
    });
});


router.post('/adddatacikampek', (req, res) => {
    const {
        tahun,
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
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops,
        jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops,
        lti_ops,
        lti_non_ops,
        man_hour_ops,
        man_hour_non_ops,
        fr,
        sr,
        ir,
        atlr
    } = req.body;

    const query = `
        INSERT INTO rekap_data_k3_bali (
                tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
                jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
                kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
                fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
                jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25,
             $26, $27, $28, $29)
    `;
    const values = [
        tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database Error' });
            return;
        }
        res.status(201).json({ message: 'Success' }); // Send 201 status code for success
    });
});


router.post('/adddatabali', (req, res) => {
    const {
        tahun,
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
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops,
        jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops,
        lti_ops,
        lti_non_ops,
        man_hour_ops,
        man_hour_non_ops,
        fr,
        sr,
        ir,
        atlr
    } = req.body;

    const query = `
        INSERT INTO rekap_data_k3_bali (
                tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
                jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
                kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
                fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
                jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25,
             $26, $27, $28, $29)
    `;
    const values = [
        tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database Error' });
            return;
        }
        res.status(201).json({ message: 'Success' }); // Send 201 status code for success
    });
});


router.post('/adddatabalsam', (req, res) => {
    const {
        tahun,
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
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops,
        jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops,
        lti_ops,
        lti_non_ops,
        man_hour_ops,
        man_hour_non_ops,
        fr,
        sr,
        ir,
        atlr
    } = req.body;

    const query = `
        INSERT INTO rekap_data_k3_balsam (
                tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
                jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
                kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
                fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
                jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25,
             $26, $27, $28, $29)
    `;
    const values = [
        tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database Error' });
            return;
        }
        res.status(201).json({ message: 'Success' }); // Send 201 status code for success
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


router.post('/addkecelakaancikampek', (req, res) => {
    const { Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk insert data
    const query = `
        INSERT INTO kecelakaan_kerja_cikampek
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


router.post('/addkecelakaanbali', (req, res) => {
    const { Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk insert data
    const query = `
        INSERT INTO kecelakaan_kerja_bali
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


router.post('/addkecelakaanbalsam', (req, res) => {
    const { Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk insert data
    const query = `
        INSERT INTO kecelakaan_kerja_balsam
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

router.post('/addpersonelcikampek', (req, res) => {
    const { nama, role_personel_k3, batas_masa_berlaku } = req.body;
    
    // Query untuk memasukkan data ke dalam tabel personel_k3_jagorawi
    const query = `
        INSERT INTO personel_k3_cikampek (nama, role_personel_k3, batas_masa_berlaku) 
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


router.post('/addpersonelbali', (req, res) => {
    const { nama, role_personel_k3, batas_masa_berlaku } = req.body;
    
    // Query untuk memasukkan data ke dalam tabel personel_k3_jagorawi
    const query = `
        INSERT INTO personel_k3_bali (nama, role_personel_k3, batas_masa_berlaku) 
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


router.post('/addpersonelbalsam', (req, res) => {
    const { nama, role_personel_k3, batas_masa_berlaku } = req.body;
    
    // Query untuk memasukkan data ke dalam tabel personel_k3_jagorawi
    const query = `
        INSERT INTO personel_k3_balsam (nama, role_personel_k3, batas_masa_berlaku) 
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




// Menambahkan KEJADIAN baru ke dalam Tabel Jagorawi
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Atur multer untuk menyimpan file di memori

router.post('/addkejadianjagorawi', upload.single('evidence'), async (req, res) => {
    const { kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file.buffer; // Ambil file dari multer (disimpan dalam buffer)

    try {
        await db.query('INSERT INTO kejadian_darurat_jagorawi (kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence) VALUES ($1, $2, $3, $4, $5)', 
        [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence]);

        res.json({ message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data');
    }
});


router.post('/addkejadiancikampek', upload.single('evidence'), async (req, res) => {
    const { kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file.buffer; // Ambil file dari multer (disimpan dalam buffer)

    try {
        await db.query('INSERT INTO kejadian_darurat_cikampek (kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence) VALUES ($1, $2, $3, $4, $5)', 
        [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence]);

        res.json({ message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data');
    }
});


router.post('/addkejadianbali', upload.single('evidence'), async (req, res) => {
    const { kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file.buffer; // Ambil file dari multer (disimpan dalam buffer)

    try {
        await db.query('INSERT INTO kejadian_darurat_bali (kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence) VALUES ($1, $2, $3, $4, $5)', 
        [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence]);

        res.json({ message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data');
    }
});


router.post('/addkejadianbalsam', upload.single('evidence'), async (req, res) => {
    const { kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file.buffer; // Ambil file dari multer (disimpan dalam buffer)

    try {
        await db.query('INSERT INTO kejadian_darurat_balsam (kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence) VALUES ($1, $2, $3, $4, $5)', 
        [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence]);

        res.json({ message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data');
    }
});



const uploadCHECKLIST = multer({ storage: multer.memoryStorage() }); // Menggunakan memori untuk penyimpanan sementara

router.post('/addchecklistjagorawi', uploadCHECKLIST.fields([
    { name: 'expired_date', maxCount: 1 },
    { name: 'check_list_pemeriksaan', maxCount: 1 },
    { name: 'rambu_apar', maxCount: 1 },
    { name: 'kelengkapan_box_hydrant', maxCount: 1 },
    { name: 'ruang_laktasi', maxCount: 1 },
    { name: 'ruang_p3k', maxCount: 1 },
    { name: 'organik', maxCount: 1 },
    { name: 'non_organik', maxCount: 1 },
    { name: 'limbah_b3', maxCount: 1 },
    { name: 'smoking_area', maxCount: 1 },
    { name: 'dll', maxCount: 1 }
]), (req, res) => {
    const section = req.body.section;
    const indikator_k3 = req.body.indikator_k3;

    // Ambil buffer gambar dari request
    const expired_date = req.files['expired_date'] ? req.files['expired_date'][0].buffer : null;
    const check_list_pemeriksaan = req.files['check_list_pemeriksaan'] ? req.files['check_list_pemeriksaan'][0].buffer : null;
    const rambu_apar = req.files['rambu_apar'] ? req.files['rambu_apar'][0].buffer : null;
    const kelengkapan_box_hydrant = req.files['kelengkapan_box_hydrant'] ? req.files['kelengkapan_box_hydrant'][0].buffer : null;
    const ruang_laktasi = req.files['ruang_laktasi'] ? req.files['ruang_laktasi'][0].buffer : null;
    const ruang_p3k = req.files['ruang_p3k'] ? req.files['ruang_p3k'][0].buffer : null;
    const organik = req.files['organik'] ? req.files['organik'][0].buffer : null;
    const non_organik = req.files['non_organik'] ? req.files['non_organik'][0].buffer : null;
    const limbah_b3 = req.files['limbah_b3'] ? req.files['limbah_b3'][0].buffer : null;
    const smoking_area = req.files['smoking_area'] ? req.files['smoking_area'][0].buffer : null;
    const dll = req.files['dll'] ? req.files['dll'][0].buffer : null;

    // Query untuk menyimpan data ke database
    const query = `
        INSERT INTO checklist_k3_jagorawi 
        (section, indikator_k3, expired_date, check_list_pemeriksaan, rambu_apar, 
        kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, non_organik, limbah_b3, 
        smoking_area, dll) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
        section, indikator_k3, expired_date, check_list_pemeriksaan, 
        rambu_apar, kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, 
        non_organik, limbah_b3, smoking_area, dll
    ];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: "Error saving data" });
        }
        res.status(201).json({ message: "Success" });
    });
});


router.post('/addchecklistbali', uploadCHECKLIST.fields([
    { name: 'expired_date', maxCount: 1 },
    { name: 'check_list_pemeriksaan', maxCount: 1 },
    { name: 'rambu_apar', maxCount: 1 },
    { name: 'kelengkapan_box_hydrant', maxCount: 1 },
    { name: 'ruang_laktasi', maxCount: 1 },
    { name: 'ruang_p3k', maxCount: 1 },
    { name: 'organik', maxCount: 1 },
    { name: 'non_organik', maxCount: 1 },
    { name: 'limbah_b3', maxCount: 1 },
    { name: 'smoking_area', maxCount: 1 },
    { name: 'dll', maxCount: 1 }
]), (req, res) => {
    const section = req.body.section;
    const indikator_k3 = req.body.indikator_k3;

    // Ambil buffer gambar dari request
    const expired_date = req.files['expired_date'] ? req.files['expired_date'][0].buffer : null;
    const check_list_pemeriksaan = req.files['check_list_pemeriksaan'] ? req.files['check_list_pemeriksaan'][0].buffer : null;
    const rambu_apar = req.files['rambu_apar'] ? req.files['rambu_apar'][0].buffer : null;
    const kelengkapan_box_hydrant = req.files['kelengkapan_box_hydrant'] ? req.files['kelengkapan_box_hydrant'][0].buffer : null;
    const ruang_laktasi = req.files['ruang_laktasi'] ? req.files['ruang_laktasi'][0].buffer : null;
    const ruang_p3k = req.files['ruang_p3k'] ? req.files['ruang_p3k'][0].buffer : null;
    const organik = req.files['organik'] ? req.files['organik'][0].buffer : null;
    const non_organik = req.files['non_organik'] ? req.files['non_organik'][0].buffer : null;
    const limbah_b3 = req.files['limbah_b3'] ? req.files['limbah_b3'][0].buffer : null;
    const smoking_area = req.files['smoking_area'] ? req.files['smoking_area'][0].buffer : null;
    const dll = req.files['dll'] ? req.files['dll'][0].buffer : null;

    // Query untuk menyimpan data ke database
    const query = `
        INSERT INTO checklist_k3_bali
        (section, indikator_k3, expired_date, check_list_pemeriksaan, rambu_apar, 
        kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, non_organik, limbah_b3, 
        smoking_area, dll) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
        section, indikator_k3, expired_date, check_list_pemeriksaan, 
        rambu_apar, kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, 
        non_organik, limbah_b3, smoking_area, dll
    ];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: "Error saving data" });
        }
        res.status(201).json({ message: "Success" });
    });
});


router.post('/addchecklistbalsam', uploadCHECKLIST.fields([
    { name: 'expired_date', maxCount: 1 },
    { name: 'check_list_pemeriksaan', maxCount: 1 },
    { name: 'rambu_apar', maxCount: 1 },
    { name: 'kelengkapan_box_hydrant', maxCount: 1 },
    { name: 'ruang_laktasi', maxCount: 1 },
    { name: 'ruang_p3k', maxCount: 1 },
    { name: 'organik', maxCount: 1 },
    { name: 'non_organik', maxCount: 1 },
    { name: 'limbah_b3', maxCount: 1 },
    { name: 'smoking_area', maxCount: 1 },
    { name: 'dll', maxCount: 1 }
]), (req, res) => {
    const section = req.body.section;
    const indikator_k3 = req.body.indikator_k3;

    // Ambil buffer gambar dari request
    const expired_date = req.files['expired_date'] ? req.files['expired_date'][0].buffer : null;
    const check_list_pemeriksaan = req.files['check_list_pemeriksaan'] ? req.files['check_list_pemeriksaan'][0].buffer : null;
    const rambu_apar = req.files['rambu_apar'] ? req.files['rambu_apar'][0].buffer : null;
    const kelengkapan_box_hydrant = req.files['kelengkapan_box_hydrant'] ? req.files['kelengkapan_box_hydrant'][0].buffer : null;
    const ruang_laktasi = req.files['ruang_laktasi'] ? req.files['ruang_laktasi'][0].buffer : null;
    const ruang_p3k = req.files['ruang_p3k'] ? req.files['ruang_p3k'][0].buffer : null;
    const organik = req.files['organik'] ? req.files['organik'][0].buffer : null;
    const non_organik = req.files['non_organik'] ? req.files['non_organik'][0].buffer : null;
    const limbah_b3 = req.files['limbah_b3'] ? req.files['limbah_b3'][0].buffer : null;
    const smoking_area = req.files['smoking_area'] ? req.files['smoking_area'][0].buffer : null;
    const dll = req.files['dll'] ? req.files['dll'][0].buffer : null;

    // Query untuk menyimpan data ke database
    const query = `
        INSERT INTO checklist_k3_balsam
        (section, indikator_k3, expired_date, check_list_pemeriksaan, rambu_apar, 
        kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, non_organik, limbah_b3, 
        smoking_area, dll) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
        section, indikator_k3, expired_date, check_list_pemeriksaan, 
        rambu_apar, kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, 
        non_organik, limbah_b3, smoking_area, dll
    ];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: "Error saving data" });
        }
        res.status(201).json({ message: "Success" });
    });
});




const uploadCHECKLIST1 = multer({ storage: multer.memoryStorage() }); // Menggunakan memori untuk penyimpanan sementara

app.post('/addchecklistcikampek', uploadCHECKLIST1.fields([
    { name: 'expired_date', maxCount: 1 },
    { name: 'check_list_pemeriksaan', maxCount: 1 },
    { name: 'rambu_apar', maxCount: 1 },
    { name: 'kelengkapan_box_hydrant', maxCount: 1 },
    { name: 'ruang_laktasi', maxCount: 1 },
    { name: 'ruang_p3k', maxCount: 1 },
    { name: 'organik', maxCount: 1 },
    { name: 'non_organik', maxCount: 1 },
    { name: 'limbah_b3', maxCount: 1 },
    { name: 'smoking_area', maxCount: 1 },
    { name: 'dll', maxCount: 1 }
]), (req, res) => {
    const section = req.body.section;
    const indikator_k3 = req.body.indikator_k3;

    // Ambil buffer gambar dari request
    const expired_date = req.files['expired_date'] ? req.files['expired_date'][0].buffer : null;
    const check_list_pemeriksaan = req.files['check_list_pemeriksaan'] ? req.files['check_list_pemeriksaan'][0].buffer : null;
    const rambu_apar = req.files['rambu_apar'] ? req.files['rambu_apar'][0].buffer : null;
    const kelengkapan_box_hydrant = req.files['kelengkapan_box_hydrant'] ? req.files['kelengkapan_box_hydrant'][0].buffer : null;
    const ruang_laktasi = req.files['ruang_laktasi'] ? req.files['ruang_laktasi'][0].buffer : null;
    const ruang_p3k = req.files['ruang_p3k'] ? req.files['ruang_p3k'][0].buffer : null;
    const organik = req.files['organik'] ? req.files['organik'][0].buffer : null;
    const non_organik = req.files['non_organik'] ? req.files['non_organik'][0].buffer : null;
    const limbah_b3 = req.files['limbah_b3'] ? req.files['limbah_b3'][0].buffer : null;
    const smoking_area = req.files['smoking_area'] ? req.files['smoking_area'][0].buffer : null;
    const dll = req.files['dll'] ? req.files['dll'][0].buffer : null;

    // Query untuk menyimpan data ke database
    const query = `
        INSERT INTO checklist_k3_cikampek 
        (section, indikator_k3, expired_date, check_list_pemeriksaan, rambu_apar, 
        kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, non_organik, limbah_b3, 
        smoking_area, dll) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
        section, indikator_k3, expired_date, check_list_pemeriksaan, 
        rambu_apar, kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, organik, 
        non_organik, limbah_b3, smoking_area, dll
    ];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: "Error saving data" });
        }
        res.status(201).json({ message: "Success" });
    });
});


const updateCHECKLIST = multer({ storage: multer.memoryStorage() });

router.put('/updatechecklistcikampek', updateCHECKLIST.fields([
    { name: 'expired_date', maxCount: 1 },
    { name: 'check_list_pemeriksaan', maxCount: 1 },
    { name: 'rambu_apar', maxCount: 1 },
    { name: 'kelengkapan_box_hydrant', maxCount: 1 },
    { name: 'ruang_laktasi', maxCount: 1 },
    { name: 'ruang_p3k', maxCount: 1 },
    { name: 'organik', maxCount: 1 },
    { name: 'non_organik', maxCount: 1 },
    { name: 'limbah_b3', maxCount: 1 },
    { name: 'smoking_area', maxCount: 1 },
    { name: 'dll', maxCount: 1 }
]), (req, res) => {
    const { checklist_id, section, indikator_k3} = req.body;

    // Ambil buffer gambar dari request
    const expired_date = req.files['expired_date'] ? req.files['expired_date'][0].buffer : null;
    const check_list_pemeriksaan = req.files['check_list_pemeriksaan'] ? req.files['check_list_pemeriksaan'][0].buffer : null;
    const rambu_apar = req.files['rambu_apar'] ? req.files['rambu_apar'][0].buffer : null;
    const kelengkapan_box_hydrant = req.files['kelengkapan_box_hydrant'] ? req.files['kelengkapan_box_hydrant'][0].buffer : null;
    const ruang_laktasi = req.files['ruang_laktasi'] ? req.files['ruang_laktasi'][0].buffer : null;
    const ruang_p3k = req.files['ruang_p3k'] ? req.files['ruang_p3k'][0].buffer : null;
    const organik = req.files['organik'] ? req.files['organik'][0].buffer : null;
    const non_organik = req.files['non_organik'] ? req.files['non_organik'][0].buffer : null;
    const limbah_b3 = req.files['limbah_b3'] ? req.files['limbah_b3'][0].buffer : null;
    const smoking_area = req.files['smoking_area'] ? req.files['smoking_area'][0].buffer : null;
    const dll = req.files['dll'] ? req.files['dll'][0].buffer : null;

    // Query untuk update data ke database
    const query = `
        UPDATE checklist_k3_cikampek SET
        section = $1,
        indikator_k3 = $2,
        expired_date = $3,
        check_list_pemeriksaan = $4,
        rambu_apar = $5,
        kelengkapan_box_hydrant = $6,
        ruang_laktasi = $7,
        ruang_p3k = $8,
        organik = $9,
        non_organik = $10,
        limbah_b3 = $11,
        smoking_area = $12,
        dll = $13
        WHERE checklist_id = $14
    `;
    const values = [
        section, indikator_k3, expired_date, check_list_pemeriksaan, 
        rambu_apar, kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, 
        organik, non_organik, limbah_b3, smoking_area, dll, checklist_id
    ];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).json({ message: "Error updating data" });
        }
        res.status(200).json({ message: "Update success" });
    });
});


router.put('/updatechecklistbalsam', updateCHECKLIST.fields([
    { name: 'expired_date', maxCount: 1 },
    { name: 'check_list_pemeriksaan', maxCount: 1 },
    { name: 'rambu_apar', maxCount: 1 },
    { name: 'kelengkapan_box_hydrant', maxCount: 1 },
    { name: 'ruang_laktasi', maxCount: 1 },
    { name: 'ruang_p3k', maxCount: 1 },
    { name: 'organik', maxCount: 1 },
    { name: 'non_organik', maxCount: 1 },
    { name: 'limbah_b3', maxCount: 1 },
    { name: 'smoking_area', maxCount: 1 },
    { name: 'dll', maxCount: 1 }
]), (req, res) => {
    const { checklist_id, section, indikator_k3} = req.body;

    // Ambil buffer gambar dari request
    const expired_date = req.files['expired_date'] ? req.files['expired_date'][0].buffer : null;
    const check_list_pemeriksaan = req.files['check_list_pemeriksaan'] ? req.files['check_list_pemeriksaan'][0].buffer : null;
    const rambu_apar = req.files['rambu_apar'] ? req.files['rambu_apar'][0].buffer : null;
    const kelengkapan_box_hydrant = req.files['kelengkapan_box_hydrant'] ? req.files['kelengkapan_box_hydrant'][0].buffer : null;
    const ruang_laktasi = req.files['ruang_laktasi'] ? req.files['ruang_laktasi'][0].buffer : null;
    const ruang_p3k = req.files['ruang_p3k'] ? req.files['ruang_p3k'][0].buffer : null;
    const organik = req.files['organik'] ? req.files['organik'][0].buffer : null;
    const non_organik = req.files['non_organik'] ? req.files['non_organik'][0].buffer : null;
    const limbah_b3 = req.files['limbah_b3'] ? req.files['limbah_b3'][0].buffer : null;
    const smoking_area = req.files['smoking_area'] ? req.files['smoking_area'][0].buffer : null;
    const dll = req.files['dll'] ? req.files['dll'][0].buffer : null;

    // Query untuk update data ke database
    const query = `
        UPDATE checklist_k3_balsam SET
        section = $1,
        indikator_k3 = $2,
        expired_date = $3,
        check_list_pemeriksaan = $4,
        rambu_apar = $5,
        kelengkapan_box_hydrant = $6,
        ruang_laktasi = $7,
        ruang_p3k = $8,
        organik = $9,
        non_organik = $10,
        limbah_b3 = $11,
        smoking_area = $12,
        dll = $13
        WHERE checklist_id = $14
    `;
    const values = [
        section, indikator_k3, expired_date, check_list_pemeriksaan, 
        rambu_apar, kelengkapan_box_hydrant, ruang_laktasi, ruang_p3k, 
        organik, non_organik, limbah_b3, smoking_area, dll, checklist_id
    ];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).json({ message: "Error updating data" });
        }
        res.status(200).json({ message: "Update success" });
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


router.put('/updatepersonelcikampek', (req, res) => {
    const { personel_k3_id, nama, role_personel_k3, batas_masa_berlaku } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE personel_k3_cikampek 
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


router.put('/updatepersonelbali', (req, res) => {
    const { personel_k3_id, nama, role_personel_k3, batas_masa_berlaku } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE personel_k3_bali
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


router.put('/updatepersonelbalsam', (req, res) => {
    const { personel_k3_id, nama, role_personel_k3, batas_masa_berlaku } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE personel_k3_balsam
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



const uploadUPDATE = multer({ storage: multer.memoryStorage() }); // Menggunakan memori untuk menyimpan file sementara

router.put('/updatekejadianjagorawi', uploadUPDATE.single('evidence'), async (req, res) => {
    const { kejadian_darurat_id, kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file ? req.file.buffer : null; // Ambil file jika ada

    try {
        // Query untuk mengupdate data di database, periksa apakah evidence ada atau tidak
        if (evidence) {
            await db.query('UPDATE kejadian_darurat_jagorawi SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4, evidence = $5 WHERE kejadian_darurat_id = $6', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence, kejadian_darurat_id]);
        } else {
            await db.query('UPDATE kejadian_darurat_jagorawi SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4 WHERE kejadian_darurat_id = $5', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, kejadian_darurat_id]);
        }

        res.json({ message: "Update Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating data');
    }
});


router.put('/updatekejadiancikampek', uploadUPDATE.single('evidence'), async (req, res) => {
    const { kejadian_darurat_id, kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file ? req.file.buffer : null; // Ambil file jika ada

    try {
        // Query untuk mengupdate data di database, periksa apakah evidence ada atau tidak
        if (evidence) {
            await db.query('UPDATE kejadian_darurat_cikampek SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4, evidence = $5 WHERE kejadian_darurat_id = $6', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence, kejadian_darurat_id]);
        } else {
            await db.query('UPDATE kejadian_darurat_cikampek SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4 WHERE kejadian_darurat_id = $5', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, kejadian_darurat_id]);
        }

        res.json({ message: "Update Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating data');
    }
});


router.put('/updatekejadianbali', uploadUPDATE.single('evidence'), async (req, res) => {
    const { kejadian_darurat_id, kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file ? req.file.buffer : null; // Ambil file jika ada

    try {
        // Query untuk mengupdate data di database, periksa apakah evidence ada atau tidak
        if (evidence) {
            await db.query('UPDATE kejadian_darurat_bali SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4, evidence = $5 WHERE kejadian_darurat_id = $6', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence, kejadian_darurat_id]);
        } else {
            await db.query('UPDATE kejadian_darurat_bali SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4 WHERE kejadian_darurat_id = $5', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, kejadian_darurat_id]);
        }

        res.json({ message: "Update Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating data');
    }
});


router.put('/updatekejadianbalsam', uploadUPDATE.single('evidence'), async (req, res) => {
    const { kejadian_darurat_id, kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut } = req.body;
    const evidence = req.file ? req.file.buffer : null; // Ambil file jika ada

    try {
        // Query untuk mengupdate data di database, periksa apakah evidence ada atau tidak
        if (evidence) {
            await db.query('UPDATE kejadian_darurat_balsam SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4, evidence = $5 WHERE kejadian_darurat_id = $6', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence, kejadian_darurat_id]);
        } else {
            await db.query('UPDATE kejadian_darurat_balsam SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4 WHERE kejadian_darurat_id = $5', 
            [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, kejadian_darurat_id]);
        }

        res.json({ message: "Update Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating data');
    }
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


router.put('/updatekecelakaancikampek', (req, res) => {
    const { kecelakaan_kerja_id, Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE kecelakaan_kerja_cikampek 
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


router.put('/updatekecelakaanbali', (req, res) => {
    const { kecelakaan_kerja_id, Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE kecelakaan_kerja_bali
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


router.put('/updatekecelakaanbalsam', (req, res) => {
    const { kecelakaan_kerja_id, Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE kecelakaan_kerja_balsam
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
        tahun,
        bulan,
        jumlah_karyawan_ops,
        jumlah_karyawan_non_ops,
        jumlah_hari_kerja_ops,
        jumlah_hari_kerja_non_ops,
        
        kecelakaan_berat_ops,
        kecelakaan_berat_non_ops,
        kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops,
        kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops,
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops
        
    } = req.body;

    // Calculate some datas dynamically
    const jumlah_jam_kerja = (
        (jumlah_hari_kerja_ops + jumlah_hari_kerja_non_ops) / 2 * 8
    )

    const jumlah_hari_tanpa_hilang_ops = (
        (jumlah_karyawan_ops * jumlah_hari_kerja_ops)
    )

    const jumlah_hari_tanpa_hilang_non_ops = (
        (jumlah_karyawan_non_ops * jumlah_hari_kerja_non_ops)
    )

    const lti_ops = (
        (jumlah_hari_hilang_ops * 8)
    )

    const lti_non_ops = (
        (jumlah_hari_hilang_non_ops * 8)
    )

    const man_hour_ops = (
        (jumlah_karyawan_ops * 8) * jumlah_hari_kerja_ops
    )

    const man_hour_non_ops = (
        (jumlah_karyawan_non_ops * 8) * jumlah_hari_kerja_non_ops
    )

    const fr = (
        (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
        kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
        kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) * 1000000
    ) / (man_hour_ops + man_hour_non_ops);

    const sr = (
        (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) * 1000000 / (man_hour_ops + man_hour_non_ops)
    )

    const ir = (
        ((kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) / (jumlah_karyawan_ops + jumlah_karyawan_non_ops)) * 10000
    )

    const atlr = (
         (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) / (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property)
    )

    const query = `
        UPDATE rekap_data_k3_jagorawi SET
            jumlah_karyawan_ops = $1, jumlah_karyawan_non_ops = $2, jumlah_hari_kerja_ops = $3, jumlah_hari_kerja_non_ops = $4,
            jumlah_jam_kerja = $5, kecelakaan_berat_ops = $6, kecelakaan_berat_non_ops = $7, kecelakaan_ringan_ops = $8, kecelakaan_ringan_non_ops = $9,
            kecelakaan_meninggal_ops = $10, kecelakaan_meninggal_non_ops = $11, kecelakaan_near_miss_ops = $12, kecelakaan_near_miss_non_ops = $13,
            fire_accident = $14, damaged_property = $15, jumlah_hari_hilang_ops = $16, jumlah_hari_hilang_non_ops = $17, jumlah_hari_tanpa_hilang_ops = $18,
            jumlah_hari_tanpa_hilang_non_ops = $19, lti_ops = $20, lti_non_ops = $21, man_hour_ops = $22, man_hour_non_ops = $23, fr = $24, sr = $25, ir = $26,
            atlr = $27
        WHERE tahun = $28 AND bulan = $29
    `;

    db.query(query, [
        jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr, tahun, bulan
    ])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


router.put('/updaterekapdatacikampek', (req, res) => {
    const {
        tahun,
        bulan,
        jumlah_karyawan_ops,
        jumlah_karyawan_non_ops,
        jumlah_hari_kerja_ops,
        jumlah_hari_kerja_non_ops,
        
        kecelakaan_berat_ops,
        kecelakaan_berat_non_ops,
        kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops,
        kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops,
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops
        
    } = req.body;

    // Calculate some datas dynamically
    const jumlah_jam_kerja = (
        (jumlah_hari_kerja_ops + jumlah_hari_kerja_non_ops) / 2 * 8
    )

    const jumlah_hari_tanpa_hilang_ops = (
        (jumlah_karyawan_ops * jumlah_hari_kerja_ops)
    )

    const jumlah_hari_tanpa_hilang_non_ops = (
        (jumlah_karyawan_non_ops * jumlah_hari_kerja_non_ops)
    )

    const lti_ops = (
        (jumlah_hari_hilang_ops * 8)
    )

    const lti_non_ops = (
        (jumlah_hari_hilang_non_ops * 8)
    )

    const man_hour_ops = (
        (jumlah_karyawan_ops * 8) * jumlah_hari_kerja_ops
    )

    const man_hour_non_ops = (
        (jumlah_karyawan_non_ops * 8) * jumlah_hari_kerja_non_ops
    )

    const fr = (
        (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
        kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
        kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) * 1000000
    ) / (man_hour_ops + man_hour_non_ops);

    const sr = (
        (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) * 1000000 / (man_hour_ops + man_hour_non_ops)
    )

    const ir = (
        ((kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) / (jumlah_karyawan_ops + jumlah_karyawan_non_ops)) * 10000
    )

    const atlr = (
         (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) / (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property)
    )

    const query = `
        UPDATE rekap_data_k3_cikampek SET
            jumlah_karyawan_ops = $1, jumlah_karyawan_non_ops = $2, jumlah_hari_kerja_ops = $3, jumlah_hari_kerja_non_ops = $4,
            jumlah_jam_kerja = $5, kecelakaan_berat_ops = $6, kecelakaan_berat_non_ops = $7, kecelakaan_ringan_ops = $8, kecelakaan_ringan_non_ops = $9,
            kecelakaan_meninggal_ops = $10, kecelakaan_meninggal_non_ops = $11, kecelakaan_near_miss_ops = $12, kecelakaan_near_miss_non_ops = $13,
            fire_accident = $14, damaged_property = $15, jumlah_hari_hilang_ops = $16, jumlah_hari_hilang_non_ops = $17, jumlah_hari_tanpa_hilang_ops = $18,
            jumlah_hari_tanpa_hilang_non_ops = $19, lti_ops = $20, lti_non_ops = $21, man_hour_ops = $22, man_hour_non_ops = $23, fr = $24, sr = $25, ir = $26,
            atlr = $27
        WHERE tahun = $28 AND bulan = $29
    `;

    db.query(query, [
        jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr, tahun, bulan
    ])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


router.put('/updaterekapdatabali', (req, res) => {
    const {
        tahun,
        bulan,
        jumlah_karyawan_ops,
        jumlah_karyawan_non_ops,
        jumlah_hari_kerja_ops,
        jumlah_hari_kerja_non_ops,
        
        kecelakaan_berat_ops,
        kecelakaan_berat_non_ops,
        kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops,
        kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops,
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops
        
    } = req.body;

    // Calculate some datas dynamically
    const jumlah_jam_kerja = (
        (jumlah_hari_kerja_ops + jumlah_hari_kerja_non_ops) / 2 * 8
    )

    const jumlah_hari_tanpa_hilang_ops = (
        (jumlah_karyawan_ops * jumlah_hari_kerja_ops)
    )

    const jumlah_hari_tanpa_hilang_non_ops = (
        (jumlah_karyawan_non_ops * jumlah_hari_kerja_non_ops)
    )

    const lti_ops = (
        (jumlah_hari_hilang_ops * 8)
    )

    const lti_non_ops = (
        (jumlah_hari_hilang_non_ops * 8)
    )

    const man_hour_ops = (
        (jumlah_karyawan_ops * 8) * jumlah_hari_kerja_ops
    )

    const man_hour_non_ops = (
        (jumlah_karyawan_non_ops * 8) * jumlah_hari_kerja_non_ops
    )

    const fr = (
        (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
        kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
        kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) * 1000000
    ) / (man_hour_ops + man_hour_non_ops);

    const sr = (
        (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) * 1000000 / (man_hour_ops + man_hour_non_ops)
    )

    const ir = (
        ((kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) / (jumlah_karyawan_ops + jumlah_karyawan_non_ops)) * 10000
    )

    const atlr = (
         (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) / (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property)
    )

    const query = `
        UPDATE rekap_data_k3_bali SET
            jumlah_karyawan_ops = $1, jumlah_karyawan_non_ops = $2, jumlah_hari_kerja_ops = $3, jumlah_hari_kerja_non_ops = $4,
            jumlah_jam_kerja = $5, kecelakaan_berat_ops = $6, kecelakaan_berat_non_ops = $7, kecelakaan_ringan_ops = $8, kecelakaan_ringan_non_ops = $9,
            kecelakaan_meninggal_ops = $10, kecelakaan_meninggal_non_ops = $11, kecelakaan_near_miss_ops = $12, kecelakaan_near_miss_non_ops = $13,
            fire_accident = $14, damaged_property = $15, jumlah_hari_hilang_ops = $16, jumlah_hari_hilang_non_ops = $17, jumlah_hari_tanpa_hilang_ops = $18,
            jumlah_hari_tanpa_hilang_non_ops = $19, lti_ops = $20, lti_non_ops = $21, man_hour_ops = $22, man_hour_non_ops = $23, fr = $24, sr = $25, ir = $26,
            atlr = $27
        WHERE tahun = $28 AND bulan = $29
    `;

    db.query(query, [
        jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr, tahun, bulan
    ])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


router.put('/updaterekapdatabalsam', (req, res) => {
    const {
        tahun,
        bulan,
        jumlah_karyawan_ops,
        jumlah_karyawan_non_ops,
        jumlah_hari_kerja_ops,
        jumlah_hari_kerja_non_ops,
        
        kecelakaan_berat_ops,
        kecelakaan_berat_non_ops,
        kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops,
        kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops,
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops
        
    } = req.body;

    // Calculate some datas dynamically
    const jumlah_jam_kerja = (
        (jumlah_hari_kerja_ops + jumlah_hari_kerja_non_ops) / 2 * 8
    )

    const jumlah_hari_tanpa_hilang_ops = (
        (jumlah_karyawan_ops * jumlah_hari_kerja_ops)
    )

    const jumlah_hari_tanpa_hilang_non_ops = (
        (jumlah_karyawan_non_ops * jumlah_hari_kerja_non_ops)
    )

    const lti_ops = (
        (jumlah_hari_hilang_ops * 8)
    )

    const lti_non_ops = (
        (jumlah_hari_hilang_non_ops * 8)
    )

    const man_hour_ops = (
        (jumlah_karyawan_ops * 8) * jumlah_hari_kerja_ops
    )

    const man_hour_non_ops = (
        (jumlah_karyawan_non_ops * 8) * jumlah_hari_kerja_non_ops
    )

    const fr = (
        (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
        kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
        kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) * 1000000
    ) / (man_hour_ops + man_hour_non_ops);

    const sr = (
        (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) * 1000000 / (man_hour_ops + man_hour_non_ops)
    )

    const ir = (
        ((kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) / (jumlah_karyawan_ops + jumlah_karyawan_non_ops)) * 10000
    )

    const atlr = (
         (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) / (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property)
    )

    const query = `
        UPDATE rekap_data_k3_balsam SET
            jumlah_karyawan_ops = $1, jumlah_karyawan_non_ops = $2, jumlah_hari_kerja_ops = $3, jumlah_hari_kerja_non_ops = $4,
            jumlah_jam_kerja = $5, kecelakaan_berat_ops = $6, kecelakaan_berat_non_ops = $7, kecelakaan_ringan_ops = $8, kecelakaan_ringan_non_ops = $9,
            kecelakaan_meninggal_ops = $10, kecelakaan_meninggal_non_ops = $11, kecelakaan_near_miss_ops = $12, kecelakaan_near_miss_non_ops = $13,
            fire_accident = $14, damaged_property = $15, jumlah_hari_hilang_ops = $16, jumlah_hari_hilang_non_ops = $17, jumlah_hari_tanpa_hilang_ops = $18,
            jumlah_hari_tanpa_hilang_non_ops = $19, lti_ops = $20, lti_non_ops = $21, man_hour_ops = $22, man_hour_non_ops = $23, fr = $24, sr = $25, ir = $26,
            atlr = $27
        WHERE tahun = $28 AND bulan = $29
    `;

    db.query(query, [
        jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr, tahun, bulan
    ])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


// PUT route to update the organizational structure
router.put('/updatestrukturjagorawi', (req, res) => {
    const { ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5 } = req.body;

    // SQL query to update the structure
    const query = `
        UPDATE struktur_organisasi_jagorawi
        SET nama = CASE 
            WHEN jabatan = 'Ketua' THEN $1
            WHEN jabatan = 'Sekretaris' THEN $2
            WHEN jabatan = 'Anggota 1' THEN $3
            WHEN jabatan = 'Anggota 2' THEN $4
            WHEN jabatan = 'Anggota 3' THEN $5
            WHEN jabatan = 'Anggota 4' THEN $6
            WHEN jabatan = 'Anggota 5' THEN $7
        END
        WHERE jabatan IN ('Ketua', 'Sekretaris', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5')
    `;

    // Execute the query with the provided data
    db.query(query, [ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating organizational structure:', error);
            res.status(500).json({ message: 'Error updating organizational structure' });
        });
});


router.put('/updatestrukturcikampek', (req, res) => {
    const { ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5 } = req.body;

    // SQL query to update the structure
    const query = `
        UPDATE struktur_organisasi_cikampek
        SET nama = CASE 
            WHEN jabatan = 'Ketua' THEN $1
            WHEN jabatan = 'Sekretaris' THEN $2
            WHEN jabatan = 'Anggota 1' THEN $3
            WHEN jabatan = 'Anggota 2' THEN $4
            WHEN jabatan = 'Anggota 3' THEN $5
            WHEN jabatan = 'Anggota 4' THEN $6
            WHEN jabatan = 'Anggota 5' THEN $7
        END
        WHERE jabatan IN ('Ketua', 'Sekretaris', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5')
    `;

    // Execute the query with the provided data
    db.query(query, [ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating organizational structure:', error);
            res.status(500).json({ message: 'Error updating organizational structure' });
        });
});


router.put('/updatestrukturbelmera', (req, res) => {
    const { ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5 } = req.body;

    // SQL query to update the structure
    const query = `
        UPDATE struktur_organisasi_belmera
        SET nama = CASE 
            WHEN jabatan = 'Ketua' THEN $1
            WHEN jabatan = 'Sekretaris' THEN $2
            WHEN jabatan = 'Anggota 1' THEN $3
            WHEN jabatan = 'Anggota 2' THEN $4
            WHEN jabatan = 'Anggota 3' THEN $5
            WHEN jabatan = 'Anggota 4' THEN $6
            WHEN jabatan = 'Anggota 5' THEN $7
        END
        WHERE jabatan IN ('Ketua', 'Sekretaris', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5')
    `;

    // Execute the query with the provided data
    db.query(query, [ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating organizational structure:', error);
            res.status(500).json({ message: 'Error updating organizational structure' });
        });
});


router.put('/updatestrukturbali', (req, res) => {
    const { ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5 } = req.body;

    // SQL query to update the structure
    const query = `
        UPDATE struktur_organisasi_bali
        SET nama = CASE 
            WHEN jabatan = 'Ketua' THEN $1
            WHEN jabatan = 'Sekretaris' THEN $2
            WHEN jabatan = 'Anggota 1' THEN $3
            WHEN jabatan = 'Anggota 2' THEN $4
            WHEN jabatan = 'Anggota 3' THEN $5
            WHEN jabatan = 'Anggota 4' THEN $6
            WHEN jabatan = 'Anggota 5' THEN $7
        END
        WHERE jabatan IN ('Ketua', 'Sekretaris', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5')
    `;

    // Execute the query with the provided data
    db.query(query, [ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating organizational structure:', error);
            res.status(500).json({ message: 'Error updating organizational structure' });
        });
});



router.put('/nullifydatajagorawi', (req, res) => {
    const { tahun, bulan } = req.body;

    const query = `
        UPDATE rekap_data_k3_jagorawi SET
            jumlah_karyawan_ops = NULL, jumlah_karyawan_non_ops = NULL, jumlah_hari_kerja_ops = NULL, jumlah_hari_kerja_non_ops = NULL,
            jumlah_jam_kerja = NULL, kecelakaan_berat_ops = NULL, kecelakaan_berat_non_ops = NULL, kecelakaan_ringan_ops = NULL, kecelakaan_ringan_non_ops = NULL,
            kecelakaan_meninggal_ops = NULL, kecelakaan_meninggal_non_ops = NULL, kecelakaan_near_miss_ops = NULL, kecelakaan_near_miss_non_ops = NULL,
            fire_accident = NULL, damaged_property = NULL, jumlah_hari_hilang_ops = NULL, jumlah_hari_hilang_non_ops = NULL, jumlah_hari_tanpa_hilang_ops = NULL,
            jumlah_hari_tanpa_hilang_non_ops = NULL, lti_ops = NULL, lti_non_ops = NULL, man_hour_ops = NULL, man_hour_non_ops = NULL, fr = NULL, sr = NULL, ir = NULL,
            atlr = NULL
        WHERE tahun = $1 AND bulan = $2
    `;

    db.query(query, [tahun, bulan], (error, result) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).send('Gagal mengubah data menjadi NULL');
        }

        res.send(`Data berhasil diubah menjadi NULL untuk tahun ${tahun} dan bulan ${bulan}`);
    });
});


router.put('/nullifydatacikampek', (req, res) => {
    const { tahun, bulan } = req.body;

    const query = `
        UPDATE rekap_data_k3_cikampek SET
            jumlah_karyawan_ops = NULL, jumlah_karyawan_non_ops = NULL, jumlah_hari_kerja_ops = NULL, jumlah_hari_kerja_non_ops = NULL,
            jumlah_jam_kerja = NULL, kecelakaan_berat_ops = NULL, kecelakaan_berat_non_ops = NULL, kecelakaan_ringan_ops = NULL, kecelakaan_ringan_non_ops = NULL,
            kecelakaan_meninggal_ops = NULL, kecelakaan_meninggal_non_ops = NULL, kecelakaan_near_miss_ops = NULL, kecelakaan_near_miss_non_ops = NULL,
            fire_accident = NULL, damaged_property = NULL, jumlah_hari_hilang_ops = NULL, jumlah_hari_hilang_non_ops = NULL, jumlah_hari_tanpa_hilang_ops = NULL,
            jumlah_hari_tanpa_hilang_non_ops = NULL, lti_ops = NULL, lti_non_ops = NULL, man_hour_ops = NULL, man_hour_non_ops = NULL, fr = NULL, sr = NULL, ir = NULL,
            atlr = NULL
        WHERE tahun = $1 AND bulan = $2
    `;

    db.query(query, [tahun, bulan], (error, result) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).send('Gagal mengubah data menjadi NULL');
        }

        res.send(`Data berhasil diubah menjadi NULL untuk tahun ${tahun} dan bulan ${bulan}`);
    });
});


router.put('/nullifydatabali', (req, res) => {
    const { tahun, bulan } = req.body;

    const query = `
        UPDATE rekap_data_k3_bali SET
            jumlah_karyawan_ops = NULL, jumlah_karyawan_non_ops = NULL, jumlah_hari_kerja_ops = NULL, jumlah_hari_kerja_non_ops = NULL,
            jumlah_jam_kerja = NULL, kecelakaan_berat_ops = NULL, kecelakaan_berat_non_ops = NULL, kecelakaan_ringan_ops = NULL, kecelakaan_ringan_non_ops = NULL,
            kecelakaan_meninggal_ops = NULL, kecelakaan_meninggal_non_ops = NULL, kecelakaan_near_miss_ops = NULL, kecelakaan_near_miss_non_ops = NULL,
            fire_accident = NULL, damaged_property = NULL, jumlah_hari_hilang_ops = NULL, jumlah_hari_hilang_non_ops = NULL, jumlah_hari_tanpa_hilang_ops = NULL,
            jumlah_hari_tanpa_hilang_non_ops = NULL, lti_ops = NULL, lti_non_ops = NULL, man_hour_ops = NULL, man_hour_non_ops = NULL, fr = NULL, sr = NULL, ir = NULL,
            atlr = NULL
        WHERE tahun = $1 AND bulan = $2
    `;

    db.query(query, [tahun, bulan], (error, result) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).send('Gagal mengubah data menjadi NULL');
        }

        res.send(`Data berhasil diubah menjadi NULL untuk tahun ${tahun} dan bulan ${bulan}`);
    });
});


router.put('/nullifydatabalsam', (req, res) => {
    const { tahun, bulan } = req.body;

    const query = `
        UPDATE rekap_data_k3_balsam SET
            jumlah_karyawan_ops = NULL, jumlah_karyawan_non_ops = NULL, jumlah_hari_kerja_ops = NULL, jumlah_hari_kerja_non_ops = NULL,
            jumlah_jam_kerja = NULL, kecelakaan_berat_ops = NULL, kecelakaan_berat_non_ops = NULL, kecelakaan_ringan_ops = NULL, kecelakaan_ringan_non_ops = NULL,
            kecelakaan_meninggal_ops = NULL, kecelakaan_meninggal_non_ops = NULL, kecelakaan_near_miss_ops = NULL, kecelakaan_near_miss_non_ops = NULL,
            fire_accident = NULL, damaged_property = NULL, jumlah_hari_hilang_ops = NULL, jumlah_hari_hilang_non_ops = NULL, jumlah_hari_tanpa_hilang_ops = NULL,
            jumlah_hari_tanpa_hilang_non_ops = NULL, lti_ops = NULL, lti_non_ops = NULL, man_hour_ops = NULL, man_hour_non_ops = NULL, fr = NULL, sr = NULL, ir = NULL,
            atlr = NULL
        WHERE tahun = $1 AND bulan = $2
    `;

    db.query(query, [tahun, bulan], (error, result) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).send('Gagal mengubah data menjadi NULL');
        }

        res.send(`Data berhasil diubah menjadi NULL untuk tahun ${tahun} dan bulan ${bulan}`);
    });
});


router.delete('/deletepersoneljagorawi', (req, res) => {
    //const no = req.params.id;

    const {personel_k3_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM personel_k3_jagorawi WHERE personel_k3_id = $1`;
    
    db.query(query, [personel_k3_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletepersonelcikampek', (req, res) => {
    //const no = req.params.id;

    const {personel_k3_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM personel_k3_cikampek WHERE personel_k3_id = $1`;
    
    db.query(query, [personel_k3_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletepersonelbali', (req, res) => {
    //const no = req.params.id;

    const {personel_k3_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM personel_k3_bali WHERE personel_k3_id = $1`;
    
    db.query(query, [personel_k3_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletepersonelbalsam', (req, res) => {
    //const no = req.params.id;

    const {personel_k3_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM personel_k3_balsam WHERE personel_k3_id = $1`;
    
    db.query(query, [personel_k3_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekecelakaanjagorawi', (req, res) => {

    const {kecelakaan_kerja_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kecelakaan_kerja_jagorawi WHERE kecelakaan_kerja_id = $1`;
    
    db.query(query, [kecelakaan_kerja_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekecelakaancikampek', (req, res) => {

    const {kecelakaan_kerja_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kecelakaan_kerja_cikampek WHERE kecelakaan_kerja_id = $1`;
    
    db.query(query, [kecelakaan_kerja_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekecelakaanbali', (req, res) => {

    const {kecelakaan_kerja_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kecelakaan_kerja_bali WHERE kecelakaan_kerja_id = $1`;
    
    db.query(query, [kecelakaan_kerja_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekecelakaanbalsam', (req, res) => {

    const {kecelakaan_kerja_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kecelakaan_kerja_balsam WHERE kecelakaan_kerja_id = $1`;
    
    db.query(query, [kecelakaan_kerja_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});



router.delete('/deletekejadianjagorawi', (req, res) => {
    //const no = req.params.id;

    const {kejadian_darurat_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kejadian_darurat_jagorawi WHERE kejadian_darurat_id = $1`;
    
    db.query(query, [kejadian_darurat_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekejadiancikampek', (req, res) => {
    //const no = req.params.id;

    const {kejadian_darurat_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kejadian_darurat_cikampek WHERE kejadian_darurat_id = $1`;
    
    db.query(query, [kejadian_darurat_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekejadianbali', (req, res) => {
    //const no = req.params.id;

    const {kejadian_darurat_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kejadian_darurat_bali WHERE kejadian_darurat_id = $1`;
    
    db.query(query, [kejadian_darurat_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekejadianbalsam', (req, res) => {
    //const no = req.params.id;

    const {kejadian_darurat_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kejadian_darurat_balsam WHERE kejadian_darurat_id = $1`;
    
    db.query(query, [kejadian_darurat_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


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
          // Set session setelah login berhasil
          req.session.userRole = userRole;
          req.session.ruas = ruas;
          req.session.isLoggedIn = true; // Tandai bahwa user telah login
          
          return res.status(200).json({
              message: "Login successful",
              showItems: results.rows
          });
        } else {
          return res.status(401).send('Hanya user dan admin yang dapat login');
        }
      } else {
        return res.status(401).send('Password salah');
      }
    });
});


router.post('/login-encrypt', async (req, res) => {
    const { ruas, pass_ruas } = req.body;
    const query = 'SELECT ruas, pass_ruas, userrole FROM akun_ruas WHERE ruas = $1;';
    
    db.query(query, [ruas], async (err, results) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
  
      if (results.rowCount < 1) {
        return res.status(401).send('Nama Ruas salah'); // Nama tidak ditemukan
      }
  
      const storedPassword = results.rows[0].pass_ruas;
      const userRole = results.rows[0].userrole;
      
      console.log("Ruas:", ruas);
console.log("Password input:", pass_ruas);
console.log("Stored Password:", storedPassword);

      // Membandingkan password menggunakan bcrypt
      const isMatch = await bcrypt.compare(pass_ruas, storedPassword);
      if (isMatch) {
        if (userRole && ['admin', 'user'].includes(userRole.toLowerCase())) {
          // Set session setelah login berhasil
          req.session.userRole = userRole;
          req.session.ruas = ruas;
          req.session.isLoggedIn = true; // Tandai bahwa user telah login
          
          return res.status(200).json({
              message: "Login successful",
              showItems: results.rows
          });
        } else {
          return res.status(401).send('Hanya user dan admin yang dapat login');
        }
        
      } else {
        return res.status(401).send('Password salah');
        
      }
      
    });
});


// Route register
router.post('/register', async (req, res) => {
    const { ruas, pass_ruas, userrole } = req.body;
    if (!ruas || !pass_ruas || !userrole) {
      return res.status(400).json({ message: 'Ruas, password, dan user role wajib diisi' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(pass_ruas, 10);
  
      const result = await db.query(
        'INSERT INTO akun_ruas (ruas, pass_ruas, userrole) VALUES ($1, $2, $3) RETURNING *',
        [ruas, hashedPassword, userrole]
      );
  
      res.status(201).json({ message: 'Registrasi berhasil', data: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
    }
});


router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.send('Logout successful');
    });
});


// Endpoint dinamis untuk mengambil data tabel sesuai ruas
// Endpoint dinamis untuk mengambil data tabel sesuai ruas
// router.get('/admin/data/:ruas/:table', (req, res) => {
//     const { ruas, table } = req.params;

//     // Validasi agar hanya tabel yang diizinkan dapat diakses
//     const validTables = [
//         'checklist_k3', 'kecelakaan_kerja', 'kejadian_darurat', 
//         'personel_k3', 'rekap_data_k3', 'struktur_organisasi'
//     ];

//     if (!validTables.includes(table)) {
//         return res.status(400).json({ error: "Invalid table name" });
//     }

//     // Nama tabel lengkap (misalnya: `rekap_data_k3_jagorawi`)
//     const tableName = `${table}_${ruas}`;
    
//     // Query database
//     db.query(`SELECT * FROM ${tableName}`, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Error fetching data" });
//         }
//         res.json({ message: 'Data Found', showItems: results.rows });
//     });
// });


// router.get('/admin/data/rekap_data_k3/summary', async (req, res) => {
//     // Define the sections to query
//     const sections = ['bali', 'jagorawi', 'balsam', 'belmera', 'cikampek'];

//     // Array to store query promises
//     const queryPromises = sections.map(ruas => {
//         const tableName = `rekap_data_k3_${ruas}`;
        
//         // Query to sum the specified columns for each section
//         const query = `
//             SELECT 
//                 SUM(jumlah_karyawan_ops) AS total_karyawan_ops,
//                 SUM(jumlah_karyawan_non_ops) AS total_karyawan_non_ops,
//                 SUM(jumlah_hari_kerja_ops) AS total_hari_kerja_ops,
//                 SUM(jumlah_hari_kerja_non_ops) AS total_hari_kerja_non_ops,
                
//                 SUM(kecelakaan_berat_ops) AS total_kecelakaan_berat_ops,
//                 SUM(kecelakaan_berat_non_ops) AS total_kecelakaan_berat_non_ops,
//                 SUM(kecelakaan_ringan_ops) AS total_kecelakaan_ringan_ops,
//                 SUM(kecelakaan_ringan_non_ops) AS total_kecelakaan_ringan_non_ops,
//                 SUM(kecelakaan_meninggal_ops) AS total_kecelakaan_meninggal_ops,
//                 SUM(kecelakaan_meninggal_non_ops) AS total_kecelakaan_meninggal_non_ops,
//                 SUM(kecelakaan_near_miss_ops) AS total_kecelakaan_near_miss_ops,
//                 SUM(kecelakaan_near_miss_non_ops) AS total_kecelakaan_near_miss_non_ops,
//                 SUM(fire_accident) AS total_fire_accident,
//                 SUM(damaged_property) AS total_damaged_property,
//                 SUM(jumlah_hari_hilang_ops) AS total_hari_hilang_ops,
//                 SUM(jumlah_hari_hilang_non_ops) AS total_hari_hilang_non_ops
//             FROM ${tableName};
//         `;

//         // Execute the query for each section
//         return db.query(query).then(results => results.rows[0]);
//     });

//     try {
//         // Execute all queries
//         const results = await Promise.all(queryPromises);

//         // Initialize an object to store the overall totals
//         const totalSums = {
//             total_karyawan_ops: 0,
//             total_karyawan_non_ops: 0,
//             total_hari_kerja_ops: 0,
//             total_hari_kerja_non_ops: 0,
//             total_kecelakaan_berat_ops: 0,
//             total_kecelakaan_berat_non_ops: 0,
//             total_kecelakaan_ringan_ops: 0,
//             total_kecelakaan_ringan_non_ops: 0,
//             total_kecelakaan_meninggal_ops: 0,
//             total_kecelakaan_meninggal_non_ops: 0,
//             total_kecelakaan_near_miss_ops: 0,
//             total_kecelakaan_near_miss_non_ops: 0,
//             total_fire_accident: 0,
//             total_damaged_property: 0,
//             total_hari_hilang_ops: 0,
//             total_hari_hilang_non_ops: 0
//         };

//         // Aggregate results from each section
//         results.forEach(sectionTotals => {
//             for (const key in totalSums) {
//                 if (sectionTotals[key] !== null) {
//                     totalSums[key] += Number(sectionTotals[key]);
//                 }
//             }
//         });

//         // Return the final aggregated totals
//         res.json({ message: 'Data Summed Successfully Across All Sections', totals: totalSums });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: "Error fetching and summing data from all sections" });
//     }
// });


router.get('/admin/data/rekap_data_k3/summary', async (req, res) => {
    // Define the sections to query
    const sections = ['bali', 'jagorawi', 'balsam', 'belmera', 'cikampek'];

    // Array to store query promises
    const queryPromises = sections.map(ruas => {
        const tableName = `rekap_data_k3_${ruas}`;  // Corrected template literal
        
        // SQL query to sum specified columns
        const query = `
            SELECT 
                SUM(jumlah_karyawan_ops) AS total_karyawan_ops,
                SUM(jumlah_karyawan_non_ops) AS total_karyawan_non_ops,
                SUM(jumlah_hari_kerja_ops) AS total_hari_kerja_ops,
                SUM(jumlah_hari_kerja_non_ops) AS total_hari_kerja_non_ops,
                SUM(kecelakaan_berat_ops) AS total_kecelakaan_berat_ops,
                SUM(kecelakaan_berat_non_ops) AS total_kecelakaan_berat_non_ops,
                SUM(kecelakaan_ringan_ops) AS total_kecelakaan_ringan_ops,
                SUM(kecelakaan_ringan_non_ops) AS total_kecelakaan_ringan_non_ops,
                SUM(kecelakaan_meninggal_ops) AS total_kecelakaan_meninggal_ops,
                SUM(kecelakaan_meninggal_non_ops) AS total_kecelakaan_meninggal_non_ops,
                SUM(kecelakaan_near_miss_ops) AS total_kecelakaan_near_miss_ops,
                SUM(kecelakaan_near_miss_non_ops) AS total_kecelakaan_near_miss_non_ops,
                SUM(fire_accident) AS total_fire_accident,
                SUM(damaged_property) AS total_damaged_property,
                SUM(jumlah_hari_hilang_ops) AS total_hari_hilang_ops,
                SUM(jumlah_hari_hilang_non_ops) AS total_hari_hilang_non_ops
            FROM ${tableName};
        `;

        // Execute the query for each section
        return db.query(query).then(results => results.rows[0]);
    });

    try {
        // Execute all queries
        const results = await Promise.all(queryPromises);

        // Initialize an object to store the overall totals
        const totalSums = {
            total_karyawan_ops: 0,
            total_karyawan_non_ops: 0,
            total_hari_kerja_ops: 0,
            total_hari_kerja_non_ops: 0,
            total_kecelakaan_berat_ops: 0,
            total_kecelakaan_berat_non_ops: 0,
            total_kecelakaan_ringan_ops: 0,
            total_kecelakaan_ringan_non_ops: 0,
            total_kecelakaan_meninggal_ops: 0,
            total_kecelakaan_meninggal_non_ops: 0,
            total_kecelakaan_near_miss_ops: 0,
            total_kecelakaan_near_miss_non_ops: 0,
            total_fire_accident: 0,
            total_damaged_property: 0,
            total_hari_hilang_ops: 0,
            total_hari_hilang_non_ops: 0
        };

        // Aggregate results from each section
        results.forEach(sectionTotals => {
            for (const key in totalSums) {
                if (sectionTotals[key] !== null) {
                    totalSums[key] += Number(sectionTotals[key]);
                }
            }
        });

        // Return the final aggregated totals
        res.json({ message: 'Data Summed Successfully Across All Sections', totals: totalSums });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: "Error fetching and summing data from all sections" });
    }
});





app.get('/session', (req, res) => {
    const sessionData = req.session;
    res.json(sessionData);
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
