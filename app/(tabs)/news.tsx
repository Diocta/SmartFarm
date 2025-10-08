import React, { useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  RefreshControl,
  Animated,
  ListRenderItem
} from "react-native";
import { styles } from "@/assets/styles/newsStyle";
import { newsData, categories, NewsItem, width } from "@/assets/prop/newsData";

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

  // Filter Kategori
  const renderCategoryChip = ({ item }: { item: string }) => (
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
            <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image}/>
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
    <View style={styles.container}>
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
            colors={["#12372A"]}
            tintColor="#12372A"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Tidak ada berita untuk kategori ini</Text>
          </View>
        }
      />
    </View>
  );
}