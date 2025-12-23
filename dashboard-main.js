// Dashboard Main Page Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard Main loaded');

    // Set current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = 'Hari: ' + getCurrentDate();
    }

    // Populate kelas grid
    populateKelasGrid();
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

    console.log('Kelas grid populated with', dataKelas.length, 'classes');
}
