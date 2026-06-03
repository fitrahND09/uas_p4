import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/home.style";

type BookItem = {
  key: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  picked: boolean;
};

export default function LibraryApp() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://muzaka.dev/api/api-kode-b");
      const json = await response.json();
      if (json.ok) setBooks(json.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Komponen Header Atas
  const HeaderComponent = () => (
    <View>
      {/* Featured Banner */}
      <View style={styles.featuredCard}>
        <View style={styles.featuredContent}>
          <View style={styles.popularBadge}>
            <Ionicons name="flame" size={12} color="#E67E22" />
            <Text style={styles.popularText}> Popular</Text>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={3}>
            {books[0]?.title}
          </Text>
          <Text style={styles.featuredAuthor}>{books[0]?.author} (1997)</Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageStackContainer}>
          <Image
            source={{ uri: books[2]?.cover_url }}
            style={[styles.featuredImage, styles.cardImage2]}
          />
          <Image
            source={{ uri: books[1]?.cover_url }}
            style={[styles.featuredImage, styles.cardImage1]}
          />
          <Image
            source={{ uri: books[0]?.cover_url }}
            style={[styles.featuredImage, styles.cardImage0]}
          />
        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {["All Books", "Stone", "Hogwarts", "Voldemort", "Hallows"].map(
          (tag, i) => (
            <TouchableOpacity
              key={tag}
              style={i === 0 ? styles.chipActive : styles.chip}
            >
              <Text style={i === 0 ? styles.chipTextActive : styles.chipText}>
                {tag}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </View>
  );

  const renderBookItem = ({ item }: { item: BookItem }) => (
    <View style={styles.bookCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.cover_url }} style={styles.bookCover} />
        <View style={styles.starBadge}>
          <Ionicons name="star" size={10} color="yellow" />
        </View>
      </View>
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="#F1C40F" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      {item.picked && (
        <View style={styles.pickedContainer}>
          <Ionicons name="bookmark" size={12} color="#5D3FD3" />
          <Text style={styles.pickedText}> Picked</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={HeaderComponent}
        renderItem={renderBookItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const TabItem = ({ icon, label, active = false }: any) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons name={icon} size={24} color={active ? "#D4A017" : "#999"} />
    <Text style={[styles.tabLabel, active && { color: "#D4A017" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);
