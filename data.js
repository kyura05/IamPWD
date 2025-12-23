// ===== SHARED DATA FOR ALL PAGES =====

// Data Kelas
const dataKelas = [
    { id: 'X-IPA-1', nama: 'X IPA 1', jurusan: 'IPA' },
    { id: 'X-IPA-2', nama: 'X IPA 2', jurusan: 'IPA' },
    { id: 'X-IPS-1', nama: 'X IPS 1', jurusan: 'IPS' },
    { id: 'X-IPS-2', nama: 'X IPS 2', jurusan: 'IPS' },
    { id: 'XI-IPA-1', nama: 'XI IPA 1', jurusan: 'IPA' },
    { id: 'XI-IPA-2', nama: 'XI IPA 2', jurusan: 'IPA' },
    { id: 'XI-IPS-1', nama: 'XI IPS 1', jurusan: 'IPS' },
    { id: 'XI-IPS-2', nama: 'XI IPS 2', jurusan: 'IPS' },
    { id: 'XII-IPA-1', nama: 'XII IPA 1', jurusan: 'IPA' },
    { id: 'XII-IPA-2', nama: 'XII IPA 2', jurusan: 'IPA' },
    { id: 'XII-IPS-1', nama: 'XII IPS 1', jurusan: 'IPS' },
    { id: 'XII-IPS-2', nama: 'XII IPS 2', jurusan: 'IPS' }
];

// Generate nama siswa
const namaSiswa = [
    'Adi Pratama', 'Budi Santoso', 'Citra Dewi', 'Deni Rahman', 'Eka Putri',
    'Fajar Gunawan', 'Gita Sarwono', 'Hendra Wijaya', 'Ika Sartika', 'Joko Widodo',
    'Kiara Sinta', 'Lina Marlina', 'Marta Saputra', 'Nadia Rizki', 'Oscar Pratama',
    'Putri Anggraeni', 'Qori Handoko', 'Rini Susanti', 'Sandi Maulana', 'Tina Suryani'
];

// Generate kehadiran
function generateKehadiran() {
    const hadir = Math.floor(Math.random() * 20) + 1;
    const sakit = Math.floor(Math.random() * 2);
    const izin = Math.floor(Math.random() * 2);
    const alpha = 30 - hadir - sakit - izin;

    return {
        hadir: hadir,
        sakit: sakit,
        izin: izin,
        alpha: alpha,
        total: 30
    };
}

// SPP tetap per siswa
const SPP_AMOUNT = 400000; // Rp 400.000 per bulan

// Bulan saat ini (Desember 2025)
const CURRENT_MONTH = 'Desember 2025';

// Generate siswa list
function generateSiswaList(kelasId, jumlah) {
    let siswaList = [];
    for (let i = 1; i <= jumlah; i++) {
        const randomName = namaSiswa[Math.floor(Math.random() * namaSiswa.length)];
        const sudahBayar = Math.random() > 0.4; // 60% siswa sudah bayar
        
        siswaList.push({
            id: `${kelasId}-${String(i).padStart(3, '0')}`,
            nisn: `202${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
            nama: `${randomName} ${i}`,
            kelas: kelasId,
            kehadiran: generateKehadiran(),
            spp: SPP_AMOUNT,
            bulanPembayaran: CURRENT_MONTH,
            sudahBayar: sudahBayar,
            status: sudahBayar ? 'Lunas' : 'Belum Lunas'
        });
    }
    return siswaList;
}

// Data Siswa per Kelas
const dataSiswaPerKelas = {
    'X-IPA-1': generateSiswaList('X-IPA-1', 15),
    'X-IPA-2': generateSiswaList('X-IPA-2', 15),
    'X-IPS-1': generateSiswaList('X-IPS-1', 15),
    'X-IPS-2': generateSiswaList('X-IPS-2', 15),
    'XI-IPA-1': generateSiswaList('XI-IPA-1', 15),
    'XI-IPA-2': generateSiswaList('XI-IPA-2', 15),
    'XI-IPS-1': generateSiswaList('XI-IPS-1', 15),
    'XI-IPS-2': generateSiswaList('XI-IPS-2', 15),
    'XII-IPA-1': generateSiswaList('XII-IPA-1', 15),
    'XII-IPA-2': generateSiswaList('XII-IPA-2', 15),
    'XII-IPS-1': generateSiswaList('XII-IPS-1', 15),
    'XII-IPS-2': generateSiswaList('XII-IPS-2', 15)
};

// ===== UTILITY FUNCTIONS =====

function getCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('id-ID', options);
}

function populateKelasDropdown(selectElementId) {
    const selectElement = document.getElementById(selectElementId);
    if (!selectElement) return;

    selectElement.innerHTML = '<option value="">-- Pilih Kelas --</option>';
    dataKelas.forEach(kelas => {
        const option = document.createElement('option');
        option.value = kelas.id;
        option.textContent = kelas.nama;
        selectElement.appendChild(option);
    });
}
