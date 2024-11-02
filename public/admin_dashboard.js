document.getElementById('exportButton').addEventListener('click', async () => {
    const ruas = document.getElementById('ruasSelect').value;

    // Daftar tabel yang perlu diambil datanya untuk tiap ruas
    const tables = [
        'checklist_k3', 'kecelakaan_kerja', 'kejadian_darurat', 
        'personel_k3', 'rekap_data_k3', 'struktur_organisasi'
    ];

    const allData = {}; // Untuk menyimpan data dari semua tabel

    for (let table of tables) {
        const response = await fetch(`/admin/data/${ruas}/${table}_${ruas}`);
        const data = await response.json();
        allData[`${table}_${ruas}`] = data;
    }

    // Menggunakan SheetJS untuk membuat workbook Excel
    const workbook = XLSX.utils.book_new();
    
    for (let tableName in allData) {
        const worksheet = XLSX.utils.json_to_sheet(allData[tableName]);
        XLSX.utils.book_append_sheet(workbook, worksheet, tableName);
    }
    
    XLSX.writeFile(workbook, `${ruas}_data.xlsx`);
});
