import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
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
  librarySubtitle: {
    color: "#D4A017",
    fontWeight: "800",
    fontSize: 11,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  libraryTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E272E",
    marginBottom: 6,
  },
  libraryDesc: { fontSize: 12, color: "#7F8C8D" },

  // --- Gambar Bertumpuk ---
  overlappingImages: {
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  libImage: { width: 75, height: 110, borderRadius: 8, position: "absolute" },
  imageBack: {
    transform: [{ rotate: "15deg" }, { translateX: 25 }, { translateY: -10 }],
    zIndex: 1,
    opacity: 0.9,
  },
  imageFront: {
    transform: [{ rotate: "-5deg" }],
    zIndex: 2,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  // --- Statistik Row ---
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
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
    elevation: 1,
  },
  statText: { marginLeft: 12 },
  statValue: { fontSize: 16, fontWeight: "900", color: "#1E272E" },
  statLabel: { fontSize: 12, color: "#7F8C8D", marginTop: 2 },

  // --- Filter Pills ---
  pillContainer: { marginVertical: 24 },
  pill: {
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  pillActive: {
    backgroundColor: "#FDF8EE",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#F5E6CC",
  },
  pillText: { color: "#7F8C8D", fontWeight: "600", fontSize: 13 },
  pillTextActive: { color: "#D4A017", fontWeight: "bold", fontSize: 13 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1E272E",
    marginBottom: 15,
  },

  // --- Card List Vertikal ---
  bookCardList: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    alignItems: "center",
  },
  bookCoverList: {
    width: 65,
    height: 95,
    borderRadius: 8,
    backgroundColor: "#EEE",
  },
  bookDetailsList: { flex: 1, marginLeft: 16, justifyContent: "center" },
  bookTitleList: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E272E",
    marginBottom: 4,
    lineHeight: 20,
  },
  bookAuthorList: { fontSize: 12, color: "#7F8C8D", marginBottom: 12 },

  // --- Label Halaman & Status ---
  tagsRow: { flexDirection: "row" },
  tagPill: {
    backgroundColor: "#FDF8EE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
  },
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
export default styles;
