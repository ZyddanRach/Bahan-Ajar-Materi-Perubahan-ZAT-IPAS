import { SubtopicData, ModuleId } from '../types';

export interface ModuleMeta {
  id: ModuleId;
  number: number;
  title: string;
  badge: string;
  desc: string;
  color: string;
  subtopicIds: string[];
}

export const MODULES_METADATA: ModuleMeta[] = [
  {
    id: 'modul-1',
    number: 1,
    title: 'Zat dan Perubahannya',
    badge: 'Fisika & Kimia Dasar',
    desc: 'Memahami hakikat materi, wujud zat padat-cair-gas, komposisi zat tunggal & campuran, serta metode pemisahan zat.',
    color: 'teal',
    subtopicIds: ['klasifikasi-wujud', 'komposisi-materi', 'pemisahan-campuran', 'sifat-materi'],
  },
  {
    id: 'modul-2',
    number: 2,
    title: 'Pengukuran dan Analisis Data',
    badge: 'Metrologi & Ketelitian',
    desc: 'Pengenalan alat ukur presisi (mistar, jangka sorong, mikrometer), ketidakpastian mutlak & relatif, toleransi, serta angka penting.',
    color: 'blue',
    subtopicIds: ['alat-ukur-ketelitian', 'jangka-sorong', 'mikrometer-sekrup', 'hasil-pengukuran', 'toleransi-pengukuran', 'angka-penting-notasi'],
  },
  {
    id: 'modul-3',
    number: 3,
    title: 'Perubahan Materi',
    badge: 'Termodinamika & Reaksi',
    desc: 'Eksplorasi perubahan fisika (siklus 6 wujud, pelarutan, ekstraksi), perubahan kimia (pembakaran, korosi), dan perubahan biologi.',
    color: 'amber',
    subtopicIds: ['perubahan-fisika', 'perubahan-kimia', 'perubahan-biologi'],
  },
  {
    id: 'modul-4',
    number: 4,
    title: 'Bahan Berbahaya dan Beracun (B3)',
    badge: 'Keselamatan & Lingkungan',
    desc: 'Klasifikasi bahaya tingkat 0-4, simbol GHS, tata kelola fasilitas penyimpanan, 7 tahap pengolahan limbah B3, dan prinsip 5R.',
    color: 'rose',
    subtopicIds: ['klasifikasi-b3', 'pengelolaan-limbah-b3'],
  },
];

