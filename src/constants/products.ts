import { Product } from '~/interfaces'

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Meterai Elektronik + PERURI Signature',
    icons: ['emet', 'esign'],
    category: '1',
    type: 'peruri-sign',
    emet: true,
    disclaimer:
      'ESGN adalah satuan penanda Tanda Tangan Elektronik yang jumlahnya disetarakan satu buah tanda tangan elektronik tersertifikasi. Dihimbau penggunaan ESGN untuk segala kepentingan dokumen yang nirsangkal.\n\nEMET adalah satuan penanda Meterai Elektronik yang jumlahnya disetarakan satu buah tanda meterai elektronik. Kedudukan dokumen elektronik bermeterai elektronik adalah sama dengan dokumen kertas bermeterai berdasarkan UU No. 11 Tahun 2008 (UU ITE) pada Pasal 5 ayat (1).',
  },
  {
    id: 2,
    name: 'Meterai Elektronik + BASE Signature',
    icons: ['emet', 'momofin-sign'],
    category: '2',
    type: 'momofin-sign',
    emet: true,
    disclaimer:
      'Merupakan Meterai Elektronik (EMET) dan Tanda Tangan Tidak Tersertifikasi. Untuk dokumen dengan kebutuhan Meterai, dihimbau untuk menggunakan Tanda Tangan Tersertifikasi (ESGN).',
  },
  {
    id: 3,
    name: 'Meterai Elektronik',
    icons: ['emet'],
    category: '2',
    type: 'emet',
    emet: true,
    disclaimer:
      'EMET adalah satuan penanda Meterai Elektronik yang jumlahnya disetarakan satu buah tanda meterai elektronik. Kedudukan dokumen elektronik bermeterai elektronik adalah sama dengan dokumen kertas bermeterai berdasarkan UU No. 11 Tahun 2008 (UU ITE) pada Pasal 5 ayat (1).',
  },
  {
    id: 4,
    name: 'PERURI Signature',
    icons: ['esign'],
    category: '1',
    type: 'peruri-sign',
    emet: false,
    disclaimer:
      'ESGN adalah satuan penanda Tanda Tangan Elektronik yang jumlahnya disetarakan satu buah tanda tangan elektronik tersertifikasi. Dihimbau penggunaan ESGN untuk segala kepentingan dokumen yang nirsangkal.',
  },
  {
    id: 5,
    name: 'BASE Signature',
    icons: ['momofin-sign'],
    category: '2',
    type: 'momofin-sign',
    emet: false,
    disclaimer:
      'BASE signature adalah tanda tangan elektronik kategori Tanda Tangan Tidak Tersertifikasi. BASE signature tetap merujuk kepada persyaratan dalam UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik; dan PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.\n\nDihimbau penggunaan BASE signature hanya untuk kepentingan dokumen internal.',
  },
]

export default PRODUCTS
