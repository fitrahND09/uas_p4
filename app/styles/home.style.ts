import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

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
  // bottomTab: {
  //   flexDirection: "row",
  //   position: "absolute",
  //   bottom: 0,
  //   width: "100%",
  //   height: 70,
  //   backgroundColor: "white",
  //   borderTopWidth: 1,
  //   borderTopColor: "#F1F1F1",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //},
  tabItem: { alignItems: "center" },
  tabLabel: { fontSize: 10, color: "#999", marginTop: 4 },

  imageStackContainer: {
    // Sesuaikan ukurannya.
    // Lebar = lebar gambar asli + total jarak 'left'
    // Tinggi = tinggi gambar asli + total jarak 'top'
    width: 140, // Contoh: lebar gambar 100 + pergeseran kiri 40
    height: 180, // Contoh: tinggi gambar 150 + pergeseran bawah 30
    position: "relative",
  },
  cardImage0: {
    position: "absolute",
    left: 0,
    top: 0, // Posisi awal di atas
    zIndex: 3, // Paling depan
  },
  cardImage1: {
    position: "absolute",
    left: 15, // Bergeser ke kanan
    top: 15, // Bergeser ke bawah (turun sedikit)
    zIndex: 2, // Di belakang gambar 0
  },
  cardImage2: {
    position: "absolute",
    left: 30, // Bergeser lebih jauh ke kanan
    top: 30, // Bergeser lebih jauh ke bawah
    zIndex: 1, // Paling belakang
  },
});

export default styles;
