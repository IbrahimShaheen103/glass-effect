import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const stylesList = [
  { name: "Glass Morphism", path: "/glass/glass.screen" },
  { name: "Minimalism", path: "/minimal/minimal.screen" },
  { name: "Clay Morphism", path: "/clay/clay.screen" },
  { name: "Liquid Glass", path: "/liquid/liquid.screen" },
  { name: "Skew Morphism", path: "/skew/skew.screen" },
  { name: "Neomorphism", path: "/neo/neo.screen" },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <FlatList
        data={stylesList}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(styles)${item.path}` as any)}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#111",
  },
  card: {
    flex: 1,
    margin: 8,
    height: 120,
    borderRadius: 20,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontWeight: "600",
  },
});
