import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export function BrandedLoader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.gradientStart} />
      <Text style={styles.text}>Loading workspace...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  text: {
    color: colors.gray,
    fontSize: 14,
  },
});

