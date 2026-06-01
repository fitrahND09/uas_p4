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
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; 

const { width } = Dimensions.get("window");

type BookItem = {
  key: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  picked: boolean;
};

export default function SearchScreen() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // Fungsi fetch data yang mendukung pencarian dinamis
  const fetchBooks = async (query = "") => {
    setLoading(true);
    try {
      let url = "https://muzaka.dev/api/api-kode-b";
      
      // Jika ada teks pencarian, gunakan endpoint search API yang baru
      if (query.trim() !== "") {
        url = `https://muzaka.dev/api/api-kode-b?view=search&q=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      const json = await response.json();
      
      if (json.ok) {
        setBooks(json.data);
      }
    } catch (e) {
      console.log("Error mengambil data:", e);
    } finally {
      setLoading(false);
    }
  };

  // Load data pertama kali saat aplikasi dibuka
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fungsi yang dipanggil saat user menekan tombol pencarian di keyboard
  const handleSearch = () => {
    fetchBooks(searchText);
  };

  // Fungsi untuk menghapus teks pencarian dan reset data
  const handleClearSearch = () => {
    setSearchText("");
    fetchBooks("");
  };

  // Komponen Header Atas (Search Bar & Filter)
  const SearchHeader = () => (
    <View style={styles.headerContainer}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Book"
          placeholderTextColor="#BDC3C7"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search" // Mengubah tombol enter keyboard menjadi "Search"
          onSubmitEditing={handleSearch} // Trigger pencarian saat tombol enter ditekan
        />
        {searchText.length > 0 ? (
          <TouchableOpacity onPress={handleClearSearch} style={{ marginRight: 10 }}>
            <Ionicons name="close-circle" size={20} color="#BDC3C7" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="swap-vertical-outline" size={20} color="#7F8C8D" />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {["All Result", "Hogwarts", "Magic", "Voldemort", "Hallows"].map((tag, i) => (
          <TouchableOpacity key={tag} style={styles.chip} onPress={() => {
            if(tag === "All Result") handleClearSearch();
            else {
              setSearchText(tag);
              fetchBooks(tag);
            }
          }}>
            <Text style={searchText.toLowerCase() === tag.toLowerCase() || (tag === "All Result" && searchText === "") ? styles.chipTextActive : styles.chipText}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // Komponen Kartu Buku
  const renderBookItem = ({ item }: { item: BookItem }) => (
    <View style={styles.bookCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.cover_url.length > 10 ? item.cover_url : "https://via.placeholder.com/150" }} 
          style={styles.bookCover} 
        />
        {/* Crown Badge */}
        <View style={styles.crownBadge}>
          <MaterialCommunityIcons name="crown" size={14} color="#D4A017" />
        </View>
      </View>
      
      <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
      
      <View style={styles.metaRow}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#F1C40F" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        
        {item.picked && (
          <View style={styles.pickedContainer}>
            <Ionicons name="bookmark" size={10} color="#6C5CE7" />
            <Text style={styles.pickedText}>Picked</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={SearchHeader}
        renderItem={renderBookItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Buku tidak ditemukan</Text>
            </View>
          ) : null
        }
      />

      {/* Loading Overlay saat fetch data pencarian */}
      {loading && (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color="#D4A017" />
        </View>
      )}

      {/* Bottom Tab Bar */}
      {/* <View style={styles.bottomTab}>
        <TabItem icon="home-outline" label="Home" />
        <TabItem icon="search" label="Search" active />
        <TabItem icon="library-outline" label="Library" />
        <TabItem icon="person-outline" label="Account" />
      </View> */}
    </SafeAreaView>
  );
}

const TabItem = ({ icon, label, active = false }: any) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons name={icon} size={24} color={active ? "#D4A017" : "#BDC3C7"} />
    <Text style={[styles.tabLabel, active && { color: "#D4A017", fontWeight: "600" }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 100 },
  headerContainer: { marginTop: 10 },
  row: { justifyContent: "space-between" },

  // Search Bar
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#2C3E50",
  },

  // Filter Chips
  filterContainer: { marginBottom: 20 },
  chip: { marginRight: 20, paddingVertical: 5 },
  chipText: { color: "#95A5A6", fontWeight: "600", fontSize: 14 },
  chipTextActive: { color: "#D4A017", fontWeight: "bold", fontSize: 14 },

  // Grid Books
  bookCard: { width: (width - 60) / 2, marginBottom: 25 },
  imageContainer: { position: "relative" },
  bookCover: { width: "100%", height: 230, borderRadius: 12, backgroundColor: "#EEE" },
  
  crownBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFF",
    padding: 6,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  bookTitle: { fontSize: 14, fontWeight: "800", marginTop: 12, color: "#1E272E", lineHeight: 20 },
  bookAuthor: { fontSize: 12, color: "#7F8C8D", marginTop: 4, marginBottom: 8 },
  metaRow: { flexDirection: "row", alignItems: "center" },
  
  ratingContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#FEF9E7", 
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  ratingText: { fontSize: 12, fontWeight: "bold", marginLeft: 4, color: "#F39C12" },
  
  pickedContainer: { 
    flexDirection: "row", 
    alignItems: "center",
    backgroundColor: "#F0E6FF", 
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pickedText: { fontSize: 11, color: "#6C5CE7", fontWeight: "bold", marginLeft: 4 },

  // Loading & Empty States
  loadingCenter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  emptyContainer: { alignItems: "center", marginTop: 40 },
  emptyText: { color: "#7F8C8D", fontSize: 16, fontWeight: "500" },

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
    paddingBottom: 10,
  },
  tabItem: { alignItems: "center", justifyContent: "center", flex: 1 },
  tabLabel: { fontSize: 10, color: "#BDC3C7", marginTop: 4 },
});