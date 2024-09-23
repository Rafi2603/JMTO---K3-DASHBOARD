document.addEventListener('DOMContentLoaded', () => {
    // Fetch data for Rekap Data K3 JAGORAWI
    fetch('http://localhost:3000/getdatajagorawi')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Data Found') {
                const tableBody = document.querySelector('#data-table tbody');
                tableBody.innerHTML = ''; // Clear existing rows

                data.showItems.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.no || ''}</td>
                        <td>${item.bulan || ''}</td>
                        <td>${item.jumlah_karyawan_ops || ''}</td>
                        <td>${item.jumlah_karyawan_non_ops || ''}</td>
                        <td>${item.jumlah_hari_kerja_ops || ''}</td>
                        <td>${item.jumlah_hari_kerja_non_ops || ''}</td>
                        <td>${item.jumlah_jam_kerja || ''}</td>
                        <td>${item.kecelakaan_berat_ops || ''}</td>
                        <td>${item.kecelakaan_berat_non_ops || ''}</td>
                        <td>${item.kecelakaan_ringan_ops || ''}</td>
                        <td>${item.kecelakaan_ringan_non_ops || ''}</td>
                        <td>${item.kecelakaan_meninggal_ops || ''}</td>
                        <td>${item.kecelakaan_meninggal_non_ops || ''}</td>
                        <td>${item.kecelakaan_near_miss_ops || ''}</td>
                        <td>${item.kecelakaan_near_miss_non_ops || ''}</td>
                        <td>${item.fire_accident_ops || ''}</td>
                        <td>${item.fire_accident_non_ops || ''}</td>
                        <td>${item.damaged_property_ops || ''}</td>
                        <td>${item.damaged_property_non_ops || ''}</td>
                        <td>${item.jumlah_hari_hilang_ops || ''}</td>
                        <td>${item.jumlah_hari_hilang_non_ops || ''}</td>
                        <td>${item.jumlah_hari_tanpa_hilang_ops || ''}</td>
                        <td>${item.jumlah_hari_tanpa_hilang_non_ops || ''}</td>
                        <td>${item.lti_ops || ''}</td>
                        <td>${item.lti_non_ops || ''}</td>
                        <td>${item.man_hour_ops || ''}</td>
                        <td>${item.man_hour_non_ops || ''}</td>
                    `;
                    tableBody.appendChild(row);
                });

                // Inisialisasi DataTables untuk tabel Rekap Data K3
                $('#data-table').DataTable();
            } else {
                console.error('Data not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch data for Personel K3
    fetch('http://localhost:3000/getpersoneljagorawi')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Data Found') {
                const personelK3TableBody = document.querySelector('#personel-k3-table tbody');
                personelK3TableBody.innerHTML = ''; // Clear existing rows

                data.showItems.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.personel_k3_id || ''}</td>
                        <td>${item.nama || ''}</td>
                        <td>${item.role_personel_k3 || ''}</td>
                        <td>${item.batas_masa_berlaku || ''}</td>
                    `;
                    personelK3TableBody.appendChild(row);
                });

                // Inisialisasi DataTables untuk tabel Personel K3
                $('#personel-k3-table').DataTable();
            } else {
                console.error('Personel K3 Data not found');
            }
        })
        .catch(error => console.error('Error fetching Personel K3 data:', error));

    // Fetch data for Personel K3
    fetch('http://localhost:3000/getkecelakaanjagorawi')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Data Found') {
                const kecelakaankerjaTableBody = document.querySelector('#kecelakaan-kerja-table tbody');
                kecelakaankerjaTableBody.innerHTML = ''; // Clear existing rows

                data.showItems.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.kecelakaan_kerja_id || ''}</td>
                        <td>${item.tanggal || ''}</td>
                        <td>${item.nik || ''}</td>
                        <td>${item.nama || ''}</td>
                        <td>${item.jabatan || ''}</td>
                        <td>${item.ruas || ''}</td>
                        <td>${item.kronologis || ''}</td>
                        <td>${item.kategori_kecelakaan || ''}</td>
                        <td>${item.tindak_lanjut || ''}</td>
                        <td>${item.perawatan_di_rs || ''}</td>
                    `;
                    kecelakaankerjaTableBody.appendChild(row);
                });

                // Inisialisasi DataTables untuk tabel Personel K3
                $('#kecelakaan-kerja-table').DataTable();
            } else {
                console.error('Personel K3 Data not found');
            }
        })
        .catch(error => console.error('Error fetching Personel K3 data:', error));
});
