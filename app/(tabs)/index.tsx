import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
  SectionList
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Define types
type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  isTrending?: boolean;
  isFeatured?: boolean;
};

type Banner = {
  id: string;
  title: string;
  image: string;
  category: string;
};

const banners: Banner[] = [
  {
    id: "1",
    title: "Teknologi Terbaru 2024",
    image: "https://picsum.photos/400/200?random=10",
    category: "Teknologi"
  },
  {
    id: "2",
    title: "Inovasi Energi Hijau",
    image: "https://picsum.photos/400/200?random=11",
    category: "Energi"
  },
  {
    id: "3",
    title: "Breakthrough in Medicine",
    image: "https://picsum.photos/400/200?random=12",
    category: "Kesehatan"
  }
];

const trendingNews: NewsItem[] = [
  {
    id: "1",
    title: "Revolusi AI dalam Kehidupan Sehari-hari",
    description: "Kecerdasan buatan mulai mengubah cara kita bekerja dan berinteraksi.",
    image: "https://picsum.photos/400/200?random=5",
    category: "Teknologi",
    date: "15 Des 2024",
    readTime: "4 min read",
    isTrending: true
  },
  {
    id: "2",
    title: "Mobil Listrik Capai 50% Penjualan Global",
    description: "Transisi ke kendaraan listrik semakin cepat dari perkiraan.",
    image: "https://picsum.photos/400/200?random=6",
    category: "Otomotif",
    date: "14 Des 2024",
    readTime: "3 min read",
    isTrending: true
  }
];

const featuredNews: NewsItem[] = [
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

const categories = [
  { id: "1", name: "Teknologi", icon: "hardware-chip" },
  { id: "2", name: "Kesehatan", icon: "medkit" },
  { id: "3", name: "Bisnis", icon: "business" },
  { id: "4", name: "Olahraga", icon: "basketball" },
  { id: "5", name: "Hiburan", icon: "film" },
  { id: "6", name: "Politik", icon: "megaphone" }
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeBanner, setActiveBanner] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderBannerItem = ({ item, index }: { item: Banner; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.bannerItem, { transform: [{ scale }] }]}>
        <Image source={{ uri: item.image }} style={styles.bannerImage} />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerCategory}>{item.category}</Text>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>Baca Sekarang</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon as any} size={24} color="#007AFF" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderNewsItem = ({ item }: { item: NewsItem }) => {
    const scaleValue = new Animated.Value(1);
    
    const onPressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity 
          style={styles.newsCard}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.9}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
          
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDesc} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.metaContainer}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.readTime}>• {item.readTime}</Text>
              {item.isTrending && (
                <View style={styles.trendingBadge}>
                  <Ionicons name="trending-up" size={12} color="#fff" />
                  <Text style={styles.trendingText}>Trending</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderSectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>Lihat Semua</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Selamat Pagi! 👋</Text>
          <Text style={styles.subtitle}>Apa yang ingin kamu baca hari ini?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari berita..."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
      >
        {/* Banner Carousel */}
        <View style={styles.bannerSection}>
          <Animated.FlatList
            data={banners}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />
          <View style={styles.bannerPagination}>
            {banners.map((_, index) => {
              const opacity = scrollX.interpolate({
                inputRange: [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={[styles.paginationDot, { opacity }]}
                />
              );
            })}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          {renderSectionHeader({ title: "Kategori" })}
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Trending News */}
        <View style={styles.section}>
          {renderSectionHeader({ title: "Trending Sekarang" })}
          <FlatList
            data={trendingNews}
            renderItem={renderNewsItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Featured News */}
        <View style={styles.section}>
          {renderSectionHeader({ title: "Berita Pilihan" })}
          {featuredNews.map((item) => (
            <View key={item.id}>
              {renderNewsItem({ item })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },
  notificationButton: {
    padding: 8,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  seeAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  bannerSection: {
    marginBottom: 25,
  },
  bannerItem: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 180,
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bannerCategory: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  readButton: {
    alignSelf: "flex-start",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  readButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  bannerPagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginHorizontal: 4,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  horizontalList: {
    paddingHorizontal: 15,
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  newsImage: {
    width: "100%",
    height: 160,
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
    lineHeight: 22,
  },
  newsDesc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  date: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  readTime: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  trendingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  trendingText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 2,
  },
});