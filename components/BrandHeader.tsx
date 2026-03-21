import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export function BrandHeader() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
      <View>
        <Text style={styles.title}>Fraylon Workspace</Text>
        <Text style={styles.subtitle}>Engineering the Future</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
  },
  subtitle: {
    color: colors.gray,
    fontSize: 11,
    marginTop: 1,
  },
});

