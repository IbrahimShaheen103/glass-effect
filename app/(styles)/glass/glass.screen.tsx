import { Text, View } from "react-native";
import { styles } from "../../../styles/glass.styles";

export default function GlassScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Glass Morphism UI</Text>
      </View>
    </View>
  );
}
