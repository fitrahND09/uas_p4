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
import styles from "../styles/search.style";
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

