// Kelas Page Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kelas page loaded');

    // Set current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = 'Hari: ' + getCurrentDate();
    }

    // Get kelas ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedKelasId = urlParams.get('id');

    // Populate kelas grid
    populateKelasGrid();

    // If kelas ID in URL, show detail
    if (selectedKelasId) {
        displayKelasDetail(selectedKelasId);
    }
});

function populateKelasGrid() {
    const kelasGrid = document.getElementById('kelasGrid');
    if (!kelasGrid) return;

    kelasGrid.innerHTML = '';

    dataKelas.forEach(kelas => {
        const kelasItem = document.createElement('a');
        kelasItem.href = `kelas.html?id=${kelas.id}`;
        kelasItem.className = `kelas-item ${kelas.jurusan.toLowerCase()}`;
        kelasItem.setAttribute('data-kelas', kelas.id);
        kelasItem.textContent = kelas.nama;
        kelasItem.title = `Klik untuk melihat detail ${kelas.nama}`;
        kelasGrid.appendChild(kelasItem);
    });

    console.log('Kelas grid populated');
}

function displayKelasDetail(kelasId) {
    console.log('Displaying detail for kelas:', kelasId);

    const kelas = dataKelas.find(k => k.id === kelasId);
    if (!kelas) {
        console.warn('Kelas not found:', kelasId);
        return;
    }

    const kelasInfo = document.getElementById('kelasInfo');
    const siswaList = document.getElementById('siswaList');
    const detailSection = document.getElementById('kelasDetailSection');

    if (!kelasInfo || !siswaList || !detailSection) return;

    kelasInfo.innerHTML = `<strong>Kelas: ${kelas.nama} (${kelas.jurusan})</strong>`;
    siswaList.innerHTML = '';

    const siswa = dataSiswaPerKelas[kelasId];
    if (!siswa) {
        siswaList.innerHTML = '<p>Data siswa tidak ditemukan</p>';
        return;
    }

    siswa.forEach(s => {
        const siswaItem = document.createElement('div');
        siswaItem.className = 'siswa-item';
        siswaItem.innerHTML = `
            <div class="siswa-item-name">${s.nama}</div>
            <div class="siswa-item-nisn">NISN: ${s.nisn}</div>
        `;
        siswaList.appendChild(siswaItem);
    });

    // Show detail section
    detailSection.style.display = 'block';

    console.log('Detail kelas displayed with', siswa.length, 'students');
}
