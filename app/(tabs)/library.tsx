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
import styles from "../styles/library.style";

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
          <Image
            source={{ uri: books[1]?.cover_url }}
            style={[styles.libImage, styles.imageBack]}
          />
          <Image
            source={{ uri: books[0]?.cover_url }}
            style={[styles.libImage, styles.imageFront]}
          />
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillContainer}
      >
        {["All", "Reading", "Completed", "Want to Read"].map((tag, i) => (
          <TouchableOpacity
            key={tag}
            style={i === 0 ? styles.pillActive : styles.pill}
          >
            <Text style={i === 0 ? styles.pillTextActive : styles.pillText}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Judul Bagian List */}
      <Text style={styles.sectionTitle}>All Books</Text>
    </View>
  );

  // Komponen Item List Buku Vertikal
  const renderLibraryItem = ({
    item,
    index,
  }: {
    item: BookItem;
    index: number;
  }) => (
    <View style={styles.bookCardList}>
      <Image source={{ uri: item.cover_url }} style={styles.bookCoverList} />

      <View style={styles.bookDetailsList}>
        <Text style={styles.bookTitleList} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookAuthorList}>{item.author}</Text>

        {/* Tag Halaman & Status (Data manual karena API tidak menyediakan ini) */}
        <View style={styles.tagsRow}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>
              {index === 0 ? "223 pages" : "251 pages"}
            </Text>
          </View>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>
              {index === 0 ? "Reading" : "Saved"}
            </Text>
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
    <Text
      style={[
        styles.tabLabel,
        active && { color: "#D4A017", fontWeight: "700" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);


