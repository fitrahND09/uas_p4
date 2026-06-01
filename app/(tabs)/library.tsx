import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Tipe data berdasarkan API
type BookItem = {
  key: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  picked: boolean;
};

export default function LibraryScreen() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://muzaka.dev/api/api-kode-b");
        const json = await response.json();
        if (json.ok) {
          // Hanya ambil 2 buku pertama untuk simulasi "My Library" sesuai gambar
          setBooks(json.data.slice(0, 2));
        }
      } catch (e) {
        console.log("Error fetching data: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Komponen Bagian Atas (Header, Stats, Filter)
  const LibraryHeader = () => (
    <View style={styles.headerWrapper}>
      {/* Kartu Header Utama */}
      <View style={styles.featuredCard}>
        <View style={styles.featuredContent}>
          <Text style={styles.librarySubtitle}>My Library</Text>
          <Text style={styles.libraryTitle}>Reading Shelf</Text>
          <Text style={styles.libraryDesc}>2 books saved from PotterAPI</Text>
        </View>
        {/* Gambar Tumpukan Buku */}
        <View style={styles.overlappingImages}>
          <Image source={{ uri: books[1]?.cover_url }} style={[styles.libImage, styles.imageBack]} />
          <Image source={{ uri: books[0]?.cover_url }} style={[styles.libImage, styles.imageFront]} />
        </View>
      </View>

      {/* Baris Statistik (2 Buku & 100% Shelf) */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="book" size={24} color="#D4A017" />
          <View style={styles.statText}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Books</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="bar-chart" size={24} color="#D4A017" />
          <View style={styles.statText}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Shelf</Text>
          </View>
        </View>
      </View>

      {/* Filter Kategori */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillContainer}>
        {["All", "Reading", "Completed", "Want to Read"].map((tag, i) => (
          <TouchableOpacity key={tag} style={i === 0 ? styles.pillActive : styles.pill}>
            <Text style={i === 0 ? styles.pillTextActive : styles.pillText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Judul Bagian List */}
      <Text style={styles.sectionTitle}>All Books</Text>
    </View>
  );

  // Komponen Item List Buku Vertikal
  const renderLibraryItem = ({ item, index }: { item: BookItem; index: number }) => (
    <View style={styles.bookCardList}>
      <Image source={{ uri: item.cover_url }} style={styles.bookCoverList} />
      
      <View style={styles.bookDetailsList}>
        <Text style={styles.bookTitleList} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bookAuthorList}>{item.author}</Text>
        
        {/* Tag Halaman & Status (Data manual karena API tidak menyediakan ini) */}
        <View style={styles.tagsRow}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{index === 0 ? "223 pages" : "251 pages"}</Text>
          </View>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{index === 0 ? "Reading" : "Saved"}</Text>
          </View>
        </View>
      </View>

      {/* Ikon Bookmark */}
      <TouchableOpacity style={styles.bookmarkIcon}>
        <Ionicons name="bookmark" size={22} color="#D4A017" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color="#D4A017" />
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={LibraryHeader}
          renderItem={renderLibraryItem}
          contentContainerStyle={styles.scrollPadding}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom Tab Bar Khusus Halaman Library */}
      {/* <View style={styles.bottomTab}>
        <TabItem icon="home-outline" label="Home" />
        <TabItem icon="search-outline" label="Search" />
        <TabItem icon="book" label="Library" active />
        <TabItem icon="person-outline" label="Account" />
      </View> */}
    </SafeAreaView>
  );
}

// Komponen Pembantu untuk Tab Bawah
const TabItem = ({ icon, label, active = false }: any) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons name={icon} size={24} color={active ? "#D4A017" : "#BDC3C7"} />
    <Text style={[styles.tabLabel, active && { color: "#D4A017", fontWeight: "700" }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 },
  loadingCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerWrapper: { paddingBottom: 10 },

  // --- Header Card ---
  featuredCard: {
    backgroundColor: "#FDF8EE", // Warna latar krem muda
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    height: 160,
    borderWidth: 1,
    borderColor: "#F5E6CC",
    overflow: "visible",
  },
  featuredContent: { flex: 1, justifyContent: "center", paddingRight: 10 },
  librarySubtitle: { color: "#D4A017", fontWeight: "800", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  libraryTitle: { fontSize: 24, fontWeight: "900", color: "#1E272E", marginBottom: 6 },
  libraryDesc: { fontSize: 12, color: "#7F8C8D" },
  
  // --- Gambar Bertumpuk ---
  overlappingImages: { width: 90, justifyContent: "center", alignItems: "center", position: "relative" },
  libImage: { width: 75, height: 110, borderRadius: 8, position: "absolute" },
  imageBack: { transform: [{ rotate: "15deg" }, { translateX: 25 }, { translateY: -10 }], zIndex: 1, opacity: 0.9 },
  imageFront: { transform: [{ rotate: "-5deg" }], zIndex: 2, borderWidth: 2, borderColor: "#FFF" },

  // --- Statistik Row ---
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  statCard: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#FFF", 
    borderWidth: 1, 
    borderColor: "#F0F0F0", 
    borderRadius: 16, 
    padding: 16, 
    marginHorizontal: 4, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 4, 
    elevation: 1 
  },
  statText: { marginLeft: 12 },
  statValue: { fontSize: 16, fontWeight: "900", color: "#1E272E" },
  statLabel: { fontSize: 12, color: "#7F8C8D", marginTop: 2 },

  // --- Filter Pills ---
  pillContainer: { marginVertical: 24 },
  pill: { backgroundColor: "#F5F6F8", paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  pillActive: { backgroundColor: "#FDF8EE", paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: "#F5E6CC" },
  pillText: { color: "#7F8C8D", fontWeight: "600", fontSize: 13 },
  pillTextActive: { color: "#D4A017", fontWeight: "bold", fontSize: 13 },

  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#1E272E", marginBottom: 15 },

  // --- Card List Vertikal ---
  bookCardList: { 
    flexDirection: "row", 
    backgroundColor: "#FFF", 
    borderRadius: 16, 
    padding: 14, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: "#F0F0F0", 
    alignItems: "center" 
  },
  bookCoverList: { width: 65, height: 95, borderRadius: 8, backgroundColor: "#EEE" },
  bookDetailsList: { flex: 1, marginLeft: 16, justifyContent: "center" },
  bookTitleList: { fontSize: 15, fontWeight: "800", color: "#1E272E", marginBottom: 4, lineHeight: 20 },
  bookAuthorList: { fontSize: 12, color: "#7F8C8D", marginBottom: 12 },
  
  // --- Label Halaman & Status ---
  tagsRow: { flexDirection: "row" },
  tagPill: { backgroundColor: "#FDF8EE", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, marginRight: 8 },
  tagText: { color: "#D4A017", fontSize: 10, fontWeight: "bold" },
  
  bookmarkIcon: { paddingLeft: 10 },

  // --- Bottom Tab ---
  bottomTab: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 75,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 15,
  },
  tabItem: { alignItems: "center", justifyContent: "center", flex: 1 },
  tabLabel: { fontSize: 10, color: "#BDC3C7", marginTop: 4 },
});