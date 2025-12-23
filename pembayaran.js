// Pembayaran Page Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Pembayaran page loaded');

    // Set current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = 'Hari: ' + getCurrentDate();
    }

    // Populate kelas dropdown
    populateKelasDropdown('kelasFilterPembayaran');

    // Setup filter event
    const kelasFilterPembayaran = document.getElementById('kelasFilterPembayaran');
    if (kelasFilterPembayaran) {
        kelasFilterPembayaran.addEventListener('change', function() {
            const kelasId = this.value;
            console.log('Pembayaran kelas filter changed:', kelasId);
            if (kelasId) {
                displayPembayaranByKelas(kelasId);
            } else {
                document.getElementById('pembayaranTable').innerHTML = '<p>Pilih kelas terlebih dahulu</p>';
            }
        });
    }
});

function displayPembayaranByKelas(kelasId) {
    console.log('Displaying pembayaran for kelas:', kelasId);

    const siswa = dataSiswaPerKelas[kelasId];
    if (!siswa) {
        console.warn('Siswa data not found for:', kelasId);
        document.getElementById('pembayaranTable').innerHTML = '<p>Data pembayaran tidak ditemukan</p>';
        return;
    }

    // Pisahkan siswa berdasarkan status pembayaran
    const siswaLunas = siswa.filter(s => s.sudahBayar === true);
    const siswaBelumBayar = siswa.filter(s => s.sudahBayar === false);

    let html = `
        <div style="margin-bottom: 20px; padding: 15px; background-color: #ecf0f1; border-left: 4px solid #3498db;">
            <strong>Periode Pembayaran:</strong> ${CURRENT_MONTH} | <strong>Nominal SPP:</strong> Rp ${SPP_AMOUNT.toLocaleString('id-ID')}/bulan
        </div>
    `;

    // Bagian Siswa yang Sudah Lunas
    if (siswaLunas.length > 0) {
        html += `
            <div class="pembayaran-section">
                <h3 style="color: #27ae60; border-bottom: 3px solid #27ae60; padding-bottom: 10px; margin-bottom: 15px;">
                    ✓ Siswa yang Telah Melunasi SPP (${siswaLunas.length})
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Siswa</th>
                            <th>NISN</th>
                            <th>SPP (Rp)</th>
                            <th>Status</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        siswaLunas.forEach((s, index) => {
            html += `
                <tr style="background-color: #d5f4e6;">
                    <td>${index + 1}</td>
                    <td>${s.nama}</td>
                    <td>${s.nisn}</td>
                    <td>Rp ${s.spp.toLocaleString('id-ID')}</td>
                    <td><span style="background-color: #27ae60; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;">LUNAS</span></td>
                    <td>Pembayaran SPP bulan ${CURRENT_MONTH} telah diterima dengan baik</td>
                </tr>
            `;
        });
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }

    // Bagian Siswa yang Belum Bayar
    if (siswaBelumBayar.length > 0) {
        html += `
            <div class="pembayaran-section" style="margin-top: 30px;">
                <h3 style="color: #e74c3c; border-bottom: 3px solid #e74c3c; padding-bottom: 10px; margin-bottom: 15px;">
                    ✗ Siswa yang Masih Menunggak SPP (${siswaBelumBayar.length})
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Siswa</th>
                            <th>NISN</th>
                            <th>SPP (Rp)</th>
                            <th>Status</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        siswaBelumBayar.forEach((s, index) => {
            html += `
                <tr style="background-color: #fadbd8;">
                    <td>${index + 1}</td>
                    <td>${s.nama}</td>
                    <td>${s.nisn}</td>
                    <td>Rp ${s.spp.toLocaleString('id-ID')}</td>
                    <td><span style="background-color: #e74c3c; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;">BELUM LUNAS</span></td>
                    <td>Siswa belum melakukan pembayaran SPP bulan ${CURRENT_MONTH}</td>
                </tr>
            `;
        });
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }

    // Ringkasan Pembayaran
    html += `
        <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">
            <h4 style="margin-top: 0; color: #2c3e50;">📊 Ringkasan Pembayaran</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="padding: 10px; background-color: #d5f4e6; border-left: 4px solid #27ae60; border-radius: 3px;">
                    <strong style="color: #27ae60;">Siswa Lunas:</strong> ${siswaLunas.length} dari ${siswa.length} siswa
                </div>
                <div style="padding: 10px; background-color: #fadbd8; border-left: 4px solid #e74c3c; border-radius: 3px;">
                    <strong style="color: #e74c3c;">Siswa Menunggak:</strong> ${siswaBelumBayar.length} dari ${siswa.length} siswa
                </div>
                <div style="padding: 10px; background-color: #eaf2f8; border-left: 4px solid #3498db; border-radius: 3px;">
                    <strong style="color: #3498db;">Total Terkumpul:</strong> Rp ${(siswaLunas.length * SPP_AMOUNT).toLocaleString('id-ID')}
                </div>
                <div style="padding: 10px; background-color: #fff3cd; border-left: 4px solid #f39c12; border-radius: 3px;">
                    <strong style="color: #f39c12;">Masih Menunggak:</strong> Rp ${(siswaBelumBayar.length * SPP_AMOUNT).toLocaleString('id-ID')}
                </div>
            </div>
        </div>
    `;

    const pembayaranTable = document.getElementById('pembayaranTable');
    pembayaranTable.innerHTML = html;
    console.log('Pembayaran table displayed:', { lunas: siswaLunas.length, belumBayar: siswaBelumBayar.length });
}