export const SUBTOPICS: SubtopicData[] = [
  // MODUL 1
  {
    id: 'klasifikasi-wujud',
    slug: 'klasifikasi-wujud',
    moduleId: 'modul-1',
    moduleTitle: 'Modul 1: Zat dan Perubahannya',
    title: 'Klasifikasi Materi Berdasarkan Wujud',
    shortDesc: 'Eksplorasi karakteristik partikel pada wujud padat, cair, dan gas.',
    iconName: 'Boxes',
    fenomena: {
      cerita: 'Pernahkah kamu memperhatikan mengapa batu atau lemari di kamarmu tetap mempertahankan bentuk dan volumenya yang kokoh, sedangkan air mineral di dalam botol akan mengalir dan bentuknya seketika mengikuti gelas saat dituangkan? Lalu bagaimana dengan gas di dalam balon yang segera menyebar memenuhi seluruh ruangan jika balon ditusuk?',
      pertanyaan: 'Mengapa wujud materi memiliki sifat bentuk dan volume yang berbeda secara makroskopis?',
      pilihanPrediksi: [
        'Karena berat molekul padat jauh lebih berat daripada gas.',
        'Karena perbedaan susunan, jarak, dan kuatnya gaya tarik antarpartikel penyusunnya.',
        'Karena partikel zat padat tidak pernah bergerak sedikit pun.',
        'Karena materi cair tidak memiliki molekul inti.'
      ],
      pembahasanPrediksi: 'Benar! Karakteristik wujud zat ditentukan oleh susunan mikroskopis: pada zat padat partikel sangat rapat dan teratur dengan ikatan kuat (hanya bergetar); pada zat cair partikel agak renggang dan dapat bergeser; sedangkan pada gas partikel sangat berjauhan dengan ikatan sangat lemah sehingga bergerak bebas ke segala arah.'
    },
    tujuan: [
      'Menjelaskan pengertian materi sebagai objek yang menempati ruang dan memiliki massa.',
      'Membandingkan sifat susunan partikel, gaya tarik, bentuk, dan volume pada zat padat, cair, dan gas.',
      'Mengamati hubungan antara energi panas (suhu) dengan pergerakan partikel zat.'
    ],
    simulasiType: 'partikel',
    defaultObservationRows: [
      { id: '1', percobaan: 'Wujud Padat', variabel: 'Suhu Rendah (-20°C)', hasil: 'Partikel rapat teratur dalam kisi kristal, hanya bergetar di tempat', kesimpulan: 'Bentuk tetap & volume tetap karena gaya tarik sangat kuat' },
      { id: '2', percobaan: 'Wujud Cair', variabel: 'Suhu Sedang (35°C)', hasil: 'Partikel berdekatan tetapi dapat menggelincir/berpindah posisi', kesimpulan: 'Bentuk berubah mengikuti wadah, volume tetap' },
      { id: '3', percobaan: 'Wujud Gas', variabel: 'Suhu Tinggi (100°C)', hasil: 'Partikel berjauhan, bergerak cepat dan acak mengisi seluruh wadah', kesimpulan: 'Bentuk dan volume berubah tidak beraturan' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Bagaimana keteraturan kristal dan gaya tarik partikel zat padat mempengaruhi sifat volumenya?',
        clue: 'Partikel penyusun padat saling berdekatan membuat gaya tarik antarpartikel sangat kuat, sehingga volume dan bentuknya tetap.'
      },
      {
        pertanyaan: 'Mengapa partikel gas dapat dengan mudah meninggalkan kelompoknya (inti molekulnya)?',
        clue: 'Jarak antarpartikel gas sangat renggang dan gaya tarik antarpartikel sangat lemah, sehingga energi kinetik mendominasi pergerakan.'
      }
    ],
    materiInti: {
      ringkasan: 'Materi adalah suatu objek atau bahan yang menempati ruang dan memiliki massa. Berdasarkan wujudnya, materi dikelompokkan menjadi padat, cair, dan gas dengan karakteristik mikroskopis yang khas.',
      poinPenting: [
        { judul: 'Zat Padat', isi: 'Bentuk tetap, volume tetap, partikel tersusun rapat dan teratur (kristal), gaya tarik sangat kuat, gerak partikel hanya berupa getaran di sekitar posisi setimbang.' },
        { judul: 'Zat Cair', isi: 'Bentuk berubah sesuai wadah, volume tetap, partikel tidak terlalu rapat, gaya tarik lebih lemah dari padat, partikel mudah berpindah namun tidak dapat meninggalkan kelompoknya.' },
        { judul: 'Zat Gas', isi: 'Bentuk dan volume berubah memenuhi ruang, susunan partikel sangat acak dan berjauhan, gaya tarik sangat lemah, partikel bergerak bebas ke segala arah.' }
      ],
      rumusAtauKonsep: 'Materi = Memiliki Massa (m) & Menempati Ruang (Volume, V). Karakteristik wujud = f(Jarak partikel, Gaya intermolekuler, Energi kinetik).',
      miskonsepsi: 'Miskonsepsi umum: Partikel pada zat padat dianggap diam total tanpa bergerak. Faktanya, pada wujud padat partikel tetap bergerak dalam bentuk getaran (vibrasi).'
    },
    refleksi: {
      pertanyaan1: 'Ketika kamu memanaskan balok es hingga menjadi air lalu mendidih menjadi uap, apa yang sesungguhnya berubah pada tingkat partikel?',
      pertanyaan2: 'Mengapa zat gas dapat dimampatkan ke dalam tabung elpiji atau oksigen, sedangkan batu tidak bisa dimampatkan?',
      penerapanDuniaNyata: 'Pemahaman wujud zat digunakan dalam teknologi penyimpanan gas bertekanan tinggi (tabung oksigen medis), rekayasa material komposit tahan guncangan, dan sistem pendingin lemari es.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Ciri mikroskopis yang tepat untuk zat cair adalah...',
        options: [
          'Partikel tersusun dalam kisi kristal yang sangat kaku dan hanya bergetar',
          'Partikel mudah berpindah tetapi tidak bisa meninggalkan kelompok molekulnya sehingga volumenya tetap',
          'Partikel terpisah sangat jauh dan bebas mengisi seluruh volume ruangan',
          'Gaya tarik antarpartikel bernilai nol mutlak'
        ],
        correctAnswer: 1,
        explanation: 'Pada zat cair, partikel memiliki jarak yang tidak terlalu rapat sehingga mudah berpindah (mengikuti wadah), namun gaya tarik masih cukup kuat untuk mempertahankan volume tetap.'
      },
      {
        id: 'q2',
        question: 'Dua syarat mutlak sesuatu disebut sebagai materi menurut sains adalah...',
        options: [
          'Memiliki massa dan dapat dilihat dengan mata telanjang',
          'Memiliki massa dan menempati ruang (memiliki volume)',
          'Memiliki energi panas dan berwujud padat',
          'Dapat menghantarkan arus listrik dan panas'
        ],
        correctAnswer: 1,
        explanation: 'Definisi materi dalam sains: segala sesuatu yang memiliki massa dan menempati ruang (memiliki volume).'
      },
      {
        id: 'q3',
        question: 'Ketika suhu dinaikkan, pengaruh energi kinetik terhadap partikel gas adalah...',
        options: [
          'Gerak partikel semakin lambat dan mendekat satu sama lain',
          'Partikel gas membeku membentuk kristal padat',
          'Kecepatan tumbukan dan jarak acak antarpartikel semakin meningkat',
          'Gaya tarik antarpartikel gas mendadak menjadi sangat kuat'
        ],
        correctAnswer: 2,
        explanation: 'Kenaikan suhu meningkatkan energi kinetik partikel sehingga partikel bergerak lebih cepat dan berhamburan lebih acak.'
      }
    ]
  },
  {
    id: 'komposisi-materi',
    slug: 'komposisi-materi',
    moduleId: 'modul-1',
    moduleTitle: 'Modul 1: Zat dan Perubahannya',
    title: 'Komposisi Materi: Zat Tunggal & Campuran',
    shortDesc: 'Membedakan unsur (logam/nonlogam/semilogam), senyawa kimia, serta larutan, koloid, dan suspensi.',
    iconName: 'Atom',
    fenomena: {
      cerita: 'Di dapur, kita menemui garam meja (NaCl) yang terasa asin. Garam itu tersusun dari natrium (logam reaktif) dan klorida (gas beracun), namun saat bersatu menghasilkan kristal bumbu yang aman dikonsumsi. Di sisi lain, ketika mencampurkan sirup, susu, dan kopi bubuk dengan air, ketiganya menghasilkan penampakan yang sangat berbeda saat disaring!',
      pertanyaan: 'Mengapa air sirup tetap jernih dan tidak dapat disaring, sedangkan kopi tubruk meninggalkan endapan tebal di dasar cangkir?',
      pilihanPrediksi: [
        'Karena sirup adalah unsur murni, sedangkan kopi adalah senyawa.',
        'Karena sirup merupakan larutan homogen stabil tanpa endapan, sedangkan kopi tubruk adalah suspensi heterogen tidak stabil.',
        'Karena susu dapat mengendap dengan gravitasi dalam beberapa detik.',
        'Semua cairan di dapur memiliki ukuran partikel yang persis sama.'
      ],
      pembahasanPrediksi: 'Tepat sekali! Berdasarkan kestabilan dan ukuran partikel: sirup adalah larutan homogen (tidak ada endapan, lolos saringan), susu adalah koloid (tampak rata namun mikroskopis ada fase terdispersi dan medium pendispersi), dan kopi tubruk adalah suspensi (mudah mengendap dan dapat disaring).'
    },
    tujuan: [
      'Membedakan zat tunggal (unsur dan senyawa) dengan campuran.',
      'Mengidentifikasi karakteristik unsur logam, nonlogam, dan semilogam (metaloid).',
      'Mengklasifikasikan campuran ke dalam larutan homogen, koloid, dan suspensi berdasarkan kestabilan dan ukuran partikel.'
    ],
    simulasiType: 'klasifikasi',
    defaultObservationRows: [
      { id: '1', percobaan: 'Air + Gula (Sirup)', variabel: 'Pencampuran homogen', hasil: 'Jernih, tidak ada endapan, tidak terpisah saat didiamkan', kesimpulan: 'Larutan (campuran homogen stabil)' },
      { id: '2', percobaan: 'Susu Cair', variabel: 'Sistem koloid', hasil: 'Keruh merata, fase terdispersi tidak mengendap dalam waktu singkat', kesimpulan: 'Koloid (fase terdispersi dalam medium pendispersi)' },
      { id: '3', percobaan: 'Air + Pasir/Kopi', variabel: 'Campuran heterogen kasar', hasil: 'Terbentuk endapan cepat di dasar wadah, cairan atas jernih', kesimpulan: 'Suspensi (campuran tidak stabil, dapat disaring)' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Apa perbedaan mendasar antara unsur dan senyawa?',
        clue: 'Unsur tidak dapat diuraikan lagi melalui reaksi kimia biasa, sedangkan senyawa adalah gabungan unsur berbeda melalui ikatan kimia dengan perbandingan massa tetap.'
      },
      {
        pertanyaan: 'Sebutkan sifat khas logam dibanding nonlogam dan semilogam!',
        clue: 'Logam mengkilap, padat pada suhu kamar (kecuali raksa dan sesium), dapat ditempa, serta konduktor panas dan listrik yang baik.'
      }
    ],
    materiInti: {
      ringkasan: 'Komposisi materi terbagi menjadi Zat Tunggal (Unsur dan Senyawa) dan Campuran (Larutan, Koloid, Suspensi). Setiap jenis memiliki sifat fisik dan kimia yang khas.',
      poinPenting: [
        { judul: 'Unsur Logam', isi: 'Mengkilap, padat pada suhu kamar (kecuali raksa dan sesium yang cair), keras, massa jenis tinggi, dapat ditempa/direnggangkan, konduktor panas & listrik unggul.' },
        { judul: 'Unsur Nonlogam', isi: 'Wujud padat/cair/gas, rapuh, isolator panas & listrik (kecuali grafit/karbon), tidak mengkilap (kecuali intan).' },
        { judul: 'Unsur Semilogam (Metaloid)', isi: 'Memiliki sifat peralihan antara logam dan nonlogam, banyak dimanfaatkan sebagai bahan semikonduktor komponen elektronika (misalnya Silikon, Germanium).' },
        { judul: 'Senyawa', isi: 'Gabungan dua atau lebih unsur berbeda yang saling berikatan melalui reaksi kimia dalam perbandingan massa tetap dan tertentu (misal NaCl, H₂O).' },
        { judul: 'Larutan vs Koloid vs Suspensi', isi: 'Larutan: homogen, stabil, tanpa endapan, tidak dapat disaring. Koloid: heterogen mikroskopis, fase terdispersi & medium pendispersi. Suspensi: heterogen, tidak stabil, mudah mengendap, dapat disaring.' }
      ],
      rumusAtauKonsep: 'Senyawa: Rumus kimia baku (misal H₂O, NaCl). Campuran: Komposisi variabel tanpa perbandingan massa tetap.',
      miskonsepsi: 'Miskonsepsi: Menganggap koloid seperti susu atau santan adalah larutan homogen karena tampak rata dengan mata biasa. Secara mikroskopis, koloid adalah campuran heterogen dua fase!'
    },
    refleksi: {
      pertanyaan1: 'Mengapa kabel listrik rumah menggunakan tembaga (logam) yang dilapisi plastik (nonlogam)?',
      pertanyaan2: 'Bagaimana cara sederhana membuktikan apakah suatu cairan adalah larutan murni atau suspensi di rumah?',
      penerapanDuniaNyata: 'Prinsip semilogam digunakan dalam chip prosesor komputer dan sel surya. Sistem koloid diterapkan luas dalam industri farmasi (sirup obat emulsi), cat dinding, dan kosmetik.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Unsur logam berikut yang berwujud cair pada suhu kamar sesuai materi PDF adalah...',
        options: ['Besi dan Tembaga', 'Raksa dan Sesium', 'Emas dan Perak', 'Aluminium dan Seng'],
        correctAnswer: 1,
        explanation: 'Pada suhu kamar, umumnya logam berwujud padat kecuali raksa (merkuri) dan sesium yang berwujud cair.'
      },
      {
        id: 'q2',
        question: 'Campuran homogen di mana komponen pelarut dan terlarut tidak dapat dibedakan lagi dan tidak terdapat endapan disebut...',
        options: ['Suspensi', 'Koloid', 'Larutan', 'Senyawa'],
        correctAnswer: 2,
        explanation: 'Larutan merupakan campuran homogen yang stabil tanpa endapan dan tidak dapat dipisahkan dengan penyaringan biasa.'
      },
      {
        id: 'q3',
        question: 'Senyawa kimia tersusun atas beberapa unsur dengan karakteristik...',
        options: [
          'Tercampur secara mekanik tanpa perbandingan massa tertentu',
          'Saling berikatan melalui reaksi kimia dalam perbandingan massa tetap dan tertentu',
          'Selalu mempertahankan sifat asli masing-masing unsurnya secara terpisah',
          'Dapat diuraikan kembali dengan saringan kertas biasa'
        ],
        correctAnswer: 1,
        explanation: 'Senyawa terbentuk melalui reaksi kimia antarunsur yang bergabung dengan perbandingan massa tetap dan menghasilkan sifat baru.'
      }
    ]
  },
  {
    id: 'pemisahan-campuran',
    slug: 'pemisahan-campuran',
    moduleId: 'modul-1',
    moduleTitle: 'Modul 1: Zat dan Perubahannya',
    title: 'Pemisahan Campuran',
    shortDesc: 'Teknik filtrasi, kristalisasi, dekantasi, sublimasi, distilasi, dan kromatografi.',
    iconName: 'Filter',
    fenomena: {
      cerita: 'Air laut kaya akan garam, namun kita tidak bisa langsung meminumnya. Petani garam di Madura memanaskan air laut di tambak hingga air menguap dan kristal garam putih terbentuk. Sementara itu di pabrik minyak bumi, minyak mentah dipisahkan menjadi bensin, solar, dan avtur berdasarkan perbedaan titik didihnya.',
      pertanyaan: 'Bagaimana prinsip fisis dapat digunakan untuk memisahkan campuran tanpa merusak komponen aslinya?',
      pilihanPrediksi: [
        'Dengan mengubah senyawa menjadi unsur baru melalui ledakan.',
        'Dengan memanfaatkan perbedaan sifat fisis seperti ukuran partikel, titik didih, kelarutan, atau laju rambat molekul.',
        'Semua campuran hanya bisa dipisahkan dengan alat pendingin.',
        'Pemisahan campuran selalu membutuhkan reaksi kimia berkatalis racun.'
      ],
      pembahasanPrediksi: 'Tepat! Pemisahan campuran didasarkan pada perbedaan sifat fisis: ukuran partikel (filtrasi), titik didih (distilasi), kelarutan (kristalisasi), fase uap zat padat (sublimasi), sedimentasi (dekantasi), dan kecepatan rambat (kromatografi).'
    },
    tujuan: [
      'Menjelaskan 6 metode pemisahan campuran sesuai PDF: filtrasi, kristalisasi, dekantasi, sublimasi, distilasi, dan kromatografi.',
      'Menentukan metode pemisahan yang tepat berdasarkan karakteristik zat penyusun campuran.',
      'Mensimulasikan proses fisis pemisahan campuran secara visual.'
    ],
    simulasiType: 'pemisahan',
    defaultObservationRows: [
      { id: '1', percobaan: 'Filtrasi (Penyaringan)', variabel: 'Campuran kapur dan air', hasil: 'Kapur tertahan di kertas saring (residu), air jernih lolos (filtrat)', kesimpulan: 'Pemisahan berdasarkan perbedaan ukuran partikel padat dari cairannya' },
      { id: '2', percobaan: 'Distilasi (Penyulingan)', variabel: 'Campuran air dan alkohol', hasil: 'Alkohol (titik didih 78°C) menguap lebih dulu, terkondensasi di labu penampung', kesimpulan: 'Pemisahan berdasarkan perbedaan titik didih/kemudahan menguap' },
      { id: '3', percobaan: 'Sublimasi', variabel: 'Iodium kotor / Kapur barus + pasir', hasil: 'Kapur barus menyublim jadi gas lalu mengkristal di tutup dingin, pasir tertinggal', kesimpulan: 'Pemisahan tanpa melalui fase cair' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Kapan teknik dekantasi lebih dipilih dibandingkan filtrasi?',
        clue: 'Dekantasi adalah pemisahan paling sederhana untuk campuran padatan kasar dan cairan dengan cara menuangkan cairan perlahan melalui batang pengaduk saat endapan telah mengendap di dasar wadah.'
      },
      {
        pertanyaan: 'Jelaskan prinsip kerja kromatografi kertas!',
        clue: 'Berdasarkan perbedaan pola pergerakan antara fase gerak (pelarut yang merambat) dan fase diam (kertas) terhadap molekul zat terlarut.'
      }
    ],
    materiInti: {
      ringkasan: 'Senyawa kimia di alam sering tercampur dengan senyawa lain. Untuk memperoleh zat murni, digunakan metode pemisahan fisik sesuai karakteristiknya.',
      poinPenting: [
        { judul: 'Filtrasi (Penyaringan)', isi: 'Pemisahan materi padat dari cairannya dengan melewatkan campuran pada saringan (filter).' },
        { judul: 'Kristalisasi', isi: 'Pemisahan campuran dengan cara mengendapkan larutan lewat jenuh sampai membentuk padatan berupa kristal (contoh: pembuatan garam dapur).' },
        { judul: 'Dekantasi', isi: 'Metode paling sederhana, menuangkan cairan perlahan melalui batang pengaduk agar endapan/sedimen tertinggal di wadah asal.' },
        { judul: 'Sublimasi', isi: 'Pemisahan campuran tanpa melalui fase cair terlebih dahulu, dengan menguapkan zat padat sehingga kotoran yang tidak menyublim terpisah (contoh: pemurnian kapur barus/iodin).' },
        { judul: 'Distilasi (Penyulingan)', isi: 'Pemisahan campuran berdasarkan perbedaan titik didih dan kemudahan bahan untuk menguap (contoh: pemisahan fraksi minyak bumi, penyulingan air murni).' },
        { judul: 'Kromatografi', isi: 'Pemisahan campuran berdasarkan perbedaan pola pergerakan antara fase gerak dan fase diam suatu molekul pada suatu larutan (contoh: pemisahan zat warna tinta/klorofil).' }
      ],
      rumusAtauKonsep: 'Prinsip pemisahan: Δ Ukuran partikel (Filtrasi), Δ Titik didih (Distilasi), Δ Kelarutan (Kristalisasi), Δ Kecepatan gerak fasa (Kromatografi).',
      miskonsepsi: 'Miskonsepsi: Menganggap air laut yang diuapkan adalah distilasi. Jika uap airnya dibuang dan hanya mengambil garamnya, proses itu adalah kristalisasi/evaporasi. Jika uap airnya ditangkap dan diembunkan kembali menjadi air tawar, barulah proses tersebut disebut distilasi!'
    },
    refleksi: {
      pertanyaan1: 'Jika kamu terdampar di pulau terpencil dengan air laut, metode apa yang bisa kamu buat dari wadah sederhana untuk menghasilkan air tawar?',
      pertanyaan2: 'Mengapa forensik kepolisian menggunakan kromatografi untuk menguji bukti tinta pemalsuan dokumen?',
      penerapanDuniaNyata: 'Industri minyak bumi mengandalkan distilasi bertingkat, industri farmasi menggunakan kromatografi HPLC untuk menguji kemurnian obat, dan pengolahan limbah menggunakan filtrasi & sedimentasi.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Proses pemisahan campuran yang dilakukan dengan menguapkan zat padat tanpa melalui fase cair terlebih dahulu disebut...',
        options: ['Distilasi', 'Sublimasi', 'Dekantasi', 'Kristalisasi'],
        correctAnswer: 1,
        explanation: 'Sublimasi adalah perubahan wujud padat langsung menjadi gas tanpa melalui fase cair terlebih dahulu untuk memisahkan kotoran.'
      },
      {
        id: 'q2',
        question: 'Metode pemisahan campuran yang bekerja berdasarkan perbedaan titik didih zat penyusunnya adalah...',
        options: ['Kromatografi', 'Filtrasi', 'Distilasi (Penyulingan)', 'Dekantasi'],
        correctAnswer: 2,
        explanation: 'Distilasi memisahkan campuran berdasarkan perbedaan titik didih komponen-komponennya.'
      },
      {
        id: 'q3',
        question: 'Batang pengaduk pada teknik dekantasi berfungsi untuk...',
        options: [
          'Memanaskan larutan agar titik didih meningkat',
          'Mengarahkan aliran cairan secara perlahan sehingga endapan sedimen tidak ikut tumpah',
          'Menyaring partikel mikroskopis yang larut',
          'Mengubah campuran menjadi kristal padat'
        ],
        correctAnswer: 1,
        explanation: 'Batang pengaduk digunakan untuk mengalirkan cairan secara lembut agar endapan tetap tenang di dasar gelas kimia.'
      }
    ]
  },
  {
    id: 'sifat-materi',
    slug: 'sifat-materi',
    moduleId: 'modul-1',
    moduleTitle: 'Modul 1: Zat dan Perubahannya',
    title: 'Sifat Materi: Sifat Fisis dan Sifat Kimia',
    shortDesc: 'Menelaah besaran pokok, besaran turunan, serta sifat kimia (mudah terbakar, membusuk, korosif).',
    iconName: 'Flame',
    fenomena: {
      cerita: 'Bensin memiliki wujud cair dan bau yang khas (sifat fisis), namun bensin juga memiliki uap yang sangat mudah tersulut api jika terkena percikan (sifat kimia). Sebaliknya, sebatang paku besi memiliki massa dan panjang tertentu, namun jika dibiarkan di udara lembap akan berubah warna menjadi cokelat kemerahan karena korosif.',
      pertanyaan: 'Apa yang membedakan sifat fisis suatu materi dengan sifat kimianya?',
      pilihanPrediksi: [
        'Sifat fisis hanya ada pada zat padat, sedangkan sifat kimia hanya pada zat cair.',
        'Sifat fisis dapat diamati tanpa mengubah komposisi zat, sedangkan sifat kimia hanya teramati saat zat mengalami reaksi pembentukan zat baru.',
        'Sifat kimia selalu dapat dibalikkan dengan mudah.',
        'Sifat fisis tidak memiliki besaran dan satuan.'
      ],
      pembahasanPrediksi: 'Tepat! Sifat fisis berkaitan dengan wujud, massa, panjang, titik didih, dan besaran pengukuran tanpa mengubah zat. Sifat kimia berkaitan dengan kemampuan zat bereaksi membentuk zat baru (misal: mudah terbakar, mudah membusuk, korosif).'
    },
    tujuan: [
      'Mengklasifikasikan sifat materi ke dalam sifat fisis dan sifat kimia.',
      'Menghubungkan sifat fisis dengan besaran pokok dan besaran turunan.',
      'Mengidentifikasi karakteristik sifat kimia: mudah terbakar, mudah membusuk, dan korosif.'
    ],
    simulasiType: 'korosi-reaksi',
    defaultObservationRows: [
      { id: '1', percobaan: 'Pengukuran Panjang Kawat', variabel: 'Sifat Fisis (Besaran Pokok)', hasil: 'Kawat panjang 15 cm, massa 12 gram, tidak ada zat baru', kesimpulan: 'Sifat fisis dapat diukur tanpa mengubah identitas zat' },
      { id: '2', percobaan: 'Penyulutan Alkohol', variabel: 'Sifat Kimia (Flammability)', hasil: 'Menyala menghasilkan api, gas CO2 dan uap air', kesimpulan: 'Sifat kimia mudah terbakar menghasilkan zat baru' },
      { id: '3', percobaan: 'Paku Besi + Larutan Asam', variabel: 'Sifat Kimia (Korosif)', hasil: 'Paku berkarat dan terkorosi menjadi besi oksida', kesimpulan: 'Sifat kimia korosif menyebabkan perusakan material logam' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Sebutkan 3 sifat kimia utama materi yang dibahas dalam dokumen!',
        clue: 'Sesuai PDF materi: 1. Mudah terbakar, 2. Mudah membusuk, 3. Korosif.'
      },
      {
        pertanyaan: 'Bagaimana besaran pokok dan besaran turunan menjadi bagian dari sifat fisis materi?',
        clue: 'Besaran pokok (panjang, massa, waktu, suhu) dan besaran turunan (volume, massa jenis) mendeskripsikan kondisi fisik zat secara kuantitatif.'
      }
    ],
    materiInti: {
      ringkasan: 'Sifat materi dikelompokkan menjadi dua bagian utama: sifat fisis yang berhubungan dengan pengukuran kondisi fisik, dan sifat kimia yang berhubungan dengan reaksi pembentukan zat baru.',
      poinPenting: [
        { judul: 'Sifat Fisis', isi: 'Sifat yang dapat diamati dan diukur tanpa mengubah zat penyusunnya. Mencakup besaran pokok (panjang, massa, waktu, suhu) dan besaran turunan (luas, volume, massa jenis, kelajuan).' },
        { judul: 'Sifat Kimia - Mudah Terbakar', isi: 'Kecenderungan zat untuk bereaksi dengan oksigen menghasilkan energi panas dan cahaya (misal: alkohol, bensin, gas metana).' },
        { judul: 'Sifat Kimia - Mudah Membusuk', isi: 'Kecenderungan zat organik untuk terurai akibat aktivitas enzim mikrobiologis atau reaksi redoks dengan lingkungan.' },
        { judul: 'Sifat Kimia - Korosif', isi: 'Kecenderungan bahan (terutama asam kuat atau basa kuat) untuk mengikis, merusak, atau mengoksidasi logam dan jaringan biologis.' }
      ],
      rumusAtauKonsep: 'Sifat Fisis = Pengamatan non-destruktif kimiawi. Sifat Kimia = Transformasi ikatan kimia (Reaksi kimia).',
      miskonsepsi: 'Miskonsepsi: Menganggap perubahan warna selalu merupakan sifat kimia. Perubahan warna pada pelarutan pewarna makanan adalah sifat fisis karena tidak membentuk ikatan zat baru.'
    },
    refleksi: {
      pertanyaan1: 'Mengapa tabung gas elpiji di dapur diberi bau zat tambahan khusus?',
      pertanyaan2: 'Bagaimana pengemasan makanan memanfaatkan pengetahuan tentang sifat mudah membusuk?',
      penerapanDuniaNyata: 'Pemilihan material konstruksi gedung menggunakan baja paduan anti-korosif, sedangkan penyimpanan bahan bakar di bandara memperhatikan batas aman sifat mudah terbakar.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Manakah di bawah ini yang merupakan contoh sifat fisis materi?',
        options: ['Mudah berkarat saat terkena air hujan', 'Massa jenis dan titik leleh balok es', 'Kemampuan kayu mengalami pembakaran', 'Daging yang membusuk karena bakteri'],
        correctAnswer: 1,
        explanation: 'Massa jenis dan titik leleh merupakan sifat fisis karena dapat diukur tanpa mengubah identitas molekul zat.'
      },
      {
        id: 'q2',
        question: 'Tiga sifat kimia yang secara eksplisit dirangkum dalam materi adalah...',
        options: [
          'Panjang, massa, dan suhu',
          'Mudah terbakar, mudah membusuk, dan korosif',
          'Filtrasi, distilasi, dan kristalisasi',
          'Padat, cair, dan gas'
        ],
        correctAnswer: 1,
        explanation: 'PDF merangkum tiga sifat kimia materi: a. Mudah terbakar, b. Mudah membusuk, c. Korosif.'
      },
      {
        id: 'q3',
        question: 'Zat yang memiliki sifat korosif dapat menimbulkan bahaya berupa...',
        options: [
          'Menyebabkan pembekuan instan pada ruangan',
          'Mengikis dan merusak permukaan logam serta menyebabkan luka bakar kimia pada kulit',
          'Menghilangkan medan gravitasi bumi',
          'Mengubah logam menjadi emas murni'
        ],
        correctAnswer: 1,
        explanation: 'Sifat korosif berarti zat tersebut agresif mengoksidasi logam dan merusak jaringan biologis.'
      }
    ]
  },

  // MODUL 2
  {
    id: 'alat-ukur-ketelitian',
    slug: 'alat-ukur-ketelitian',
    moduleId: 'modul-2',
    moduleTitle: 'Modul 2: Pengukuran',
    title: 'Pengenalan Alat Ukur & Kesalahan Pengamatan',
    shortDesc: 'Spesifikasi ketelitian mistar, jangka sorong, mikrometer sekrup, stopwatch, termometer, dan analisis paralaks.',
    iconName: 'Ruler',
    fenomena: {
      cerita: 'Dalam industri farmasi, ketebalan kaca ampul obat atau volume cairan injeksi harus diukur dengan presisi luar biasa. Kesalahan hanya 0,1 milimeter pada tutup botol infus dapat menyebabkan kebocoran fatal atau kontaminasi bakteri. Di laboratorium, dua siswa mengukur panjang tabung reaksi yang sama dengan penggaris kayu, namun memperoleh angka yang berbeda!',
      pertanyaan: 'Mengapa hasil pengukuran dua orang pengamat terhadap benda yang sama bisa berbeda?',
      pilihanPrediksi: [
        'Karena panjang benda selalu berubah setiap detik secara acak.',
        'Karena adanya keterbatasan ketelitian alat, kesalahan sudut pandang mata (paralaks), dan kekeliruan cara membaca skala.',
        'Karena mistar tidak memiliki skala terkecil.',
        'Karena pengukuran selalu menghasilkan nilai tanpa ketidakpastian.'
      ],
      pembahasanPrediksi: 'Tepat sekali! Ketelitian hasil pengukuran ditentukan oleh alat ukur (skala terkecil) dan keterampilan pengamat. Kesalahan manusia seperti kesalahan sudut pandang (paralaks), ketidaktelitian membaca, salah catat satuan, kelelahan, dan salah interpretasi adalah penyebab utamanya.'
    },
    tujuan: [
      'Menyebutkan fungsi dan ketelitian mistar (1 mm), jangka sorong (0,1 mm), mikrometer sekrup (0,01 mm), stopwatch (0,01 s), dan termometer (0,1 °C).',
      'Menjelaskan penyebab kesalahan pengamatan: paralaks, ketidaktelitian skala, salah catat, kelelahan, dan kesalahan interpretasi.',
      'Menerapkan cara membaca alat ukur dengan posisi mata tegak lurus dan menghindari kesalahan meniskus.'
    ],
    simulasiType: 'alat-ukur',
    defaultObservationRows: [
      { id: '1', percobaan: 'Mistar / Penggaris', variabel: 'Sudut pandang mata 90° vs 45°', hasil: 'Mata tegak lurus: 4,5 cm. Mata miring: 4,7 cm (terjadi paralaks)', kesimpulan: 'Ketelitian 1 mm, wajib pandang tegak lurus garis skala' },
      { id: '2', percobaan: 'Stopwatch Digital', variabel: 'Pengukuran waktu reaksi', hasil: 'Ketelitian mencapai 0,01 sekon', kesimpulan: 'Tekan tombol mulai dan henti tepat waktu untuk minimalkan jeda reaksi' },
      { id: '3', percobaan: 'Termometer Zat Cair', variabel: 'Pembacaan meniskus cekung air', hasil: 'Ketelitian 0,1 °C, baca tepat di dasar cekungan', kesimpulan: 'Sensor harus menyentuh zat, hindari paralaks meniskus' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Apa yang dimaksud dengan kesalahan paralaks (parallax error)?',
        clue: 'Terjadi ketika mata tidak tegak lurus/sejajar dengan skala alat saat membaca hasil, sehingga terbaca lebih besar atau lebih kecil dari nilai sebenarnya.'
      },
      {
        pertanyaan: 'Bandingkan tingkat ketelitian antara mistar, jangka sorong, dan mikrometer sekrup!',
        clue: 'Mistar = 1 mm (0,1 cm); Jangka Sorong = 0,1 mm (0,01 cm); Mikrometer Sekrup = 0,01 mm (10x lebih teliti dari jangka sorong).'
      }
    ],
    materiInti: {
      ringkasan: 'Pengukuran merupakan langkah dasar memperoleh data akurat dalam sains dan industri. Hasil yang benar bergantung pada alat ukur, cara pakai, keterampilan pengamat, dan analisis ketidakpastian.',
      poinPenting: [
        { judul: 'Mistar / Penggaris', isi: 'Fungsi: Mengukur panjang benda. Ketelitian: 1 mm (0,1 cm). Letakkan benda sejajar dengan skala nol dan pandang tegak lurus agar tidak terjadi kesalahan paralaks.' },
        { judul: 'Jangka Sorong', isi: 'Fungsi: Mengukur diameter luar, diameter dalam, dan kedalaman benda. Ketelitian: 0,1 mm (0,01 cm). Hasil = Skala Utama + Skala Nonius.' },
        { judul: 'Mikrometer Sekrup', isi: 'Fungsi: Mengukur ketebalan atau diameter benda kecil. Ketelitian: 0,01 mm (10⁻⁵ m, 10x lebih teliti dari jangka sorong). Hasil = Skala Utama + Skala Putar.' },
        { judul: 'Stopwatch & Termometer', isi: 'Stopwatch digital (0,01 s) untuk waktu; Termometer (0,1 °C) untuk suhu (sensor menyentuh benda, hindari kesalahan meniskus).' },
        { judul: '5 Faktor Kesalahan Pengamatan', isi: '1. Kesalahan Paralaks (sudut mata), 2. Ketidaktelitian membaca skala, 3. Salah mencatat hasil/satuan, 4. Kelelahan/kurang fokus, 5. Kesalahan interpretasi alat.' }
      ],
      rumusAtauKonsep: 'Ketelitian Alat: Mistar = 1 mm | Jangka Sorong = 0,1 mm | Mikrometer = 0,01 mm | Stopwatch = 0,01 s | Termometer = 0,1 °C.',
      miskonsepsi: 'Miskonsepsi: Menganggap alat ukur digital bebas 100% dari kesalahan. Ketidaktelitian penempatan benda, baterai lemah, atau jeda respons tangan tetap memicu galat pengukuran.'
    },
    refleksi: {
      pertanyaan1: 'Mengapa mata pengamat harus memandang tepat tegak lurus pada permukaan skala mistar?',
      pertanyaan2: 'Kapan seorang insinyur harus memilih mikrometer sekrup daripada jangka sorong?',
      penerapanDuniaNyata: 'Kalibrasi alat ukur berkala di laboratorium uji standar (ISO 17025) wajib dilakukan demi menjamin keselamatan suku cadang pesawat dan keakuratan dosis obat.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Kesalahan yang terjadi akibat posisi mata pengamat tidak sejajar tegak lurus dengan jarum/garis skala disebut...',
        options: ['Kesalahan kalibrasi', 'Kesalahan paralaks (parallax error)', 'Kesalahan titik nol', 'Kesalahan toleransi mutlak'],
        correctAnswer: 1,
        explanation: 'Kesalahan paralaks terjadi ketika sudut pandang mata miring sehingga pembacaan skala bergeser dari nilai sebenarnya.'
      },
      {
        id: 'q2',
        question: 'Urutan alat ukur panjang dari yang ketelitiannya paling rendah ke paling tinggi adalah...',
        options: [
          'Mikrometer sekrup → Jangka sorong → Mistar',
          'Mistar (1 mm) → Jangka sorong (0,1 mm) → Mikrometer sekrup (0,01 mm)',
          'Jangka sorong → Mistar → Mikrometer sekrup',
          'Mistar → Mikrometer sekrup → Jangka sorong'
        ],
        correctAnswer: 1,
        explanation: 'Mistar memiliki ketelitian 1 mm, jangka sorong 0,1 mm, dan mikrometer sekrup paling presisi yaitu 0,01 mm.'
      },
      {
        id: 'q3',
        question: 'Pada pengukuran volume cairan menggunakan tabung reaksi, untuk menghindari kesalahan pembacaan meniskus cekung, mata harus sejajar dengan...',
        options: [
          'Bagian tepi atas cairan yang menempel di dinding tabung',
          'Dasar permukaan cekungan cairan yang paling rendah',
          'Tengah-tengah antara dasar dan tepi',
          'Sudut 45 derajat dari atas tabung'
        ],
        correctAnswer: 1,
        explanation: 'Untuk zat cair yang membasahi dinding (meniskus cekung seperti air), pembacaan yang benar adalah tepat di dasar kelengkungan cairan.'
      }
    ]
  },
  {
    id: 'jangka-sorong',
    slug: 'jangka-sorong',
    moduleId: 'modul-2',
    moduleTitle: 'Modul 2: Pengukuran',
    title: 'Membaca Jangka Sorong (Vernier Caliper)',
    shortDesc: 'Struktur anatomi, ketelitian 0,1 mm (0,01 cm), rahang atas/bawah, depth probe, dan latihan membaca skala.',
    iconName: 'Maximize2',
    fenomena: {
      cerita: 'Pierre Vernier pada tahun 1631 menciptakan jangka sorong untuk melipatgandakan ketelitian penggaris biasa hingga 10 kali lipat. Dengan satu alat, seorang mekanik dapat mengukur diameter luar baut, diameter dalam lubang pipa silinder, hingga kedalaman botol sempit menggunakan batang ekor khusus.',
      pertanyaan: 'Bagaimana kombinasi skala utama dan skala nonius menghasilkan pembacaan hingga 0,1 mm?',
      pilihanPrediksi: [
        'Skala nonius hanya hiasan angka acak.',
        'Skala nonius membagi 1 mm skala utama menjadi subdivisi yang lebih kecil, di mana garis nonius yang paling lurus berimpit menunjukkan nilai desimal tambahannya.',
        'Hasil pengukuran selalu merupakan perkalian antara skala atas dan skala bawah.',
        'Jangka sorong harus selalu diputar seperti sekrup.'
      ],
      pembahasanPrediksi: 'Tepat! Pembacaan jangka sorong menggunakan rumus: HP = Skala Utama + (Garis Nonius yang Berimpit × Ketelitian). Ketelitian alat adalah 0,1 mm (atau 0,01 cm).'
    },
    tujuan: [
      'Mengidentifikasi bagian jangka sorong: rahang bawah (luar), rahang atas (dalam), pengukur kedalaman (depth probe), skala utama, skala nonius, dan pengunci.',
      'Menghitung hasil pengukuran jangka sorong dengan rumus: HP = Skala Utama + Skala Nonius.',
      'Menyelesaikan contoh soal pengukuran diameter koin dan pipa secara mandiri.'
    ],
    simulasiType: 'jangka-sorong',
    defaultObservationRows: [
      { id: '1', percobaan: 'Contoh Soal PDF (Koin Rudi)', variabel: 'Skala Utama: 2,6 cm, Garis Nonius ke-6', hasil: 'HP = 2,6 + (6 × 0,01) = 2,66 cm', kesimpulan: 'Diameter koin Rudi adalah 2,66 cm (26,6 mm)' },
      { id: '2', percobaan: 'Pengukuran Gambar PDF 1', variabel: 'Skala Utama: 2,4 cm, Garis Nonius ke-7', hasil: 'HP = 2,4 + (7 × 0,01) = 2,47 cm', kesimpulan: 'Hasil terukur adalah 2,47 cm' },
      { id: '3', percobaan: 'Uji Mandiri Cincin Emas', variabel: 'Skala Utama: 1,8 cm, Garis Nonius ke-3', hasil: 'HP = 1,8 + 0,03 = 1,83 cm', kesimpulan: 'Diameter luar cincin 1,83 cm' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Bagaimana cara menentukan skala nonius yang benar?',
        clue: 'Cari satu garis pada skala nonius yang tepat lurus segaris (berimpit) dengan salah satu garis pada skala utama.'
      },
      {
        pertanyaan: 'Sebutkan fungsi rahang atas dan batang pengukur kedalaman (depth probe)!',
        clue: 'Rahang atas berfungsi mengukur diameter dalam (misal diameter dalam pipa), sedangkan depth probe di bagian ujung mengukur kedalaman bejana sempit.'
      }
    ],
    materiInti: {
      ringkasan: 'Jangka sorong (Vernier Caliper) diciptakan oleh ilmuwan Prancis Pierre Vernier dengan ketelitian mencapai 0,1 mm (0,01 cm). Memiliki rahang bawah (diameter luar), rahang atas (diameter dalam), dan ekor pengukur kedalaman.',
      poinPenting: [
        { judul: 'Anatomi Alat', isi: '1. Rahang bawah (luar), 2. Rahang atas (dalam), 3. Depth probe (kedalaman), 4. Skala utama rahang bawah (satuan cm/mm), 5. Skala nonius (skala geser tambahan), 6. Baut pengunci.' },
        { judul: 'Rumus Pembacaan', isi: 'Hasil Pengukuran (HP) = Skala Utama + Skala Nonius = Skala Utama + (Skala nonius berimpit × 0,01 cm).' },
        { judul: 'Langkah Praktis', isi: '1. Jepit objek di rahang, kunci baut. 2. Baca angka skala utama sebelum angka nol nonius. 3. Cari garis nonius yang berimpit tegak lurus dengan skala utama. 4. Kalikan garis nonius dengan ketelitian (0,01 cm atau 0,1 mm) lalu jumlahkan.' }
      ],
      rumusAtauKonsep: 'HP = Skala Utama + (n × 0,01 cm)  [atau dalam mm: Skala Utama mm + (n × 0,1 mm)]',
      miskonsepsi: 'Miskonsepsi: Mengalikan angka nonius dengan 0,1 cm padahal satuannya cm. Ingat: 0,1 mm = 0,01 cm!'
    },
    refleksi: {
      pertanyaan1: 'Mengapa baut pengunci harus diputar rapat sebelum membaca skala jangka sorong?',
      pertanyaan2: 'Bagaimana kamu mengukur ketebalan uang logam 500 rupiah vs kedalaman tutup botol menggunakan jangka sorong?',
      penerapanDuniaNyata: 'Di bengkel mesin bubut, jangka sorong digunakan setiap menit untuk memeriksa toleransi diameter poros engkol dan silinder mesin motor.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Pada pembacaan jangka sorong, skala utama menunjukkan 2,6 cm dan garis nonius ke-6 berimpit tepat dengan garis skala utama. Berapakah hasil pengukurannya?',
        options: ['2,60 cm', '2,66 cm', '3,20 cm', '2,06 cm'],
        correctAnswer: 1,
        explanation: 'HP = Skala Utama + Skala Nonius = 2,6 cm + (6 × 0,01 cm) = 2,6 cm + 0,06 cm = 2,66 cm.'
      },
      {
        id: 'q2',
        question: 'Bagian jangka sorong yang berada di ujung belakang dan digunakan untuk mengukur kedalaman bejana sempit adalah...',
        options: ['Rahang atas', 'Thimble', 'Pengukur kedalaman (depth probe)', 'Poros ratchet'],
        correctAnswer: 2,
        explanation: 'Depth probe (tangkai kedalaman) terletak di ujung jangka sorong untuk mengukur kedalaman tabung atau lubang sempit.'
      },
      {
        id: 'q3',
        question: 'Jika skala utama menunjukkan 3,4 cm dan garis skala nonius ke-5 berimpit, hasil pengukuran dalam satuan milimeter (mm) adalah...',
        options: ['3,45 mm', '34,5 mm', '39,0 mm', '345 mm'],
        correctAnswer: 1,
        explanation: '3,4 cm = 34 mm. Skala nonius = 5 × 0,1 mm = 0,5 mm. Total = 34 + 0,5 = 34,5 mm (atau 3,45 cm).'
      }
    ]
  },
  {
    id: 'mikrometer-sekrup',
    slug: 'mikrometer-sekrup',
    moduleId: 'modul-2',
    moduleTitle: 'Modul 2: Pengukuran',
    title: 'Membaca Mikrometer Sekrup (Micrometer Screw Gauge)',
    shortDesc: 'Struktur sleeve, thimble 50 bagian, ratchet presisi, ketelitian 0,01 mm (10⁻⁵ m), dan teknik pembacaan.',
    iconName: 'Disc',
    fenomena: {
      cerita: 'Bagaimana cara mengukur tebal sehelai kertas HVS atau diameter kawat tembaga tipis pada dinamo motor listrik yang ukurannya di bawah 1 milimeter? Mistar dan jangka sorong tidak cukup presisi untuk tugas ini. Mikrometer sekrup mampu mengukur hingga 0,01 mm — sepuluh kali lipat lebih teliti daripada jangka sorong!',
      pertanyaan: 'Bagaimana putaran sekrup pada thimble dapat memperbesar jarak mikroskopis sehingga dapat dibaca dengan mata telanjang?',
      pilihanPrediksi: [
        'Dengan menggunakan lensa pembesar laser elektrik di dalamnya.',
        'Prinsip sekrup mengubah jarak translasi kecil menjadi putaran silinder berskala 50 bagian, di mana 1 putaran penuh memajukan poros 0,5 mm.',
        'Mikrometer sekrup tidak menggunakan sekrup mekanik.',
        'Hasil pengukuran dibaca langsung tanpa menjumlahkan skala.'
      ],
      pembahasanPrediksi: 'Tepat! Setiap satu putaran mundur (50 skala thimble), skala utama bertambah 0,5 mm. Jadi 1 bagian skala putar = 0,5 mm / 50 = 0,01 mm (10⁻⁵ m).'
    },
    tujuan: [
      'Menjelaskan prinsip kerja mikrometer sekrup dan keunggulannya (ketelitian 0,01 mm).',
      'Mengidentifikasi bagian mikrometer sekrup: poros tetap, poros geser, sleeve (skala utama), thimble (skala putar), dan ratchet.',
      'Menghitung hasil pengukuran mikrometer sekrup: HP = Skala Utama + Skala Putar/Nonius.'
    ],
    simulasiType: 'mikrometer',
    defaultObservationRows: [
      { id: '1', percobaan: 'Contoh PDF Hal 13-14 (Gambar A)', variabel: 'Skala Utama: 5,5 mm, Skala Putar ke-30', hasil: 'HP = 5,5 + (30 × 0,01) = 5,5 + 0,30 = 5,80 mm', kesimpulan: 'Tebal benda terukur 5,80 mm' },
      { id: '2', percobaan: 'Contoh Soal Hal 14 (Gambar B)', variabel: 'Skala Utama: 1,5 mm, Skala Putar ke-30', hasil: 'HP = 1,5 + 0,30 = 1,80 mm', kesimpulan: 'Hasil pengukuran adalah 1,80 mm' },
      { id: '3', percobaan: 'Uji Kawat Tembaga Tipis', variabel: 'Skala Utama: 0,5 mm, Skala Putar ke-18', hasil: 'HP = 0,5 + 0,18 = 0,68 mm', kesimpulan: 'Diameter kawat 0,68 mm' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Apa fungsi bagian ratchet pada mikrometer sekrup?',
        clue: 'Ratchet diputar perlahan saat objek hampir terjepit untuk menghasilkan penekanan yang presisi dan seragam tanpa merusak objek atau merusak ulir alat.'
      },
      {
        pertanyaan: 'Perhatikan garis atas dan garis bawah pada sleeve skala utama! Apa perbedaannya?',
        clue: 'Garis atas menunjukkan bilangan bulat milimeter (1, 2, 3 mm...), sedangkan garis bawah menunjukkan nilai setengah milimeter (0,5 mm).'
      }
    ],
    materiInti: {
      ringkasan: 'Mikrometer sekrup memiliki tingkat ketelitian 0,01 mm (10⁻⁵ m), yaitu sepuluh kali lipat lebih teliti daripada jangka sorong. Digunakan untuk mengukur ketebalan pelat tipis dan diameter kawat.',
      poinPenting: [
        { judul: 'Prinsip Kerja', isi: 'Memperbesar translasi jarak kecil menjadi sudut putaran sekrup pada thimble. 1 putaran penuh (50 skala) = 0,5 mm pada sumbu utama. 1 skala thimble = 0,5 / 50 = 0,01 mm.' },
        { judul: 'Cara Penggunaan', isi: '1. Letakkan objek menempel poros tetap. 2. Putar thimble hingga mendekati objek. 3. Putar ratchet sampai berbunyi klik halus untuk tekanan presisi. 4. Kunci dan baca skala utama dan skala putar.' },
        { judul: 'Membaca Skala Utama', isi: 'Garis bagian atas menunjukkan angka bulat (1, 2, 3 mm...), garis bagian bawah menunjukkan nilai tengah (+0,5 mm jika garis bawah sudah terlewati).' },
        { judul: 'Membaca Skala Putar', isi: 'Cari garis skala thimble (0–50) yang lurus segaris dengan garis tengah skala utama. Kalikan nilai tersebut dengan 0,01 mm.' }
      ],
      rumusAtauKonsep: 'HP = Skala Utama + Skala Putar = [Angka atas + (0,5 mm jika tampak)] + (Skala Thimble × 0,01 mm)',
      miskonsepsi: 'Miskonsepsi: Lupa menambahkan 0,5 mm saat garis bawah skala utama sudah terlihat di samping angka atas. Contoh: Jika angka atas 5 mm dan garis bawah terlihat, skala utama adalah 5,5 mm, BUKAN 5,0 mm!'
    },
    refleksi: {
      pertanyaan1: 'Mengapa memutar ratchet lebih disarankan daripada memutar thimble secara paksa saat menjepit benda?',
      pertanyaan2: 'Jika kamu diminta mengukur diameter rambut manusia (~0,07 mm), alat ukur mana yang paling tepat?',
      penerapanDuniaNyata: 'Mikrometer sekrup menjadi standar wajib industri manufaktur piston mobil, bilah turbin jet, dan industri fabrikasi lempeng silikon semikonduktor.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Pada mikrometer sekrup, skala utama menunjukkan angka 1 mm di atas dan garis 0,5 mm di bawah terlihat jelas, serta skala nonius/putar menunjukkan angka 30. Hasil pengukurannya adalah...',
        options: ['1,30 mm', '1,80 mm', '1,50 mm', '4,50 mm'],
        correctAnswer: 1,
        explanation: 'Skala utama = 1 mm + 0,5 mm = 1,5 mm. Skala putar = 30 × 0,01 mm = 0,30 mm. Total = 1,5 + 0,30 = 1,80 mm.'
      },
      {
        id: 'q2',
        question: 'Ketelitian mikrometer sekrup adalah...',
        options: ['1 mm', '0,1 mm', '0,01 mm (10⁻⁵ m)', '0,001 mm'],
        correctAnswer: 2,
        explanation: 'Ketelitian mikrometer sekrup mencapai 0,01 mm atau setara dengan 10⁻⁵ meter.'
      },
      {
        id: 'q3',
        question: 'Jika thimble terdiri dari 50 skala dan satu putaran penuh menggeser poros sejauh 0,5 mm, maka nilai satu garis skala putar adalah...',
        options: ['0,1 mm', '0,05 mm', '0,01 mm', '0,005 mm'],
        correctAnswer: 2,
        explanation: '1 skala putar = 0,5 mm / 50 = 0,01 mm.'
      }
    ]
  },
  {
    id: 'hasil-pengukuran',
    slug: 'hasil-pengukuran',
    moduleId: 'modul-2',
    moduleTitle: 'Modul 2: Pengukuran',
    title: 'Hasil Pengukuran Tunggal & Berulang',
    shortDesc: 'Penentuan nilai rata-rata, rumus ketidakpastian mutlak (Δx dan Sx̄), dan ketidakpastian relatif (KR).',
    iconName: 'Calculator',
    fenomena: {
      cerita: 'Dalam penelitian fisika, mengukur satu kali (pengukuran tunggal) memiliki risiko galat acak yang tinggi. Oleh karena itu, ilmuwan melakukan pengukuran berulang beberapa kali. Namun, bagaimana cara menggabungkan 5 data pengukuran yang sedikit berbeda menjadi satu nilai ilmiah resmi beserta derajat kepastiannya?',
      pertanyaan: 'Bagaimana ilmuwan melaporkan hasil pengukuran berulang secara baku?',
      pilihanPrediksi: [
        'Cukup memilih angka yang paling besar di antara semua percobaan.',
        'Menghitung nilai rata-rata (x̄) dan ketidakpastian mutlak (Sx̄), lalu melaporkannya dalam bentuk (x̄ ± Sx̄).',
        'Mengalikan seluruh hasil pengukuran menjadi satu nilai total.',
        'Menghilangkan semua data yang memiliki desimal.'
      ],
      pembahasanPrediksi: 'Tepat! Pengukuran tunggal dilaporkan sebagai x ± Δx (dengan Δx = ½ × skala terkecil), sedangkan pengukuran berulang dilaporkan sebagai (x̄ ± Sx̄) dengan menghitung rata-rata dan deviasi standar ketidakpastian mutlak.'
    },
    tujuan: [
      'Membedakan langkah analisis pada pengukuran tunggal dan pengukuran berulang.',
      'Menghitung rata-rata (x̄ = Σx / n) dan ketidakpastian mutlak (Sx̄).',
      'Menghitung ketidakpastian relatif: KR = (Sx̄ / x̄) × 100% dan menuliskan hasil ukur dengan benar.'
    ],
    simulasiType: 'analisis-data',
    defaultObservationRows: [
      { id: '1', percobaan: 'Ukur ke-1', variabel: 'x₁ = 2,3 cm', hasil: 'x₁² = 5,29', kesimpulan: 'Data titik 1' },
      { id: '2', percobaan: 'Ukur ke-2', variabel: 'x₂ = 2,5 cm', hasil: 'x₂² = 6,25', kesimpulan: 'Data titik 2' },
      { id: '3', percobaan: 'Ukur ke-3', variabel: 'x₃ = 2,4 cm', hasil: 'x₃² = 4,76 (dibulatkan dari 5,76)', kesimpulan: 'Data titik 3' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Tuliskan rumus ketidakpastian mutlak untuk pengukuran tunggal!',
        clue: 'Δx = ½ × skala terkecil alat ukur.'
      },
      {
        pertanyaan: 'Tuliskan rumus ketidakpastian mutlak untuk pengukuran berulang (Sx̄)!',
        clue: 'Sx̄ = (1/n) × √[ (n·Σx² - (Σx)²) / (n - 1) ].'
      }
    ],
    materiInti: {
      ringkasan: 'Hasil pengukuran dikelompokkan menjadi pengukuran tunggal dan pengukuran berulang. Masing-masing memiliki metode penentuan nilai terbaik dan ketidakpastian yang berbeda.',
      poinPenting: [
        { judul: 'Pengukuran Tunggal', isi: 'Hanya dilakukan satu kali. Nilai terbaik adalah nilai hasil ukur itu sendiri (x). Ketidakpastian mutlak: Δx = ½ × skala terkecil alat ukur. Contoh termometer dengan skala 1°C: Hasil = (28 ± 0,5)°C.' },
        { judul: 'Pengukuran Berulang - Rata-rata', isi: 'Nilai terbaik adalah nilai rata-rata: x̄ = Σx / n.' },
        { judul: 'Ketidakpastian Mutlak Berulang', isi: 'Sx̄ = (1/n) × √[ (n·Σx² - (Σx)²) / (n - 1) ]. Nilai di dalam akar secara matematis selalu non-negatif jika data dihitung dengan kuadrat eksak.' },
        { judul: 'Ketidakpastian Relatif (KR)', isi: 'KR = (Sx̄ / x̄) × 100%. Tingkat KR menentukan jumlah angka penting penulisan laporan akhir: KR ~ 10% → 2 AP, KR ~ 1% → 3 AP, KR ~ 0,1% → 4 AP.' }
      ],
      rumusAtauKonsep: 'Pelaporan Berulang: (x̄ ± Sx̄) [satuan]. KR = (Sx̄ / x̄) × 100%. Catatan PDF Hal 15-16: Contoh soal PDF menunjukkan hasil (2.36 ± 0.12) m dengan KR = 5.2% (2 AP).',
      miskonsepsi: 'Koreksi Ilmiah PDF: Di halaman 15 PDF terdapat contoh perhitungan yang menghasilkan nilai negatif di dalam akar lalu ditulis "dimutlakkan". Secara matematis menurut Teorema Cauchy-Schwarz, (n·Σx² - (Σx)²) TIDAK PERNAH bernilai negatif bila data asli dikuadratkan dengan benar! Simulator kami menghitung rumus ini secara presisi dan matematis benar.'
    },
    refleksi: {
      pertanyaan1: 'Mengapa melakukan 5 kali pengukuran berulang lebih dapat dipercaya daripada 1 kali pengukuran?',
      pertanyaan2: 'Jika ketidakpastian relatif (KR) sebuah pengukuran bernilai 0,1%, apa artinya bagi kualitas pengukuran tersebut?',
      penerapanDuniaNyata: 'Pengujian kekuatan tarik beton jembatan dan kadar bahan aktif obat di laboratorium BPOM selalu menggunakan pengukuran berulang 5 hingga 10 kali demi menjamin presisi tinggi.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Pada pengukuran tunggal menggunakan mistar dengan skala terkecil 1 mm, ketidakpastian mutlaknya (Δx) adalah...',
        options: ['1 mm', '0,5 mm (0,05 cm)', '0,1 mm', '0,01 mm'],
        correctAnswer: 1,
        explanation: 'Untuk pengukuran tunggal: Δx = ½ × skala terkecil = ½ × 1 mm = 0,5 mm (0,05 cm).'
      },
      {
        id: 'q2',
        question: 'Rumus untuk mencari nilai rata-rata hasil pengukuran berulang adalah...',
        options: ['x̄ = Σx × n', 'x̄ = (Jumlah hasil pengukuran) / (banyaknya percobaan)', 'x̄ = n / Σx²', 'x̄ = Σx² - Σx'],
        correctAnswer: 1,
        explanation: 'Nilai rata-rata adalah total seluruh hasil pengukuran dibagi dengan banyaknya pengulangan (x̄ = Σx / n).'
      },
      {
        id: 'q3',
        question: 'Jika nilai rata-rata x̄ = 2,36 m dan ketidakpastian mutlak Sx̄ = 0,12 m, cara penulisan hasil pengukuran ilmiah yang benar adalah...',
        options: ['(2,36 × 0,12) m', '(2,36 ± 0,12) m', '2,36 m saja', '(2,36 / 0,12)%'],
        correctAnswer: 1,
        explanation: 'Penulisan resmi hasil pengukuran berulang selalu dalam format: (x̄ ± Sx̄) satuan, yaitu (2,36 ± 0,12) m.'
      }
    ]
  },
  {
    id: 'toleransi-pengukuran',
    slug: 'toleransi-pengukuran',
    moduleId: 'modul-2',
    moduleTitle: 'Modul 2: Pengukuran',
    title: 'Toleransi Pengukuran',
    shortDesc: 'Batas penyimpangan yang dapat diterima dari nilai standar pada kontrol kualitas dan eksperimen.',
    iconName: 'ShieldAlert',
    fenomena: {
      cerita: 'Sebuah pabrik farmasi memproduksi botol cairan sirup dengan panjang standar 10,00 cm dengan batas toleransi ± 0,05 cm. Jika sebuah botol hasil cetakan memiliki panjang 10,04 cm, botol tersebut lolos kendali mutu (quality control). Namun jika botol berukuran 10,08 cm, botol langsung ditolak oleh mesin sortir.',
      pertanyaan: 'Mengapa toleransi pengukuran sangat penting dalam dunia industri dan produksi massal?',
      pilihanPrediksi: [
        'Karena tidak ada proses manufaktur yang 100% sempurna tanpa sedikit penyimpangan.',
        'Agar pabrik bisa menjual barang rusak secara sengaja.',
        'Karena alat ukur tidak memiliki angka pasti.',
        'Toleransi hanya digunakan jika pabrik kehabisan bahan baku.'
      ],
      pembahasanPrediksi: 'Tepat! Setiap proses pengukuran dan manufaktur tidak pernah sempurna; selalu ada sedikit perbedaan. Selama deviasi masih berada di dalam rentang ambang batas toleransi (rentang aman), produk dianggap layak dan dapat diterima.'
    },
    tujuan: [
      'Menjelaskan definisi toleransi pengukuran sebagai batas penyimpangan yang masih dapat diterima.',
      'Menghitung panjang/dimensi minimal dan maksimal yang masih memenuhi toleransi standar.',
      'Menganalisis status kelayakan (lolos/tolak) hasil pengukuran berdasarkan kriteria batas toleransi.'
    ],
    simulasiType: 'toleransi',
    defaultObservationRows: [
      { id: '1', percobaan: 'Botol Farmasi Standar', variabel: '10,00 cm ± 0,05 cm', hasil: 'Rentang diterima: 9,95 cm s.d. 10,05 cm', kesimpulan: 'Batas bawah = 9,95 cm, Batas atas = 10,05 cm' },
      { id: '2', percobaan: 'Sampel Botol A (10,02 cm)', variabel: 'Uji QC Sampel 1', hasil: 'Berada di dalam rentang [9,95 - 10,05]', kesimpulan: 'STATUS: Lolos Toleransi (Layak Diterima)' },
      { id: '3', percobaan: 'Sampel Botol B (10,08 cm)', variabel: 'Uji QC Sampel 2', hasil: 'Melebihi batas atas (10,08 > 10,05)', kesimpulan: 'STATUS: Ditolak (Di Luar Ambang Wajar)' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Bagaimana cara menentukan batas minimal dan maksimal dari spesifikasi standar L ± ΔL?',
        clue: 'Nilai minimal = L - ΔL, dan Nilai maksimal = L + ΔL.'
      },
      {
        pertanyaan: 'Mengapa penting menuliskan toleransi pengukuran pada hasil uji teknis?',
        clue: 'Agar kita dapat meninjau apakah hasil pengukuran berada pada ambang wajar atau cacat produk.'
      }
    ],
    materiInti: {
      ringkasan: 'Toleransi pengukuran adalah batas penyimpangan yang masih dapat diterima dari suatu hasil pengukuran terhadap nilai sebenarnya atau nilai standar yang diinginkan.',
      poinPenting: [
        { judul: 'Definisi Toleransi', isi: 'Batas penyimpangan yang masih dianggap aman atau masuk akal untuk tujuan tertentu, baik dalam eksperimen sains, manufaktur, maupun kontrol kualitas.' },
        { judul: 'Contoh Nyata dari PDF', isi: 'Perusahaan farmasi memproduksi botol cairan dengan panjang standar 10,00 cm ± 0,05 cm. Artinya: Panjang minimal yang masih diterima = 9,95 cm; Panjang maksimal yang masih diterima = 10,05 cm.' },
        { judul: 'Kriteria Kelayakan', isi: 'Jika hasil pengukuran berada dalam rentang [X_min, X_max], maka hasil memenuhi toleransi. Jika di luar rentang, hasil tidak layak diterima.' }
      ],
      rumusAtauKonsep: 'Rentang Toleransi = [X_standar - Toleransi, X_standar + Toleransi]. Jika X_ukur ∈ [X_min, X_max] → Layak.',
      miskonsepsi: 'Miskonsepsi: Menganggap bahwa produk dengan ukuran sedikit berbeda dari nilai nominal otomatis cacat. Asalkan perbedaannya masih di dalam batas toleransi, fungsi produk tetap terjamin sempurna.'
    },
    refleksi: {
      pertanyaan1: 'Apa bahaya yang timbul jika produsen baut roda pesawat terbang tidak menerapkan batas toleransi yang ketat?',
      pertanyaan2: 'Bagaimana hubungan antara ketelitian alat ukur yang digunakan dengan toleransi yang ditetapkan?',
      penerapanDuniaNyata: 'Industri kedirgantaraan, otomotif, dan perakitan mikroprosesor mengandalkan toleransi mikrometer (± 0,001 mm) agar komponen saling pas dan presisi saat dirakit.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Sebuah komponen tabung diproduksi dengan standar panjang 10,00 cm ± 0,05 cm. Berapakah panjang minimal yang masih dapat diterima?',
        options: ['9,50 cm', '9,95 cm', '10,05 cm', '10,50 cm'],
        correctAnswer: 1,
        explanation: 'Panjang minimal = 10,00 cm - 0,05 cm = 9,95 cm.'
      },
      {
        id: 'q2',
        question: 'Jika hasil pengukuran komponen dari soal di atas adalah 10,07 cm, kesimpulan yang benar adalah...',
        options: [
          'Memenuhi toleransi karena hanya beda sedikit',
          'Tidak memenuhi toleransi (ditolak) karena melebihi batas maksimal 10,05 cm',
          'Memenuhi toleransi karena lebih besar dari 9,95 cm',
          'Nilai pengukuran harus dipangkatkan dua terlebih dahulu'
        ],
        correctAnswer: 1,
        explanation: 'Batas maksimal adalah 10,05 cm. Karena 10,07 cm > 10,05 cm, komponen tersebut berada di luar batas toleransi.'
      },
      {
        id: 'q3',
        question: 'Fungsi utama dari penulisan toleransi pengukuran dalam industri adalah...',
        options: [
          'Menghilangkan kebutuhan akan kalibrasi alat ukur',
          'Meninjau apakah hasil pengukuran yang dilakukan masih berada pada ambang wajar atau tidak',
          'Menyederhanakan angka menjadi bilangan bulat',
          'Mengubah sifat kimia bahan'
        ],
        correctAnswer: 1,
        explanation: 'Toleransi menunjukkan batas wajar perbedaan hasil pengukuran yang masih aman dan layak diterima untuk fungsi produk.'
      }
    ]
  },
  {
    id: 'angka-penting-notasi',
    slug: 'angka-penting-notasi',
    moduleId: 'modul-2',
    moduleTitle: 'Modul 2: Pengukuran',
    title: 'Angka Penting, Pembulatan, & Notasi Ilmiah',
    shortDesc: '5 aturan angka penting, aturan pembulatan ≥ 5, dan notasi ilmiah (a × 10ⁿ) untuk bilangan besar/kecil.',
    iconName: 'Hash',
    fenomena: {
      cerita: 'Kecepatan cahaya di ruang hampa adalah 300.000.000 m/s. Jika ditulis berulang kali dalam laporan, angka nol sebanyak itu mudah sekali salah tulis. Di sisi lain, massa sebuah bakteri adalah 0,000000001 gram. Bagaimana fisikawan menyederhanakan angka ekstrim ini secara ringkas tanpa kehilangan tingkat ketelitian aslinya?',
      pertanyaan: 'Bagaimana aturan notasi ilmiah dan angka penting menjaga ketelitian tanpa menambahkan ketepatan palsu?',
      pilihanPrediksi: [
        'Dengan menghapus semua angka di belakang koma secara acak.',
        'Menggunakan aturan baku notasi ilmiah (a × 10ⁿ) dengan 1 ≤ a < 10 dan menentukan jumlah angka penting yang sahih.',
        'Dengan selalu menambahkan angka nol di ujungnya agar tampak pintar.',
        'Angka penting tidak memiliki aturan yang pasti.'
      ],
      pembahasanPrediksi: 'Tepat! Angka penting menunjukkan ketelitian alat ukur. Pembulatan menjaga ketelitian tanpa ketepatan palsu, dan notasi ilmiah (a × 10ⁿ) meringkas angka ekstrim seperti 300.000.000 m/s menjadi 3 × 10⁸ m/s.'
    },
    tujuan: [
      'Menerapkan 5 aturan penentuan angka penting sesuai materi PDF.',
      'Melakukan pembulatan angka (≥ 5 ke atas, < 5 tetap) secara konsisten.',
      'Mengubah bilangan sangat besar atau sangat kecil ke bentuk notasi ilmiah a × 10ⁿ (dengan 1 ≤ a < 10).'
    ],
    simulasiType: 'angka-penting',
    defaultObservationRows: [
      { id: '1', percobaan: 'Aturan 1 & 2', variabel: '12,34 & 205', hasil: '12,34 → 4 AP | 205 → 3 AP', kesimpulan: 'Semua bukan nol & nol di antara bukan nol adalah AP' },
      { id: '2', percobaan: 'Aturan 3 & 4', variabel: '0,045 & 2,300', hasil: '0,045 → 2 AP (4 dan 5) | 2,300 → 4 AP', kesimpulan: 'Nol depan bukan AP, nol belakang desimal adalah AP' },
      { id: '3', percobaan: 'Notasi Ilmiah PDF', variabel: '300.000.000 & 0,00651', hasil: '3 × 10⁸ m/s & 6,51 × 10⁻³', kesimpulan: 'Angka pokok 1 ≤ a < 10 dengan pangkat bulat n' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Berapa jumlah angka penting pada bilangan 1500 vs 1500. (dengan titik desimal)?',
        clue: '1500 memiliki 2 AP (1 dan 5), sedangkan 1500. memiliki 4 AP karena ada tanda desimal.'
      },
      {
        pertanyaan: 'Sebutkan aturan umum pembulatan angka!',
        clue: 'Jika angka di belakang angka terakhir ≥ 5 dibulatkan ke atas; jika < 5 dibulatkan tetap.'
      }
    ],
    materiInti: {
      ringkasan: 'Angka penting mencakup semua angka yang diyakini benar ditambah satu angka taksiran terakhir. Notasi ilmiah mempermudah penulisan bilangan sangat besar atau sangat kecil.',
      poinPenting: [
        { judul: 'Aturan 1', isi: 'Semua angka bukan nol adalah angka penting. Contoh: 12,34 (4 AP), 528 (3 AP).' },
        { judul: 'Aturan 2', isi: 'Angka nol di antara angka bukan nol adalah angka penting. Contoh: 205 (3 AP), 1002 (4 AP).' },
        { judul: 'Aturan 3', isi: 'Angka nol di depan angka bukan nol TIDAK termasuk angka penting. Contoh: 0,045 (2 AP: 4 dan 5), 0,0032 (2 AP: 3 dan 2).' },
        { judul: 'Aturan 4', isi: 'Angka nol di belakang angka bukan nol (setelah tanda koma) ADALAH angka penting. Contoh: 2,300 (4 AP), 0,0500 (3 AP).' },
        { judul: 'Aturan 5', isi: 'Angka nol sebelum koma pada bilangan bulat tidak penting kecuali ada tanda desimal. Contoh: 1500 (2 AP), 1500. (4 AP).' },
        { judul: 'Aturan Pembulatan', isi: 'Jika angka di belakang angka terakhir ≥ 5 → dibulatkan ke atas (contoh 12,46 → 12,5; 3,675 → 3,68). Jika < 5 → dibulatkan tetap (contoh 7,42 → 7,4; 9,634 → 9,63).' },
        { judul: 'Notasi Ilmiah', isi: 'Bentuk umum: a × 10ⁿ, dengan 1 ≤ a < 10. Pangkat n > 0 untuk bilangan besar (1.000.000.000 = 1 × 10⁹). Pangkat n < 0 untuk bilangan kecil (0,00651 = 6,51 × 10⁻³).' }
      ],
      rumusAtauKonsep: 'Notasi Ilmiah: a × 10ⁿ  (1 ≤ a < 10). Kecepatan cahaya: 300.000.000 m/s = 3 × 10⁸ m/s.',
      miskonsepsi: 'Koreksi Satuan PDF: Pada PDF halaman 8 tertulis kecepatan cahaya "300.000.000 m/s²", yang merupakan ketik salah satuan percepatan. Kecepatan cahaya yang benar adalah 300.000.000 m/s (meter per sekon).'
    },
    refleksi: {
      pertanyaan1: 'Mengapa menulis 2,300 cm memiliki makna ketelitian yang lebih tinggi daripada menulis 2,3 cm?',
      pertanyaan2: 'Bagaimana notasi ilmiah membantu astronom menghitung jarak antargalaksi dalam tahun cahaya?',
      penerapanDuniaNyata: 'Sistem komputerisasi GPS navigasi satelit mengandalkan notasi ilmiah dan aturan angka penting untuk menghitung koordinat lokasi hingga presisi centimeter.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Berapakah jumlah angka penting pada hasil pengukuran 0,0500 gram?',
        options: ['1 angka penting', '2 angka penting', '3 angka penting', '5 angka penting'],
        correctAnswer: 2,
        explanation: 'Nol di depan bukan AP, sedangkan angka 5 dan dua angka nol di belakang desimal adalah AP (total 3 AP: 5, 0, 0).'
      },
      {
        id: 'q2',
        question: 'Bilangan 0,00651 jika diubah menjadi notasi ilmiah yang tepat sesuai aturan adalah...',
        options: ['651 × 10⁻⁵', '65,1 × 10⁻⁴', '6,51 × 10⁻³', '0,651 × 10⁻²'],
        correctAnswer: 2,
        explanation: 'Aturan notasi ilmiah mengharuskan angka pokok 1 ≤ a < 10, sehingga koma digeser 3 langkah ke kanan menjadi 6,51 × 10⁻³.'
      },
      {
        id: 'q3',
        question: 'Jika angka 3,675 dibulatkan menjadi 2 tempat desimal di belakang koma, hasilnya adalah...',
        options: ['3,67', '3,68', '3,70', '3,60'],
        correctAnswer: 1,
        explanation: 'Karena angka di belakang angka terakhir adalah 5 (≥ 5), maka dibulatkan ke atas menjadi 3,68.'
      }
    ]
  },

  // MODUL 3
  {
    id: 'perubahan-fisika',
    slug: 'perubahan-fisika',
    moduleId: 'modul-3',
    moduleTitle: 'Modul 3: Perubahan Materi',
    title: 'Perubahan Fisika',
    shortDesc: 'Siklus 6 perubahan wujud (menerima/melepas kalor), perubahan bentuk & pemuaian, pelarutan, dan ekstraksi.',
    iconName: 'Snowflake',
    fenomena: {
      cerita: 'Pernahkah kamu lupa memasukkan mentega ke dalam lemari pendingin? Setelah beberapa saat, mentega yang semula padat meleleh menjadi cair di atas meja. Namun ketika kamu memasukkannya kembali ke kulkas, mentega memadat kembali dengan rasa dan kandungan yang sama persis.',
      pertanyaan: 'Mengapa mentega yang meleleh lalu memadat kembali tidak menghasilkan zat baru?',
      pilihanPrediksi: [
        'Karena mentega tidak memiliki molekul kimia.',
        'Karena peristiwa tersebut adalah perubahan fisika yang bersifat reversible (dapat kembali ke wujud semula) tanpa mengubah identitas zat.',
        'Karena perubahan wujud selalu menghilangkan massa zat.',
        'Mentega sebenarnya telah berubah menjadi senyawa racun.'
      ],
      pembahasanPrediksi: 'Tepat! Perubahan fisika adalah perubahan zat yang tidak mengubah sifat asli zat tersebut, tidak menghasilkan zat baru, dan bersifat dapat kembali ke bentuk semula (reversible).'
    },
    tujuan: [
      'Menjelaskan definisi perubahan fisika dan sifat reversibilitasnya.',
      'Memetakan siklus 6 perubahan wujud berdasarkan penyerapan dan pelepasan kalor.',
      'Mengklasifikasikan larutan menjadi encer, pekat, dan jenuh, serta menjelaskan konsep ekstraksi (pembuatan kopi).'
    ],
    simulasiType: 'perubahan-wujud',
    defaultObservationRows: [
      { id: '1', percobaan: 'Pemanasan Es Batu', variabel: 'Menerima Kalor (+Q)', hasil: 'Mencair (padat → cair), menguap (cair → gas), menyublim (padat → gas)', kesimpulan: 'Proses endotermik / menyerap energi kalor' },
      { id: '2', percobaan: 'Pendinginan Uap Air', variabel: 'Melepas Kalor (-Q)', hasil: 'Mengembun (gas → cair), membeku (cair → padat), deposisi (gas → padat)', kesimpulan: 'Proses eksotermik / melepaskan energi kalor' },
      { id: '3', percobaan: 'Pembuatan Larutan Gula', variabel: 'Kelarutan solut dalam solvent', hasil: 'Larutan encer → larutan pekat → larutan jenuh (gula tak larut lagi)', kesimpulan: 'Pelarutan bersifat fisik dan reversible (air dapat diuapkan kembali)' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Sebutkan 3 perubahan wujud yang MENERIMA kalor dan 3 yang MELEPAS kalor sesuai diagram segitiga PDF!',
        clue: 'Menerima kalor (panah merah): mencair, menguap, sublimasi. Melepas kalor (panah biru): membeku, mengembun, deposisi (mengkristal).'
      },
      {
        pertanyaan: 'Apa perbedaan larutan encer, larutan pekat, dan larutan jenuh?',
        clue: 'Encer: zat terlarut sedikit; Pekat: zat terlarut relatif banyak; Jenuh: tidak mampu lagi melarutkan zat terlarut pada suhu tertentu.'
      }
    ],
    materiInti: {
      ringkasan: 'Perubahan fisika adalah perubahan zat yang tidak mengubah sifat asli zat tersebut serta tidak menghasilkan zat baru dan dapat kembali ke wujud semula (reversible).',
      poinPenting: [
        { judul: 'Perubahan Wujud', isi: 'Segitiga wujud zat: Menerima kalor (panah merah): mencair, menguap, menyublim. Melepas kalor (panah biru): membeku, mengembun, deposisi/mengkristal.' },
        { judul: 'Perubahan Bentuk & Pemuaian', isi: 'Perubahan akibat suhu atau tekanan, misalnya pemuaian rel kereta api karena panas matahari atau pengolahan kayu menjadi kursi meja.' },
        { judul: 'Pelarutan', isi: 'Pencampuran zat terlarut (solute) dan pelarut (solvent) menghasilkan campuran homogen. Terbagi menjadi: 1. Larutan encer, 2. Larutan pekat, 3. Larutan jenuh (tidak mampu lagi melarutkan zat terlarut pada suhu tertentu).' },
        { judul: 'Ekstraksi', isi: 'Pengeluaran senyawa-senyawa (analit) dari sebuah sampel menggunakan media pelarut yang sesuai. Contoh klasik: penyeduhan kopi atau ekstraksi teh dengan air panas.' }
      ],
      rumusAtauKonsep: 'Perubahan Fisika: Sifat asli tetap | Tidak ada zat baru | Reversible | Q_serap (mencair, menguap, menyublim) vs Q_lepas (membeku, mengembun, deposisi).',
      miskonsepsi: 'Miskonsepsi: Menganggap pembuatan kopi adalah perubahan kimia. Melarutkan senyawa rasa dan kafein dari serbuk kopi ke air panas adalah proses fisis ekstraksi pelarutan!'
    },
    refleksi: {
      pertanyaan1: 'Mengapa kapur barus di dalam lemari lama-kelamaan mengecil dan habis tanpa meninggalkan genangan air?',
      pertanyaan2: 'Mengapa kaca jendela rumah dipasang dengan sedikit celah longgar pada bingkainya?',
      penerapanDuniaNyata: 'Teknologi distilasi minyak atsiri parfum berbasis ekstraksi uap air, dan siklus refrigeran freon di AC mobil memanfaatkan perubahan wujud cair-gas.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Kelompok perubahan wujud berikut yang seluruhnya MENERIMA / MEMBUTUHKAN kalor adalah...',
        options: [
          'Membeku, mengembun, dan deposisi',
          'Mencair, menguap, dan menyublim',
          'Membeku, mencair, dan menguap',
          'Mengembun, menyublim, dan membeku'
        ],
        correctAnswer: 1,
        explanation: 'Sesuai diagram PDF: panah merah menandakan zat menerima kalor, yaitu mencair, menguap, dan menyublim.'
      },
      {
        id: 'q2',
        question: 'Larutan yang sudah berada dalam kondisi tidak mampu lagi melarutkan zat terlarut tambahan pada suhu tertentu disebut...',
        options: ['Larutan encer (dilute)', 'Larutan pekat (concentrated)', 'Larutan jenuh (saturated solution)', 'Larutan suspensi'],
        correctAnswer: 2,
        explanation: 'Larutan jenuh adalah kondisi kesetimbangan di mana pelarut tidak dapat lagi melarutkan zat terlarut tambahan pada suhu tersebut.'
      },
      {
        id: 'q3',
        question: 'Proses pembuatan minuman kopi dengan menyeduh bubuk kopi menggunakan air panas merupakan contoh perubahan fisika jenis...',
        options: ['Sublimasi', 'Ekstraksi', 'Korosi', 'Fermentasi'],
        correctAnswer: 1,
        explanation: 'Ekstraksi adalah pengeluaran analit dari sampel menggunakan pelarut yang sesuai, seperti ekstraksi senyawa kopi oleh air panas.'
      }
    ]
  },
  {
    id: 'perubahan-kimia',
    slug: 'perubahan-kimia',
    moduleId: 'modul-3',
    moduleTitle: 'Modul 3: Perubahan Materi',
    title: 'Perubahan Kimia: Pembakaran & Korosi',
    shortDesc: 'Reaksi irreversible menghasilkan zat baru, pembakaran dengan oksidan, dan 5 faktor percepatan korosi.',
    iconName: 'Zap',
    fenomena: {
      cerita: 'Pagar besi yang baru dicat mengkilap kokoh di depan rumah. Namun setelah beberapa bulan terkena hujan asam dan udara laut yang lembap, muncul bercak serbuk cokelat kemerah-merahan yang rapuh dan mengelupas. Besi tersebut telah berkarat dan tidak bisa diubah kembali menjadi besi murni hanya dengan cara didinginkan.',
      pertanyaan: 'Mengapa karat besi tergolong perubahan kimia dan bukan perubahan fisika?',
      pilihanPrediksi: [
        'Karena besi hanya berubah bentuk menjadi serbuk tanpa reaksi.',
        'Karena besi bereaksi dengan oksigen dan air menghasilkan senyawa baru (besi oksida) yang sifatnya berbeda dan tidak dapat kembali ke bentuk semula (irreversible).',
        'Karena karat besi bisa menguap menjadi gas.',
        'Karena berat besi berkurang menjadi nol.'
      ],
      pembahasanPrediksi: 'Tepat! Perubahan kimia menghasilkan zat baru dengan ikatan kimia dan sifat berbeda serta bersifat irreversible (tidak dapat kembali ke wujud awal). Reaksi pembakaran dan korosi adalah dua contoh utamanya.'
    },
    tujuan: [
      'Menjelaskan karakteristik perubahan kimia (menghasilkan zat baru, sifat berbeda, irreversible).',
      'Mendeskripsikan reaksi pembakaran antara bahan mudah terbakar dan oksidan.',
      'Menganalisis 5 faktor yang mempercepat laju korosi: kelembapan, keasaman (pH < 7), elektrolit, suhu tinggi, dan kontak galvanik (galvanic coupling).'
    ],
    simulasiType: 'korosi-reaksi',
    defaultObservationRows: [
      { id: '1', percobaan: 'Paku Besi di Udara Kering', variabel: 'Tanpa air (kelembapan 0%)', hasil: 'Paku tetap bersih mengkilap, tidak ada karat', kesimpulan: 'Oksigen saja tanpa air tidak memicu korosi cepat' },
      { id: '2', percobaan: 'Paku Besi di Air Garam (Elektrolit)', variabel: 'Keberadaan ion elektrolit', hasil: 'Karat cokelat kemerahan muncul sangat cepat dan tebal', kesimpulan: 'Elektrolit menghantarkan elektron bebas dan mempercepat korosi' },
      { id: '3', percobaan: 'Paku Besi + Larutan Asam (pH < 7)', variabel: 'Lingkungan asam', hasil: 'Terjadi pelepasan gas hidrogen dan korosi sangat agresif', kesimpulan: 'pH asam (< 7) mempercepat oksidasi logam' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Jelaskan peran logam sebagai reduktor dalam proses pengkaratan!',
        clue: 'Pada proses oksidasi, logam berkedudukan sebagai reduktor yang mengalami oksidasi bereaksi dengan oksigen dan air menghasilkan oksida logam berwarna cokelat kemerahan.'
      },
      {
        pertanyaan: 'Apa yang dimaksud dengan galvanic coupling pada faktor percepatan korosi?',
        clue: 'Ketika besi bersih menempel pada besi yang telah berkarat (atau kontak dengan logam berpotensial beda), besi bersih akan teroksidasi lebih cepat karena aliran elektron.'
      }
    ],
    materiInti: {
      ringkasan: 'Perubahan kimia adalah perubahan zat yang menghasilkan zat baru dengan sifat yang berbeda dari zat asalnya dan tidak dapat dikembalikan ke bentuk semula (irreversible).',
      poinPenting: [
        { judul: 'Pembakaran', isi: 'Reaksi kimia antara zat yang mudah terbakar dengan suatu oksidan (oksigen) yang menghasilkan panas dan zat baru (seperti gas CO₂ dan abu).' },
        { judul: 'Korosi (Pengkaratan)', isi: 'Reaksi oksidasi logam dengan oksigen, air, atau zat asam. Logam bertindak sebagai reduktor yang teroksidasi membentuk oksida berwarna cokelat kemerahan.' },
        { judul: '5 Faktor Percepatan Korosi', isi: '1. Kelembapan (konsentrasi uap air tinggi). 2. Keasaman (pH < 7 mempercepat laju reaksi). 3. Keberadaan elektrolit (menghantarkan elektron bebas antara anode-katode). 4. Suhu tinggi (menaikkan laju reaksi oksidasi). 5. Galvanic coupling (kontak antarlogam berbeda potensial mempercepat aliran elektron).' }
      ],
      rumusAtauKonsep: 'Korosi Besi: 4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O (Karat besi cokelat kemerahan). Perubahan Kimia = Irreversible + Zat Baru.',
      miskonsepsi: 'Miskonsepsi: Menganggap cat pada pagar hanya untuk keindahan. Lapisan cat adalah pelindung fisis utama yang memutus kontak langsung antara logam besi dengan uap air dan oksigen!'
    },
    refleksi: {
      pertanyaan1: 'Mengapa mobil yang berada di daerah pantai dekat air laut lebih cepat keropos dan berkarat dibandingkan di daerah pegunungan kering?',
      pertanyaan2: 'Bagaimana metode proteksi katodik (anoda korban) melindungi lambung kapal laut dari pengkaratan?',
      penerapanDuniaNyata: 'Pencegahan korosi pada pipa minyak bawah laut, jembatan baja kabel selat, dan tangki reaktor industri kimia menghemat miliaran rupiah biaya perawatan.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Dua ciri utama perubahan kimia yang membedakannya dari perubahan fisika adalah...',
        options: [
          'Dapat kembali ke bentuk semula dan tidak membutuhkan kalor',
          'Menghasilkan zat baru dengan sifat berbeda dan bersifat irreversible',
          'Hanya terjadi pada wujud gas dan tidak memiliki massa',
          'Dapat dipisahkan dengan saringan kertas biasa'
        ],
        correctAnswer: 1,
        explanation: 'Perubahan kimia menghasilkan ikatan molekul baru (zat baru) dengan sifat berbeda dan tidak dapat kembali ke bentuk semula (irreversible).'
      },
      {
        id: 'q2',
        question: 'Di antara kondisi berikut, manakah yang PALING CEPAT memicu proses korosi pada paku besi?',
        options: [
          'Tabung tertutup berisi udara kering dengan silika gel',
          'Paku dicelupkan ke dalam minyak goreng murni',
          'Paku berada di lingkungan air garam (elektrolit) bersuhu hangat dengan kelembapan tinggi',
          'Paku disimpan di dalam lemari es hampa udara'
        ],
        correctAnswer: 2,
        explanation: 'Air garam menyediakan ion elektrolit yang menghantarkan elektron, ditambah kelembapan dan suhu hangat yang mempercepat reaksi oksidasi.'
      },
      {
        id: 'q3',
        question: 'Peristiwa galvanic coupling mempercepat korosi karena...',
        options: [
          'Logam bersih menempel pada logam berkarat sehingga menerima aliran elektron yang memicu oksidasi',
          'Kadar nitrogen di udara mendadak habis',
          'Menurunkan suhu sistem hingga titik beku air',
          'Mencegah oksigen menyentuh permukaan logam'
        ],
        correctAnswer: 0,
        explanation: 'Kontak antara dua logam dengan beda potensial (atau kontak dengan bagian yang sudah terkorosi) menciptakan sel galvanik mikro yang mengalirkan elektron.'
      }
    ]
  },
  {
    id: 'perubahan-biologi',
    slug: 'perubahan-biologi',
    moduleId: 'modul-3',
    moduleTitle: 'Modul 3: Perubahan Materi',
    title: 'Perubahan Biologi: Fotosintesis, Fermentasi, & Pembusukan',
    shortDesc: 'Reaksi kimia oleh organisme biotik: autolisis, enzim pengurai, dekomposisi, dan 3 jenis pelapukan.',
    iconName: 'Leaf',
    fenomena: {
      cerita: 'Sepotong roti tawar yang dibiarkan terbuka di atas meja selama beberapa hari mula-mula menjadi lembek, lalu ditumbuhi bercak jamur kehijauan dan berbau menyengat. Sebaliknya, adonan tepung yang diberi ragi mengembang hangat dan harum karena menghasilkan gelembung gas!',
      pertanyaan: 'Mengapa perubahan materi yang melibatkan organisme hidup digolongkan sebagai perubahan biologi?',
      pilihanPrediksi: [
        'Karena organisme hidup tidak menggunakan atom kimia.',
        'Karena reaksi kimia perubahan zat digerakkan oleh aktivitas enzim organisme biotik (bakteri, jamur, tumbuhan) dan bersifat irreversible.',
        'Karena perubahan biologi selalu menghasilkan air murni.',
        'Karena roti yang membusuk bisa dimakan kembali setelah dicuci.'
      ],
      pembahasanPrediksi: 'Tepat! Perubahan biologi adalah perubahan kimia yang disebabkan oleh aktivitas organisme biotik. Bersifat irreversible dan menghasilkan zat baru yang sama sekali berbeda dengan zat asalnya.'
    },
    tujuan: [
      'Menjelaskan konsep fotosintesis sebagai pembentukan makanan tumbuhan dari air dan gas CO₂.',
      'Mendeskripsikan fermentasi (peragian) dengan enzim pengurai.',
      'Menganalisis faktor pembusukan (autolisis, redoks, bakteri pengurai) dan 3 jenis pelapukan (biologis, fisis, kimia).'
    ],
    simulasiType: 'perubahan-biologi',
    defaultObservationRows: [
      { id: '1', percobaan: 'Fotosintesis Tumbuhan', variabel: 'Air + CO₂ + Cahaya + Klorofil', hasil: 'Menghasilkan glukosa (C₆H₁₂O₆) dan gas oksigen (O₂)', kesimpulan: 'Reaksi anabolisme pembentukan zat baru oleh tumbuhan autotrof' },
      { id: '2', percobaan: 'Fermentasi Ragi (Tape/Roti)', variabel: 'Gula + Enzim khamir (ragi)', hasil: 'Adonan mengembang melepaskan gas CO₂ dan aroma alkohol/asam', kesimpulan: 'Penguraian zat kompleks menjadi komponen sederhana oleh enzim' },
      { id: '3', percobaan: 'Pelapukan Batuan oleh Lumut', variabel: 'Aktivitas lumut kerak (Lichen)', hasil: 'Batuan keras terkikis dan retak menjadi butiran tanah', kesimpulan: 'Pelapukan biologis oleh aktivitas makhluk hidup' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Jelaskan 3 faktor penyebab pembusukan materi sisa organik sesuai PDF!',
        clue: 'a. Autolisis (pelunakan sel oleh enzim intraseluler), b. Reaksi reduksi-oksidasi dengan oksigen udara, c. Aktivitas organisme pengurai (bakteri decomposer).'
      },
      {
        pertanyaan: 'Sebutkan 3 penyebab pelapukan benda!',
        clue: '1. Pelapukan biologis (makhluk hidup), 2. Pelapukan fisis (suhu, cuaca, iklim), 3. Pelapukan kimia (senyawa kimia terlarut).'
      }
    ],
    materiInti: {
      ringkasan: 'Perubahan kimia yang disebabkan oleh organisme biotik disebut perubahan biologi. Bersifat irreversible dan menghasilkan zat baru yang sama sekali berbeda.',
      poinPenting: [
        { judul: 'Fotosintesis', isi: 'Tumbuhan autotrof membuat makanan dengan mengubah air (H₂O) dan gas karbon (CO₂) menjadi glukosa (C₆H₁₂O₆) dengan bantuan cahaya matahari dan klorofil.' },
        { judul: 'Peragian (Fermentasi)', isi: 'Proses penguraian zat kompleks menjadi komponen yang lebih sederhana dengan melibatkan enzim pengurai mikroorganisme (contoh: pembuatan tempe, tape, roti, yogurt).' },
        { judul: 'Pembusukan (Dekomposisi)', isi: 'Penguraian materi sisa organik oleh 3 faktor: 1. Autolisis (pelunakan sel akibat enzim intraseluler saat sel mati; makin cepat pada suhu & kelembapan tinggi), 2. Reaksi reduksi-oksidasi dengan molekul udara, 3. Aktivitas bakteri pengurai.' },
        { judul: 'Pelapukan Material', isi: 'Penghancuran material akibat waktu, iklim, cuaca, dan biotik: 1. Pelapukan biologis (oleh makhluk hidup seperti lumut/akar pohon), 2. Pelapukan fisis (perubahan suhu/tekanan), 3. Pelapukan kimia (reaksi zat kimia pengurai struktur benda).' }
      ],
      rumusAtauKonsep: 'Fotosintesis: 6CO₂ + 6H₂O + Energi Cahaya → C₆H₁₂O₆ + 6O₂. Pembusukan = Autolisis + Redoks + Bakteri.',
      miskonsepsi: 'Miskonsepsi: Mengira pelapukan hanya terjadi pada makhluk hidup. Pelapukan juga terjadi pada benda mati seperti bebatuan, candi, dan dinding bangunan akibat lumut, cuaca panas-dingin, dan hujan asam!'
    },
    refleksi: {
      pertanyaan1: 'Mengapa pembusukan makanan berlangsung jauh lebih lambat jika makanan disimpan di dalam freezer lemari es?',
      pertanyaan2: 'Bagaimana peran bakteri pengurai menjaga keseimbangan rantai makanan di alam semesta?',
      penerapanDuniaNyata: 'Bioteknologi fermentasi digunakan dalam pembuatan antibiotik penisilin, sedangkan teknologi pengomposan aerobik memanfaatkan dekomposisi terkendali untuk mengolah sampah organik.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Pelunakan dan pencairan sel yang disebabkan oleh enzim intraseluler yang dilepaskan oleh sel yang telah mati disebut...',
        options: ['Fotosintesis', 'Autolisis', 'Kristalisasi', 'Galvanic coupling'],
        correctAnswer: 1,
        explanation: 'Sesuai PDF materi: Autolisis adalah pelunakan dan pencairan sel oleh enzim intraseluler yang dilepaskan sel setelah mati.'
      },
      {
        id: 'q2',
        question: 'Bahan baku yang diubah oleh tumbuhan dalam proses fotosintesis untuk menghasilkan glukosa adalah...',
        options: ['Oksigen dan nitrogen', 'Air dan gas karbon (CO₂)', 'Glukosa dan klorofil', 'Asam asetat dan alkohol'],
        correctAnswer: 1,
        explanation: 'Fotosintesis mengubah air dan gas karbon (karbondioksida) menjadi glukosa dengan bantuan cahaya matahari dan klorofil.'
      },
      {
        id: 'q3',
        question: 'Pelapukan batuan yang disebabkan oleh akar pohon yang menembus celah batu atau aktivitas lumut tergolong ke dalam jenis...',
        options: ['Pelapukan biologis', 'Pelapukan fisis', 'Pelapukan kimia', 'Pelapukan nuklir'],
        correctAnswer: 0,
        explanation: 'Pelapukan yang diakibatkan oleh aktivitas makhluk hidup (tumbuhan, lumut, mikroorganisme) adalah pelapukan biologis.'
      }
    ]
  },

  // MODUL 4
  {
    id: 'klasifikasi-b3',
    slug: 'klasifikasi-b3',
    moduleId: 'modul-4',
    moduleTitle: 'Modul 4: Bahan Berbahaya dan Beracun (B3)',
    title: 'Klasifikasi B3 & Tata Kelola Penyimpanan',
    shortDesc: 'Tingkat potensi bahaya 0-4, pelabelan GHS, MSDS/SDS, fasilitas penyimpanan, APAR, dan penanganan kedaluwarsa.',
    iconName: 'AlertTriangle',
    fenomena: {
      cerita: 'Di sebuah laboratorium kimia, asam nitrat pekat disimpan bersebelahan dengan pelarut organik aseton tanpa sekat pemisah. Suatu malam terjadi gempa kecil yang memecahkan kedua botol. Campuran kedua zat tersebut seketika memicu ledakan dahsyat dan kobaran api. Padahal kecelakaan ini dapat dicegah 100% jika prosedur pemisahan bahan diterapkan!',
      pertanyaan: 'Mengapa bahan kimia berbahaya wajib dipisahkan penyimpanannya berdasarkan sifat kimianya?',
      pilihanPrediksi: [
        'Hanya untuk kerapian dan estetika lemari kaca.',
        'Untuk mencegah bahan bereaksi satu sama lain secara eksotermik, memicu kebakaran, ledakan, atau pelepasan gas beracun mematikan.',
        'Agar botol tidak saling bergesekan bunyinya.',
        'Bahan kimia sebenarnya aman dicampur jika wadahnya kaca.'
      ],
      pembahasanPrediksi: 'Tepat! Pemisahan adalah langkah paling awal dan krusial dalam tata kelola B3 untuk mencegah reaksi eksoterm berbahaya, kebakaran, ledakan, atau pembentukan gas beracun akibat interaksi antar bahan yang tidak kompatibel.'
    },
    tujuan: [
      'Menjelaskan definisi B3 dan sistem pengkodean potensi bahaya (skala 0 sampai 4).',
      'Mengidentifikasi informasi wajib pada label B3 (nama kimia, simbol GHS, sifat bahaya, tanggal kedaluwarsa, penanggung jawab, instruksi penanganan).',
      'Menerapkan standar fasilitas penyimpanan: ventilasi, APAR, lantai kedap air, spill containment, suhu 20-25°C, inventarisasi, dan penanganan bahan kedaluwarsa.'
    ],
    simulasiType: 'keselamatan-b3',
    defaultObservationRows: [
      { id: '1', percobaan: 'Analisis Risiko Fisik', variabel: 'Etanol / Aseton', hasil: 'Potensi bahaya fisik: Mudah terbakar dan meledak jika dekat sumber panas', kesimpulan: 'Simpan di kabinet tahan api dengan ventilasi uap' },
      { id: '2', percobaan: 'Analisis Risiko Kesehatan', variabel: 'Asam Klorida (HCl) pekat', hasil: 'Korosif kuat, uap mengiritasi saluran pernapasan dan kulit', kesimpulan: 'Simpan di lemari asam dengan bak penampung tumpahan' },
      { id: '3', percobaan: 'Bahan Kedaluwarsa', variabel: 'Bahan kimia melewati masa simpan', hasil: 'Kestabilan menurun, berisiko meledak spontan atau membentuk peroksida', kesimpulan: 'Beri label "Bahan Kedaluwarsa", pisahkan, dan serahkan ke pengolah berizin' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Bagaimana sistem pengkodean tingkat bahaya B3 dinilai sesuai PDF?',
        clue: 'Pengkodean didasarkan dari skala 0-4, di mana 0 memiliki potensi bahaya rendah dan 4 memiliki potensi bahaya sangat tinggi.'
      },
      {
        pertanyaan: 'Sebutkan 6 standar fasilitas fisik ruang penyimpanan B3!',
        clue: '1. Ventilasi baik, 2. APAR sesuai jenis bahan (CO2, dry powder, foam), 3. Lantai kedap air tahan kimia, 4. Rak khusus, 5. Spill containment (bak penampung tumpahan), 6. Suhu stabil (20-25°C).'
      }
    ],
    materiInti: {
      ringkasan: 'Bahan Berbahaya dan Beracun (B3) memiliki sifat kimia yang dapat menimbulkan bahaya fisik, kesehatan, dan lingkungan jika tidak disimpan dengan benar.',
      poinPenting: [
        { judul: 'Tingkat Bahaya 0-4', isi: 'Potensi respon bahaya dalam waktu singkat dinilai dari 0 (rendah) hingga 4 (sangat tinggi).' },
        { judul: 'Pemisahan & Kompatibilitas', isi: 'Langkah awal: pisahkan asam dari basa, pisahkan pelarut organik dari oksidator kuat untuk mencegah reaksi eksoterm dan pelepasan gas beracun.' },
        { judul: 'Informasi Minimal Label B3', isi: '1. Nama bahan kimia ilmiah & dagang, 2. Simbol & piktogram GHS, 3. Sifat bahaya, 4. Tanggal penerimaan & kedaluwarsa, 5. Nama penanggung jawab/pengguna, 6. Petunjuk penanganan & darurat.' },
        { judul: 'Fasilitas Ruang Penyimpanan', isi: 'Ventilasi udara prima, APAR siap pakai, lantai kedap air tahan zat kimia, rak khusus, bak spill containment penahan tumpahan, suhu ruang stabil 20–25°C jauh dari terik matahari.' },
        { judul: 'Penanganan Bahan Kedaluwarsa', isi: 'Bahan lewat masa simpan dapat menjadi tidak stabil/meledak. Tindakan: 1. Pisahkan, 2. Label mencolok "Bahan Kedaluwarsa", 3. Catat di inventaris limbah, 4. Laporkan ke penanggung jawab, 5. Kirim ke fasilitas pengolahan berizin.' },
        { judul: 'Media Informasi Keselamatan K3', isi: 'Lembar Data Keselamatan Bahan (MSDS/SDS), poster K3, pelatihan berkala, nomor kontak darurat, serta fasilitas shower dan eyewash darurat.' }
      ],
      rumusAtauKonsep: 'Klasifikasi Bahaya: Fisik (kebakaran/ledakan) | Kesehatan (racun/iritan/korosif) | Lingkungan (akuatik/tanah). Skala Potensi: 0 s/d 4.',
      miskonsepsi: 'Miskonsepsi: Menganggap bahan yang sudah kedaluwarsa kekuatannya hilang sehingga aman dibuang ke wastafel. Faktanya, beberapa bahan kimia (seperti eter) yang kedaluwarsa justru membentuk kristal peroksida yang sangat peka benturan dan mudah meledak!'
    },
    refleksi: {
      pertanyaan1: 'Mengapa di dalam ruang penyimpanan bahan kimia wajib disediakan bak penampung (spill containment) di bawah rak?',
      pertanyaan2: 'Jika terjadi tumpahan bahan kimia beracun mengenai mata praktikan, tindakan apa yang harus segera dilakukan?',
      penerapanDuniaNyata: 'Sistem manajemen K3 (SMK3) dan kepatuhan SDS/MSDS wajib diterapkan di seluruh industri manufaktur cat, kilang minyak, farmasi, dan bengkel teknik.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Pengkodean potensi bahaya B3 berdasarkan respon bahaya dalam waktu singkat dinilai menggunakan rentang skala...',
        options: ['Skala 1 sampai 10', 'Skala 0 sampai 4 (0 rendah, 4 tinggi)', 'Skala huruf A sampai E', 'Skala persentase 0% - 100%'],
        correctAnswer: 1,
        explanation: 'Sesuai PDF: Dalam pengkodeannya didasarkan dari 0-4 di mana 0 memiliki potensi rendah dan 4 memiliki potensi tinggi.'
      },
      {
        id: 'q2',
        question: 'Fasilitas bak penampung (spill containment) di bawah rak penyimpanan B3 berfungsi untuk...',
        options: [
          'Tempat merendam botol bahan kimia dengan air es',
          'Menahan dan mengendalikan tumpahan atau kebocoran agar tidak menyebar mencemari lantai',
          'Menyimpan makanan praktikan laboratorium',
          'Menampung air hujan dari ventilasi'
        ],
        correctAnswer: 1,
        explanation: 'Bak penampung (spill containment) berfungsi menampung cairan jika terjadi kebocoran botol agar tidak merembes ke lingkungan.'
      },
      {
        id: 'q3',
        question: 'Tindakan pertama yang harus dilakukan saat mendapati bahan B3 telah melewati batas waktu kedaluwarsa adalah...',
        options: [
          'Membuangnya langsung ke saluran got laboratorium',
          'Memisahkan dari bahan aktif lainnya dan memberi label mencolok "Bahan Kedaluwarsa"',
          'Memanaskannya kembali di atas kompor gas',
          'Mencampurnya dengan bahan kimia baru agar tidak terbuang'
        ],
        correctAnswer: 1,
        explanation: 'Bahan kedaluwarsa harus segera dipisahkan dari bahan aktif dan diberi label "Bahan Kedaluwarsa" dengan warna mencolok agar tidak salah digunakan.'
      }
    ]
  },
  {
    id: 'pengelolaan-limbah-b3',
    slug: 'pengelolaan-limbah-b3',
    moduleId: 'modul-4',
    moduleTitle: 'Modul 4: Bahan Berbahaya dan Beracun (B3)',
    title: 'Pengelolaan Limbah B3 & Prinsip 5R',
    shortDesc: 'Dampak lingkungan PP No. 101/2014, 7 tahapan prosedur pengelolaan, izin KLHK, manifest, dan penerapan 5R.',
    iconName: 'Recycle',
    fenomena: {
      cerita: 'Sebuah bengkel atau laboratorium membuang sisa oli bekas dan cairan pelarut kimia langsung ke saluran selokan warga. Beberapa hari kemudian, sumur air minum warga di sekitarnya berbau menyengat, ikan di sungai mati massal, dan tanah persawahan kehilangan kesuburan. Limbah B3 yang tidak dikelola telah mencemari seluruh rantai ekosistem!',
      pertanyaan: 'Bagaimana alur prosedur yang benar dalam mengelola limbah B3 dari sumber hingga tempat penimbunan akhir?',
      pilihanPrediksi: [
        'Cukup membakarnya di tong sampah depan rumah.',
        'Mengikuti 7 prosedur ketat: identifikasi, pemisahan, pelabelan, penyimpanan sementara, pengangkutan berizin, pengolahan metode sesuai, dan penimbunan akhir berizin (TPA-LB3).',
        'Mengencerkan limbah dengan air kran lalu membuangnya ke sungai.',
        'Menguburnya di dalam pekarangan rumah tanpa izin.'
      ],
      pembahasanPrediksi: 'Tepat! Berdasarkan PP No. 101 Tahun 2014, pengelolaan limbah B3 wajib melalui 7 prosedur terstandar untuk menghilangkan bahaya bagi lingkungan dan manusia, disertai penerapan prinsip 5R.'
    },
    tujuan: [
      'Menjelaskan definisi limbah B3 menurut PP No. 101 Tahun 2014 dan 5 dampaknya terhadap air, tanah, udara, kesehatan, dan ekosistem.',
      'Mengurutkan 7 tahap prosedur pengelolaan limbah B3 (identifikasi, pemisahan, pelabelan, penyimpanan sementara, pengangkutan KLHK ber-manifes, pengolahan fisik/kimia/biologi/termal, dan penimbunan akhir TPA-LB3).',
      'Menerapkan prinsip 5R: Reduce, Reuse, Recycle, Recovery, dan Replace dalam skenario nyata.'
    ],
    simulasiType: 'limbah-b3',
    defaultObservationRows: [
      { id: '1', percobaan: 'Metode Pengolahan Fisik', variabel: 'Limbah lumpur padat-cair', hasil: 'Filtrasi, sedimentasi, dan evaporasi memisahkan padatan', kesimpulan: 'Mengubah bentuk atau memisahkan padatan berbahaya' },
      { id: '2', percobaan: 'Metode Pengolahan Biologi & Termal', variabel: 'Bioremediasi tanah & Insinerasi limbah medis', hasil: 'Mikroba menguraikan zat racun; Insinerator suhu tinggi membakar limbah patogen', kesimpulan: 'Menghilangkan sifat toksik sebelum dibuang ke TPA-LB3' },
      { id: '3', percobaan: 'Penerapan 5R', variabel: 'Prinsip Replace (Penggantian)', hasil: 'Mengganti pelarut beracun benzena dengan etanol ramah lingkungan', kesimpulan: 'Mencegah terbentuknya limbah berbahaya sejak awal' }
    ],
    analisisPemandu: [
      {
        pertanyaan: 'Sebutkan 4 metode pengolahan limbah B3 beserta contohnya sesuai tabel materi PDF!',
        clue: '1. Fisik (filtrasi, sedimentasi, evaporasi), 2. Kimia (netralisasi asam-basa, presipitasi logam), 3. Biologi (bioremediasi tanah/air), 4. Termal (insinerasi bersuhu tinggi).'
      },
      {
        pertanyaan: 'Sebutkan kepanjangan dan pengertian dari prinsip 5R dalam pengelolaan limbah B3!',
        clue: '1. Reduce (mengurangi bahan), 2. Reuse (gunakan kembali yang masih layak), 3. Recycle (daur ulang menjadi bahan baru), 4. Recovery (pemulihan zat bernilai), 5. Replace (ganti dengan bahan lebih aman).'
      }
    ],
    materiInti: {
      ringkasan: 'Menurut PP No. 101 Tahun 2014, limbah B3 adalah sisa suatu usaha atau kegiatan yang mengandung bahan berbahaya/beracun yang dapat mencemari lingkungan hidup dan membahayakan kesehatan manusia.',
      poinPenting: [
        { judul: '5 Dampak Negatif Limbah B3', isi: '1. Pencemaran air (logam berat ke sungai mencemari air minum), 2. Kerusakan tanah (membunuh mikroba penyubur), 3. Pencemaran udara (gas beracun amonia/klorin), 4. Gangguan kesehatan manusia (iritasi, kanker, kematian), 5. Gangguan ekosistem (memutus rantai makanan).' },
        { judul: '7 Prosedur Pengelolaan Limbah B3', isi: '1. Identifikasi & Klasifikasi jenis/sifat bahaya, 2. Pemisahan limbah sejak sumbernya (asam dipisah dari basa), 3. Pelabelan wadah limbah (simbol GHS & tanggal simpan), 4. Penyimpanan sementara (ruang berventilasi, wadah sekunder/secondary containment), 5. Pengangkutan (kendaraan tertutup tahan bocor, izin KLHK, dokumen manifest), 6. Pengolahan (Fisik, Kimia, Biologi/Bioremediasi, Termal/Insinerasi), 7. Penimbunan akhir (TPA-LB3 berizin dengan lapisan kedap air).' },
        { judul: 'Prinsip Dasar 5R', isi: '1. Reduce (Mengurangi): Gunakan bahan kimia seperlunya. 2. Reuse (Gunakan Kembali): Manfaatkan kembali bahan yang masih layak. 3. Recycle (Daur Ulang): Olah limbah menjadi bahan baru yang berguna. 4. Recovery (Pemulihan): Ambil zat bernilai dari limbah. 5. Replace (Penggantian): Ganti bahan berbahaya dengan bahan yang lebih ramah lingkungan.' }
      ],
      rumusAtauKonsep: 'Hirarki Pengelolaan B3: Pencegahan (5R) → Penanganan (7 Prosedur) → Pengolahan Akhir (TPA-LB3 Berizin KLHK).',
      miskonsepsi: 'Miskonsepsi: Menganggap dokumen manifest hanya formalitas nota belanja. Manifest adalah dokumen hukum resmi negara yang melacak rantai pertanggungjawaban limbah B3 dari penghasil, pengangkut, hingga pengolah akhir!'
    },
    refleksi: {
      pertanyaan1: 'Bagaimana kamu dapat menerapkan prinsip 5R pada limbah baterai bekas dan sampah elektronik di lingkungan rumahmu?',
      pertanyaan2: 'Mengapa kendaraan pengangkut limbah B3 wajib memiliki izin khusus dari Kementerian Lingkungan Hidup dan Kehutanan (KLHK)?',
      penerapanDuniaNyata: 'Teknologi bioremediasi menggunakan bakteri pengurai tumpahan minyak mentah di laut, dan insinerator rumah sakit bersuhu di atas 1000°C untuk memusnahkan limbah medis infeksius.'
    },
    evaluasi: [
      {
        id: 'q1',
        question: 'Dasar hukum resmi Republik Indonesia yang mengatur tentang Pengelolaan Limbah Bahan Berbahaya dan Beracun sesuai PDF adalah...',
        options: ['UU No. 20 Tahun 2003', 'Peraturan Pemerintah (PP) No. 101 Tahun 2014', 'Permendikbud No. 22 Tahun 2016', 'KUHP Pasal 351'],
        correctAnswer: 1,
        explanation: 'Sesuai PDF materi: Menurut Peraturan Pemerintah (PP) No. 101 Tahun 2014 tentang Pengelolaan Limbah B3.'
      },
      {
        id: 'q2',
        question: 'Metode pengolahan limbah B3 dengan cara menguraikan zat berbahaya menggunakan bantuan mikroorganisme pengurai tanah/air disebut...',
        options: ['Insinerasi', 'Filtrasi presipitasi', 'Bioremediasi (Metode Biologi)', 'Netralisasi asam-basa'],
        correctAnswer: 2,
        explanation: 'Metode Biologi (Bioremediasi) menggunakan mikroba pengurai untuk menetralkan zat pencemar di tanah atau air.'
      },
      {
        id: 'q3',
        question: 'Tindakan mengganti pelarut beracun dengan bahan alternatif yang lebih aman bagi lingkungan merupakan penerapan prinsip 5R yaitu...',
        options: ['Reduce', 'Recycle', 'Replace (Penggantian)', 'Recovery'],
        correctAnswer: 2,
        explanation: 'Prinsip Replace (Penggantian) adalah mengganti bahan berbahaya dengan bahan yang lebih aman.'
      }
    ]
  }
];
