
export const servicesData = {
    'spkt': {
        title: 'Sentra Pelayanan Kepolisian Terpadu (SPKT)',
        icon: 'Building',
        description: 'SPKT bertugas memberikan pelayanan kepolisian secara terpadu kepada masyarakat dalam bentuk penerimaan dan penanganan laporan/pengaduan, pemberian bantuan/pertolongan kepolisian, serta penyajian informasi dan dokumentasi kegiatan kepolisian.',
        persyaratan: [
            'Membawa identitas diri (KTP/SIM/Paspor) pelapor.',
            'Membawa bukti-bukti pendukung laporan (jika ada).',
            'Menyiapkan saksi-saksi (jika ada).',
            'Surat Kuasa (jika diwakilkan).'
        ],
        prosedur: [
            'Datang ke ruang SPKT Polresta Sorong Kota.',
            'Mengambil nomor antrian.',
            'Menemui petugas piket SPKT untuk konsultasi awal.',
            'Petugas melakukan kajian awal terhadap laporan.',
            'Jika laporan memenuhi unsur pidana, akan dibuatkan Laporan Polisi (LP).',
            'Jika hanya kehilangan barang, akan dibuatkan Surat Keterangan Tanda Lapor Kehilangan (SKTLK).',
            'Pelapor menerima Surat Tanda Penerimaan Laporan (STPL) atau SKTLK.'
        ],
        biaya: 'Gratis (Tidak dipungut biaya)',
        waktu: '24 Jam'
    },
    'skck': {
        title: 'Surat Keterangan Catatan Kepolisian (SKCK)',
        icon: 'FileText',
        description: 'SKCK adalah surat keterangan resmi yang diterbitkan oleh Polri melalui fungsi Intelkam kepada seorang pemohon/warga masyarakat untuk menerangkan tentang ada ataupun tidak adanya catatan suatu individu atau seseorang yang bersangkutan dalam kegiatan kriminalitas atau kejahatan.',
        persyaratan: [
            'Fotocopy KTP dengan menunjukan KTP asli.',
            'Fotocopy Kartu Keluarga.',
            'Fotocopy Akta Lahir / Ijazah.',
            'Rumus Sidik Jari (bagi yang belum daktiloskopi).',
            'Pas foto berwarna latar belakang merah ukuran 4x6 sebanyak 6 lembar.',
            'Mengisi Daftar Pertanyaan dan Kartu TIK.'
        ],
        prosedur: [
            'Pemohon datang ke loket pelayanan SKCK membawa persyaratan lengkap.',
            'Petugas melakukan pemeriksaan kelengkapan berkas.',
            'Pemohon mengisi formulir yang disediakan.',
            'Pengambilan sidik jari bagi yang belum memiliki.',
            'Proses pencetakan SKCK.',
            'Pembayaran PNBP.',
            'Penyerahan SKCK kepada pemohon.'
        ],
        biaya: 'Rp 30.000,- (Berdasarkan PP No. 76 Tahun 2020)',
        waktu: '15 - 30 Menit (Jika berkas lengkap)'
    },
    'sim': {
        title: 'Surat Izin Mengemudi (SIM)',
        icon: 'CreditCard',
        description: 'Pelayanan penerbitan SIM Baru dan Perpanjangan untuk golongan SIM A, SIM C, dan lainnya.',
        persyaratan: [
            'KTP Asli dan Fotocopy.',
            'Surat Keterangan Sehat dari Dokter (Jasmani).',
            'Surat Keterangan Lulus Tes Psikologi (Rohani).',
            'Sim Lama (khusus perpanjangan).',
            'Mengisi formulir pendaftaran.'
        ],
        prosedur: [
            'Melakukan pemeriksaan kesehatan dan psikologi.',
            'Mendaftar di loket pendaftaran SIM dan mendapat nomor antrian.',
            'Identifikasi dan verifikasi data (foto, sidik jari, tanda tangan).',
            'Ujian Teori (Avicenna) untuk pemohon baru.',
            'Ujian Praktik lapangan untuk pemohon baru.',
            'Pembayaran biaya PNBP di loket bank.',
            'Pencetakan dan penyerahan SIM.'
        ],
        biaya: 'Sesuai PP No. 76 Tahun 2020 (SIM A Baru: Rp 120.000, SIM A Perpanjangan: Rp 80.000, SIM C Baru: Rp 100.000, SIM C Perpanjangan: Rp 75.000)',
        waktu: '60 - 120 Menit'
    },
    'izin-keramaian': {
        title: 'Izin Keramaian',
        icon: 'Users',
        description: 'Surat izin yang diterbitkan oleh Polri untuk kegiatan kemasyarakatan yang bersifat keramaian dan tontonan masyarakat.',
        persyaratan: [
            'Surat permohonan dari panitia penyelenggara/penanggung jawab.',
            'Proposal kegiatan (waktu, lokasi, bentuk kegiatan, jumlah peserta).',
            'Fotocopy KTP penanggung jawab.',
            'Izin tempat/lokasi kegiatan dari pemilik tempat.',
            'Rekomendasi dari instansi terkait (jika diperlukan).'
        ],
        prosedur: [
            'Pemohon mengajukan surat permohonan ke Sat Intelkam.',
            'Petugas melakukan penelitian berkas dan survei lapangan jika perlu.',
            'Koordinasi dengan fungsi terkait (Lantas, Sabhara) untuk pengamanan.',
            'Penerbitan Surat Izin Keramaian.'
        ],
        biaya: 'Gratis (Biaya Pengamanan bersifat kontingensi/koordinasi)',
        waktu: '3 - 7 Hari Kerja sebelum kegiatan'
    },
    'sp2hp': {
        title: 'Surat Pemberitahuan Perkembangan Hasil Penyidikan (SP2HP)',
        icon: 'FileSearch',
        description: 'Layanan informasi mengenai perkembangan perkara yang sedang ditangani oleh penyidik kepada pelapor.',
        persyaratan: [
            'Menunjukkan identitas diri pelapor.',
            'Nomor Laporan Polisi (LP).',
        ],
        prosedur: [
            'Bisa dicek secara online melalui website atau aplikasi SP2HP Online (jika tersedia).',
            'Datang langsung ke Sat Reskrim menemui penyidik yang menangani.',
            'Mengajukan permohonan tertulis kepada Kasat Reskrim.'
        ],
        biaya: 'Gratis',
        waktu: 'Berkala atau sesuai permintaan'
    },
    'binluh': {
        title: 'Pembinaan dan Penyuluhan (Binluh)',
        icon: 'Megaphone',
        description: 'Kegiatan sosialisasi hukum, bahaya narkoba, tertib lalu lintas, dan kenakalan remaja.',
        persyaratan: [
            'Surat permohonan dari sekolah, instansi, atau komunitas masyarakat.'
        ],
        prosedur: [
            'Mengirimkan surat permohonan kepada Kapolresta cq Kasat Binmas.',
            'Koordinasi waktu dan materi penyuluhan.',
            'Pelaksanaan kegiatan binluh.'
        ],
        biaya: 'Gratis',
        waktu: 'Sesuai jadwal yang disepakati'
    },
    'pengawalan': {
        title: 'Pengawalan Lalu Lintas',
        icon: 'Car',
        description: 'Pelayanan pengawalan perjalanan untuk VIP, VVIP, orang sakit, jenazah, balapan sepeda, konvoi, dan barang berharga.',
        persyaratan: [
            'Surat permohonan tertulis.',
            'Fotocopy STNK dan SIM kendaraan yang dikawal (untuk konvoi).',
            'Rute perjalanan jelas.'
        ],
        prosedur: [
            'Mengajukan permohonan ke Sat Lantas.',
            'Penilaian rute dan kebutuhan personel.',
            'Pelaksanaan pengawalan.'
        ],
        biaya: 'Gratis (Sesuai ketentuan, tidak ada tarif PNBP untuk pengawalan masyrakat umum seperti jenazah/sakit)',
        waktu: 'Sesuai kebutuhan'
    },
    'pam-obvit': {
        title: 'Pengamanan Obyek Vital (Pam Obvit)',
        icon: 'ShieldAlert',
        description: 'Pengamanan kawasan tertentu, obyek wisata, dan obyek vital nasional serta pengawalan uang/barang berharga.',
        persyaratan: [
            'Surat permohonan kerjasama pengamanan.',
            'MoU atau Kontrak Kerjasama (untuk jangka panjang).'
        ],
        prosedur: [
            'Mengajukan permohonan ke Sat Samapta/Pam Obvit.',
            'Survei lokasi dan analisis risiko.',
            'Penentuan jumlah personel dan pola pengamanan.',
            'Pelaksanaan pengamanan.'
        ],
        biaya: 'Sesuai Kontrak Kerjasama / PNBP Jasa Pengamanan (jika berlaku)',
        waktu: 'Sesuai kesepakatan'
    }
};
