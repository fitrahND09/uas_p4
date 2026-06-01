import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Destination = {
  id: string;
  title: string;
  country: string;
  imageUrl: string;
  price: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<Destination[]>([]);

  const fetchDestination = async () => {
    try {
      const response = await fetch("https://muzaka.dev/api/api-kode-a");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  const renderDestination = ({ item }: { item: Destination }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />

      <View style={styles.overlay}>
        <Text style={styles.price}>{item.price.replace("IDR", "Rp")}</Text>

        <View>
          <Text style={styles.cardTitle}>{item.title.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="navigate-outline" size={20} color="#555" />
        </TouchableOpacity>

        <View>
          <Text style={styles.locationLabel}>Location</Text>

          <Text style={styles.locationText}>Europe</Text>
        </View>

        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="notifications-outline" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#999" />

          <TextInput
            placeholder="Search..."
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        {/* Airline */}
        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <Ionicons name="airplane" size={24} color="#4F7CFF" />
          </View>

          <Text style={styles.categoryText}>Airline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="office-building-outline"
              size={24}
              color="#4F7CFF"
            />
          </View>

          <Text style={styles.categoryText}>Hotel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="triangle-outline"
              size={24}
              color="#222"
            />
          </View>

          <Text style={styles.categoryText}>Camping</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="image-filter-hdr"
              size={24}
              color="#4F7CFF"
            />
          </View>

          <Text style={styles.categoryText}>Mountain</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="waves" size={24} color="#4F7CFF" />
          </View>

          <Text style={styles.categoryText}>Beach</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="sail-boat"
              size={24}
              color="#4F7CFF"
            />
          </View>

          <Text style={styles.categoryText}>Sport</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="tree-outline"
              size={24}
              color="#4F7CFF"
            />
          </View>

          <Text style={styles.categoryText}>Forest</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconCircle}>
            <Feather name="grid" size={22} color="#999" />
          </View>

          <Text style={styles.categoryText}>See more</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>People's Choice</Text>

      <FlatList
        data={data}
        renderItem={renderDestination}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  locationLabel: {
    textAlign: "center",
    color: "#B0B0B0",
    fontSize: 12,
  },

  locationText: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 52,
    backgroundColor: "#fff",
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: "#222",
  },

  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    backgroundColor: "#fff",
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: "#fff",
  },

  categoryItem: {
    width: "22%",
    alignItems: "center",
    marginBottom: 18,
  },

  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8FF",
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#222",
    marginBottom: 16,
  },

  card: {
    width: "48%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 15,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  price: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    alignSelf: "flex-end",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});