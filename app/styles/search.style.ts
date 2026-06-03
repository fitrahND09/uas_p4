import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
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

export default styles;