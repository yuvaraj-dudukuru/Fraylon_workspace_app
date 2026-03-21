import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

type OfflineNoticeProps = {
  onRetry: () => void;
};

export function OfflineNotice({ onRetry }: OfflineNoticeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are offline</Text>
      <Text style={styles.description}>Connect to the internet and retry to load Fraylon Workspace.</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    color: colors.gray,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.gradientStart,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "700",
  },
});

