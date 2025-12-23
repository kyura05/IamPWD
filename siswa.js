// Siswa Page Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Siswa page loaded');

    // Set current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = 'Hari: ' + getCurrentDate();
    }

    // Populate kelas dropdown
    populateKelasDropdown('kelasFilter');

    // Setup filter event
    const kelasFilter = document.getElementById('kelasFilter');
    if (kelasFilter) {
        kelasFilter.addEventListener('change', function() {
            const kelasId = this.value;
            console.log('Kelas filter changed:', kelasId);
            if (kelasId) {
                displaySiswaByKelas(kelasId);
            } else {
                document.getElementById('siswaTable').innerHTML = '<p>Pilih kelas terlebih dahulu</p>';
            }
        });
    }
});

function displaySiswaByKelas(kelasId) {
    console.log('Displaying siswa for kelas:', kelasId);

    const siswa = dataSiswaPerKelas[kelasId];
    if (!siswa) {
        console.warn('Siswa data not found for:', kelasId);
        document.getElementById('siswaTable').innerHTML = '<p>Data siswa tidak ditemukan</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>NISN</th>
                    <th>Hadir</th>
                    <th>Sakit</th>
                    <th>Izin</th>
                    <th>Alpha</th>
                    <th>Total Hari</th>
                </tr>
            </thead>
            <tbody>
    `;

    siswa.forEach((s, index) => {
        const kehadiran = s.kehadiran;
        html += `
            <tr class="siswa-row" data-nisn="${s.nisn}" data-nama="${s.nama}">
                <td>${index + 1}</td>
                <td>${s.nama}</td>
                <td>${s.nisn}</td>
                <td><span class="status-badge status-hadir">${kehadiran.hadir}</span></td>
                <td><span class="status-badge status-sakit">${kehadiran.sakit}</span></td>
                <td><span class="status-badge status-izin">${kehadiran.izin}</span></td>
                <td><span class="status-badge status-alpha">${kehadiran.alpha}</span></td>
                <td>${kehadiran.total}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    const siswaTable = document.getElementById('siswaTable');
    siswaTable.innerHTML = html;
    console.log('Siswa table displayed with', siswa.length, 'students');

    // Add click event to siswa rows
    document.querySelectorAll('.siswa-row').forEach(row => {
        row.addEventListener('click', function() {
            const nisn = this.getAttribute('data-nisn');
            const nama = this.getAttribute('data-nama');
            console.log(`Klik siswa: ${nama} (${nisn})`);
            
            // Highlight row
            document.querySelectorAll('.siswa-row').forEach(r => {
                r.style.backgroundColor = '';
            });
            this.style.backgroundColor = '#e8f4f8';
        });
    });
}
