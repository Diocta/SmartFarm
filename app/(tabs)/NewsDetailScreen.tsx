// app/(tabs)/NewsDetailScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from '@/assets/styles/newsDetailStyle';
import { newsData } from '@/assets/prop/newsData';
import { Ionicons } from '@expo/vector-icons';

export default function NewsDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Cari berita berdasarkan ID atau gunanyakan params langsung
  const newsItem = newsData.find(item => item.id === params.id) || {
    id: params.id as string,
    title: params.title as string,
    description: params.description as string,
    fullContent: params.fullContent as string || '',
    category: params.category as string,
    date: params.date as string,
    readTime: params.readTime as string,
    author: params.author as string,
    image: require('@/assets/images/download.jpg') // fallback image
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Baca berita: ${newsItem.title}\n${newsItem.description}`,
        title: newsItem.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Gagal membagikan berita');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={typeof newsItem.image === 'string' ? { uri: newsItem.image } : newsItem.image} 
          style={styles.image}
        />
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Ionicons name="share-social" size={20} color="#FFF" />
        </TouchableOpacity>

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{newsItem.category}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Meta Information */}
        <View style={styles.metaContainer}>
          <Text style={styles.date}>{newsItem.date}</Text>
          <Text style={styles.readTime}>• {newsItem.readTime}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{newsItem.title}</Text>

        {/* Full Description/Content */}
        <Text style={styles.contentText}>
          {newsItem.fullContent || newsItem.description}
        </Text>

        {/* Additional content */}
        <View style={styles.additionalInfo}>
          <Text style={styles.author}>Ditulis oleh: {newsItem.author || 'Admin'}</Text>
        </View>
      </ScrollView>
    </View>
  );
}