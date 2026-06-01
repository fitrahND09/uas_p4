import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AkunScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://placeimg.com/140/140/any" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Fitrah nauli dalomunte</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>NIM</Text>
            <Text style={styles.infoValue}>1224030</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kelas</Text>
            <Text style={styles.infoValue}>Reguler Pagi</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Semester</Text>
            <Text style={styles.infoValue}>4</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Angkatan</Text>
            <Text style={styles.infoValue}>2024</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 18,
    textAlign: "center",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  infoLabel: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "700",
  },
});

export default AkunScreen;
