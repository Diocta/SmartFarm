import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Types
export type NewsItem = {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author?: string
  isTrending?: boolean;
  isFeatured?: boolean;
};

// Data
export let newsData: NewsItem[] = [
  {
    id: "1",
    title: "Teknologi IoT untuk Pertanian Hidroponik",
    description: "Petani mulai memanfaatkan IoT untuk memantau nutrisi tanaman secara real-time.",
    fullContent: "Teknologi Internet of Things (IoT) kini semakin banyak diterapkan dalam sektor pertanian, khususnya hidroponik. Dengan sensor-sensor canggih, petani dapat memantau kadar nutrisi, pH air, suhu, dan kelembaban secara real-time melalui smartphone. Teknologi ini tidak hanya meningkatkan efisiensi tetapi juga menghasilkan panen yang lebih berkualitas. Implementasi IoT dalam pertanian hidroponik telah terbukti meningkatkan produktivitas hingga 30% dan mengurangi penggunaan air hingga 50%.",
    image: require('@/assets/images/teknologiBaru.jpg'),
    category: "Teknologi",
    date: "15 Des 2024",
    readTime: "3 min read",
    author: "Ahmad Wijaya"
  },
  {
    id: "2",
    title: "Startup Fintech Tumbuh Pesat di Indonesia",
    description: "Investor asing semakin tertarik dengan startup fintech Indonesia.",
    fullContent: "Industri financial technology (fintech) di Indonesia menunjukkan pertumbuhan yang signifikan dalam beberapa tahun terakhir. Berdasarkan data Otoritas Jasa Keuangan, total transaksi fintech pada kuartal ketiga 2024 mencapai Rp 450 triliun, meningkat 35% dibandingkan periode yang sama tahun sebelumnya. Investor asing dari Singapura, Amerika Serikat, dan Jepang semakin aktif menanamkan modal di startup fintech Indonesia, terutama di segmen payment gateway, peer-to-peer lending, dan digital banking.",
    image: require('@/assets/images/verticalfarm.jpg'),
    category: "Bisnis",
    date: "14 Des 2024",
    readTime: "4 min read",
    author: "Sari Dewi"
  },
  {
    id: "3",
    title: "Startup Fintech Tumbuh Pesat di Indonesia",
    description: "Investor asing semakin tertarik dengan startup fintech Indonesia.",
    fullContent: "Industri financial technology (fintech) di Indonesia menunjukkan pertumbuhan yang signifikan dalam beberapa tahun terakhir. Berdasarkan data Otoritas Jasa Keuangan, total transaksi fintech pada kuartal ketiga 2024 mencapai Rp 450 triliun, meningkat 35% dibandingkan periode yang sama tahun sebelumnya. Investor asing dari Singapura, Amerika Serikat, dan Jepang semakin aktif menanamkan modal di startup fintech Indonesia, terutama di segmen payment gateway, peer-to-peer lending, dan digital banking.",
    image: require('@/assets/images/pakcoyfarm.jpg'),
    category: "Bisnis",
    date: "14 Des 2024",
    readTime: "4 min read",
    author: "Sari Dewi"
  },
];

export const updateNewsData = (newData: NewsItem[]) => {
  newsData = newData;
};

export const categories: string[] = ["Semua", "Teknologi", "Inovasi", "Kesehatan"];

export { width };