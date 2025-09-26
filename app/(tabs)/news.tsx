import React, { useState } from "react";
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
  ListRenderItem
} from "react-native";

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
};

type CategoryChipProps = {
  item: string;
};

const newsData: NewsItem[] = [
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
    category: "Kesehatan",
    date: "12 Des 2024",
    readTime: "3 min read"
  },
];

const categories: string[] = ["Semua", "Teknologi", "Energi", "Kesehatan", "Pendidikan"];

export default function NewsScreen() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredNews = selectedCategory === "Semua" 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderCategoryChip = ({ item }: CategoryChipProps) => (
    <TouchableOpacity
      style={[
        styles.chip,
        selectedCategory === item && styles.chipSelected
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.chipText,
        selectedCategory === item && styles.chipTextSelected
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderItem: ListRenderItem<NewsItem> = ({ item, index }) => {
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
          style={styles.card}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.9}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.metaContainer}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.readTime}>• {item.readTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Berita Terkini</Text>
        <Text style={styles.headerSubtitle}>Update terbaru seputar teknologi</Text>
      </View>

      <View style={styles.categoriesSection}>
        <FlatList
          data={categories}
          renderItem={renderCategoryChip}
          keyExtractor={(item: string) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        />
      </View>

      <FlatList
        data={filteredNews}
        renderItem={renderItem}
        keyExtractor={(item: NewsItem) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Tidak ada berita untuk kategori ini</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  categoriesSection: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  chipsContainer: {
    paddingHorizontal: 15,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#007AFF",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
    lineHeight: 24,
  },
  desc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});