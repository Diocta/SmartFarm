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
    image: require('@/assets/images/download.jpg'),
    category: "Teknologi",
    date: "15 Des 2024",
    readTime: "3 min read"
  },
  {
    id: "2",
    title: "Inovasi Baru Hidroponik, Tanam Tanaman secara Vertikal",
    description: "Menanam tanaman hidroponik secara vertikal sekarang menjadi tren baru dalam dunia pertanian.",
    image: require('@/assets/images/verticalfarm.jpg'),
    category: "Inovasi",
    date: "14 Des 2025",
    readTime: "2 min read"
  },
  {
    id: "3",
    title: "Tren Bisnis Sayuran Pakcoy Hidroponik",
    description: "Bisnis Penjualan sayuran Pakcoy hidroponik saat ini sedang merambah petani sayuran.",
    image: require('@/assets/images/pakcoy.jpg'),
    category: "Inovasi",
    date: "13 Des 2024",
    readTime: "4 min read"
  },
];

export const updateNewsData = (newData: NewsItem[]) => {
  newsData = newData;
};

export const categories: string[] = ["Semua", "Teknologi", "Inovasi", "Kesehatan"];

export { width };