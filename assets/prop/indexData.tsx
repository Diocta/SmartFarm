// types.ts
import { ReactNode } from 'react';
import { newsData, categories, NewsItem, width } from "@/assets/prop/newsData";

export { NewsItem, newsData, categories };
// Types

export type Banner = {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
};

export type LeaderboardItem = {
  id: string;
  rank: number;
  name: string;
  points: string;
  avatar: string;
  change: 'up' | 'down' | 'same';
  changeAmount?: number;
};

// Data
export const banners: Banner[] = [
  {
    id: "1",
    title: "Teknologi Terbaru 2025",
    image: require("@/assets/images/teknologiBaru.jpg"),
    category: "Teknologi",
    description: "Jelajahi inovasi teknologi terbaru yang akan mengubah dunia di tahun 2025."
  },
  {
    id: "2",
    title: "Inovasi Energi Hijau",
    image: require("@/assets/images/energiHijau.jpg"),
    category: "Energi",
    description: "Energi terbarukan semakin penting untuk masa depan planet kita."
  },
  {
    id: "3",
    title: "Breakthrough in Medicine",
    image: require("@/assets/images/kesehatan.jpg"),
    category: "Kesehatan",
    description: "Penemuan medis terbaru yang menjanjikan harapan baru bagi pasien di seluruh dunia."
  }
];

export const trendingNews: NewsItem[] = [
  {
    id: "1",
    title: "Peggunaan Teknologi AI pada Smart Hidroponik",
    description: "Kecerdasan buatan mulai mengubah cara kita bekerja dan berinteraksi.",
    image: require("@/assets/images/ai smart farm.jpg"),
    category: "Teknologi",
    date: "15 Des 2024",
    readTime: "4 min read",
    isTrending: true
  },
  {
    id: "2",
    title: "Mobil Listrik Capai 50% Penjualan Global",
    description: "Transisi ke kendaraan listrik semakin cepat dari perkiraan.",
    image: require("@/assets/images/kesehatan.jpg"),
    category: "Otomotif",
    date: "14 Des 2024",
    readTime: "3 min read",
    isTrending: true
  }
];

export const featuredNews: NewsItem[] = [
  {
    id: "3",
    title: "Teknologi IoT untuk Pertanian Hidroponik",
    description: "Petani mulai memanfaatkan IoT untuk memantau nutrisi tanaman secara real-time.",
    image: "https://picsum.photos/400/200?random=1",
    category: "Teknologi",
    date: "15 Des 2024",
    readTime: "3 min read",
    isFeatured: true
  },
  {
    id: "4",
    title: "Energi Terbarukan Semakin Digemari",
    description: "Panel surya kini semakin terjangkau dan digunakan oleh banyak rumah tangga.",
    image: "https://picsum.photos/400/200?random=2",
    category: "Energi",
    date: "14 Des 2024",
    readTime: "2 min read",
    isFeatured: true
  },
  {
    id: "5",
    title: "AI Membantu Dunia Medis",
    description: "Artificial Intelligence mulai digunakan untuk diagnosa penyakit lebih cepat.",
    image: "https://picsum.photos/400/200?random=3",
    category: "Kesehatan",
    date: "13 Des 2024",
    readTime: "4 min read",
    isFeatured: true
  },
  {
    id: "6",
    title: "Inovasi Teknologi di Bidang Pendidikan",
    description: "Sistem pembelajaran daring semakin canggih dengan integrasi AI dan VR.",
    image: "https://picsum.photos/400/200?random=4",
    category: "Pendidikan",
    date: "12 Des 2024",
    readTime: "3 min read",
    isFeatured: true
  }
];

export const leaderboardData: LeaderboardItem[] = [
  {
    id: "1",
    rank: 1,
    name: "Selada",
    points: "± 400rb ton",
    avatar: require("@/assets/images/lettuce.jpg"),
    change: "same",
  },
  {
    id: "2",
    rank: 2,
    name: "Kangkung",
    points: "± 250rb ton",
    avatar: require("@/assets/images/kangkung.jpg"),
    change: "up",
    changeAmount: 1
  },
  {
    id: "3",
    rank: 3,
    name: "Pakcoy",
    points: "± 132rb ton",
    avatar: require("@/assets/images/pakcoy.jpg"),
    change: "down",
    changeAmount: 1
  },
  {
    id: "4",
    rank: 4,
    name: "Sawi",
    points: "± 98rb ton",
    avatar: require("@/assets/images/sawi.jpg"),
    change: "same"
  },
  {
    id: "5",
    rank: 5,
    name: "Bayam",
    points: "± 97rb ton",
    avatar: require("@/assets/images/bayam.jpg"),
    change: "up",
    changeAmount: 2
  },
  {
    id: "6",
    rank: 6,
    name: "Herbal",
    points: "± 56rb ton",
    avatar: require("@/assets/images/herbal.jpg"),
    change: "down",
    changeAmount: 1
  },
  {
    id: "7",
    rank: 7,
    name: "Tomat",
    points: "± 44rb ton",
    avatar: require("@/assets/images/tomat.jpg"),
    change: "up",
    changeAmount: 4
  }
];