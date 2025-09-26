import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Types
export type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
};

// Data
export let newsData: NewsItem[] = [
  {
    id: "1",
    title: "Teknologi IoT untuk Pertanian Hidroponik",
    description: "Petani mulai memanfaatkan IoT untuk memantau nutrisi tanaman secara real-time.",
    image: "https://picsum.photos/400/200?random=1",
    category: "Teknologi",
    date: "15 Des 2024",
    readTime: "3 min read"
  },
  {
    id: "2",
    title: "Energi Terbarukan Semakin Digemari",
    description: "Panel surya kini semakin terjangkau dan digunakan oleh banyak rumah tangga.",
    image: "https://picsum.photos/400/200?random=2",
    category: "Energi",
    date: "14 Des 2024",
    readTime: "2 min read"
  },
  {
    id: "3",
    title: "AI Membantu Dunia Medis",
    description: "Artificial Intelligence mulai digunakan untuk diagnosa penyakit lebih cepat.",
    image: "https://picsum.photos/400/200?random=3",
    category: "Kesehatan",
    date: "13 Des 2024",
    readTime: "4 min read"
  },
  {
    id: "4",
    title: "Inovasi Teknologi di Bidang Pendidikan",
    description: "Sistem pembelajaran daring semakin canggih dengan integrasi AI dan VR.",
    image: "https://picsum.photos/400/200?random=4",
    category: "Pendidikan",
    date: "12 Des 2024",
    readTime: "3 min read"
  },
  {
    id: "5",
    title: "Diocta Brian Caesario",
    description: "Seorang pelajar dari SMK Telkom Sidoarjo yang memiliki minat di bidang IoT.",
    image: require('@/assets/images/diocta.jpg'),
    category: "Prestasi",
    date: "26 Sep 2025",
    readTime: "now"
  },
];

export const updateNewsData = (newData: NewsItem[]) => {
  newsData = newData;
};

export const categories: string[] = ["Semua", "Teknologi", "Energi", "Kesehatan", "Pendidikan", "Prestasi"];

export { width };