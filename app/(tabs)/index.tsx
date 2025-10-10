// app/(tabs)/index.tsx
import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
  ListRenderItem
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import { 
  banners, 
  leaderboardData,
  newsData,
  categories,
  NewsItem, 
  Banner, 
  LeaderboardItem 
} from "@/assets/prop/indexData";
import { styles } from "@/assets/styles/indexStyle";
import { Link } from "expo-router";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeBanner, setActiveBanner] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const scrollX = useRef(new Animated.Value(0)).current;

  // Filter news berdasarkan kategori (sama seperti di NewsScreen)
  const filteredNews = selectedCategory === "Semua" 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // ✅ NAVIGASI PERSIS SEPERTI DI NEWSCREEN
  const navigateToDetail = (newsItem: NewsItem) => {
    router.push({
      pathname: "/NewsDetailScreen",
      params: { 
        id: newsItem.id,
        title: newsItem.title,
        description: newsItem.description,
        category: newsItem.category,
        date: newsItem.date,
        readTime: newsItem.readTime,
        author: newsItem.author || 'Admin'
      }
    });
  };

  // ✅ NAVIGASI UNTUK BANNER
  const navigateBannerToDetail = (bannerItem: Banner) => {
    // Cari news item yang sesuai dengan banner
    const relatedNews = newsData.find(item => item.title === bannerItem.title) || {
      id: `banner-${bannerItem.id}`,
      title: bannerItem.title,
      description: bannerItem.description || bannerItem.title,
      category: bannerItem.category,
      date: "Terbaru",
      readTime: "2 min read",
      author: "Admin",
      image: bannerItem.image
    };
    
    router.push({
      pathname: "/NewsDetailScreen",
      params: { 
        id: relatedNews.id,
        title: relatedNews.title,
        description: relatedNews.description,
        category: relatedNews.category,
        date: relatedNews.date,
        readTime: relatedNews.readTime,
        author: relatedNews.author
      }
    });
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
        <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.bannerImage}/>
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerCategory}>{item.category}</Text>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          {/* ✅ TAMBAHKAN NAVIGASI */}
          <TouchableOpacity 
            style={styles.readButton}
            onPress={() => navigateBannerToDetail(item)}
          >
            <Text style={styles.readButtonText}>Baca Sekarang</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  // ✅ FILTER KATEGORI PERSIS SEPERTI DI NEWSCREEN
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

  // ✅ RENDER FEATURED ITEM DENGAN ANIMASI PERSIS SEPERTI DI NEWSCREEN
  const renderFeaturedItem: ListRenderItem<NewsItem> = ({ item, index }) => {
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
          style={styles.featuredCard}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.9}
          onPress={() => navigateToDetail(item)} // ✅ NAVIGASI PERSIS SEPERTI DI NEWS
        >
          <View style={styles.featuredImageContainer}>
            <Image 
              source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
              style={styles.featuredImage}
            />
            <View style={styles.featuredCategoryBadge}>
              <Text style={styles.featuredCategoryText}>{item.category}</Text>
            </View>
          </View>
          
          <View style={styles.featuredContent}>
            <Text style={styles.featuredNewsTitle}>{item.title}</Text>
            <Text style={styles.featuredNewsDesc} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.featuredMetaContainer}>
              <Text style={styles.featuredDate}>{item.date}</Text>
              <Text style={styles.featuredReadTime}>• {item.readTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardItem; index: number }) => {
    const isLastItem = index === leaderboardData.length - 1;
    
    const getRankStyle = () => {
      switch (item.rank) {
        case 1: return styles.rankNumber1;
        case 2: return styles.rankNumber2;
        case 3: return styles.rankNumber3;
        default: return styles.rankNumber;
      }
    };

    const getAvatarStyle = () => {
      return item.rank <= 3 ? [styles.avatar, styles.avatarTop3] : styles.avatar;
    };

    const getChangeStyle = () => {
      switch (item.change) {
        case 'up': return styles.changeUp;
        case 'down': return styles.changeDown;
        case 'same': return styles.changeSame;
        default: return styles.changeSame;
      }
    };

    const getChangeTextStyle = () => {
      switch (item.change) {
        case 'up': return styles.changeTextUp;
        case 'down': return styles.changeTextDown;
        case 'same': return styles.changeTextSame;
        default: return styles.changeTextSame;
      }
    };

    const getChangeIcon = () => {
      switch (item.change) {
        case 'up': return "caret-up";
        case 'down': return "caret-down";
        case 'same': return "remove";
        default: return "remove";
      }
    };

    const getChangeText = () => {
      if (item.change === 'same') return "Same";
      return item.changeAmount?.toString() || "0";
    };

    return (
      <View style={[styles.leaderboardItem, isLastItem && styles.leaderboardItemLast]}>
        <View style={styles.rankContainer}>
          <Text style={getRankStyle()}>{item.rank}</Text>
        </View>

        <Image source={typeof item.avatar === 'string' ? {uri: item.avatar} : item.avatar} style={getAvatarStyle()} />
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userPoints}>{item.points.toLocaleString()} Terjual</Text>
        </View>
        
        <View style={getChangeStyle()}>
          <Ionicons 
            name={getChangeIcon() as any} 
            size={12} 
            color={getChangeTextStyle().color} 
          />
          <Text style={[styles.changeText, getChangeTextStyle()]}>
            {getChangeText()}
          </Text>
        </View>
      </View>
    );
  };

  const FeaturedNewsSection = () => (
    <View style={styles.featuredContainer}>
      <View style={styles.featuredHeader}>
        <Text style={styles.featuredTitle}>Berita Terkini</Text>
        <TouchableOpacity>
          <Link href="/(tabs)/news">
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </Link>
        </TouchableOpacity>
      </View>

      {/* ✅ KATEGORI FILTER PERSIS SEPERTI DI NEWSCREEN */}
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

      {/* ✅ LIST BERITA DENGAN REFRESH CONTROL */}
      <FlatList
        data={filteredNews}
        renderItem={renderFeaturedItem}
        keyExtractor={(item: NewsItem) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.featuredListContainer}
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

  const LeaderboardSection = () => (
    <View style={styles.section}>
      <View style={styles.leaderboardCard}>
        <View style={styles.leaderboardHeader}>
          <View style={styles.leaderboardTitleContainer}>
            <Text style={styles.leaderboardTitle}> Penjualan Leaderboard Terkini</Text>
          </View>
        </View>

        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
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
            colors={["#0B2B26"]}
            tintColor="#0B2B26"
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

        {/* Featured News - ✅ SEKARANG PERSIS SEPERTI DI NEWSCREEN */}
        <FeaturedNewsSection />

        {/* Leaderboard */}
        <LeaderboardSection />
      </ScrollView>
    </SafeAreaView>
  );
}