import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons"; // Pastikan menggunakan library icon

const { width } = Dimensions.get("window");

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

  // Komponen Header Atas (Buku Populer)
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
        <Image
          source={{ uri: books[0]?.cover_url }}
          style={styles.featuredImage}
        />
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
          <Ionicons name="star" size={10} color="white" />
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

      {/* Bottom Tab Bar */}
      {/* <View style={styles.bottomTab}>
        <TabItem icon="home" label="Home" active />
        <TabItem icon="search" label="Search" />
        <TabItem icon="library-outline" label="Library" />
        <TabItem icon="person-outline" label="Account" />
      </View> */}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 100 },
  row: { justifyContent: "space-between" },

  // Featured Header
  featuredCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    marginTop: 20,
    height: 180,
    overflow: "hidden",
  },
  featuredContent: { flex: 1, justifyContent: "center" },
  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  popularText: { color: "#E67E22", fontSize: 12, fontWeight: "bold" },
  featuredTitle: { fontSize: 18, fontWeight: "800", color: "#2C3E50" },
  featuredAuthor: { fontSize: 12, color: "#7F8C8D", marginVertical: 5 },
  readMore: {
    color: "#E67E22",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  featuredImage: { width: 100, height: 140, borderRadius: 10, rotation: 5 },

  // Filter Chips
  filterContainer: { marginVertical: 20 },
  chip: { marginRight: 15, paddingVertical: 5 },
  chipActive: {
    marginRight: 15,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#D4A017",
  },
  chipText: { color: "#BDC3C7", fontWeight: "600" },
  chipTextActive: { color: "#2C3E50", fontWeight: "bold" },

  // Grid Books
  bookCard: { width: (width - 60) / 2, marginBottom: 25 },
  imageContainer: { position: "relative" },
  bookCover: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    backgroundColor: "#EEE",
  },
  starBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 5,
    borderRadius: 20,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
    color: "#2C3E50",
  },
  bookAuthor: { fontSize: 11, color: "#95A5A6" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
    color: "#2C3E50",
  },
  pickedContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  pickedText: { fontSize: 11, color: "#5D3FD3", fontWeight: "bold" },

  // Bottom Tab
  bottomTab: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: { alignItems: "center" },
  tabLabel: { fontSize: 10, color: "#999", marginTop: 4 },
});
