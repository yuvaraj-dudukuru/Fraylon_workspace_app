import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { BrandHeader } from "../components/BrandHeader";
import { BrandedLoader } from "../components/BrandedLoader";
import { OfflineNotice } from "../components/OfflineNotice";
import { colors } from "../constants/colors";

const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL || "https://fraylon-workspace.vercel.app";
const WELCOME_KEY = "fraylon_workspace_seen_welcome";

const injectedJavaScript = `
  (function() {
    const style = document.createElement('style');
    style.innerHTML = \`
      html, body {
        overscroll-behavior: none !important;
        -webkit-overflow-scrolling: touch !important;
        scrollbar-width: none !important;
        background: #0A0F1C !important;
      }
      html::-webkit-scrollbar, body::-webkit-scrollbar {
        display: none !important;
      }
      [data-testid="app-header"], .topbar, .browser-only, .desktop-only {
        display: none !important;
      }
      * {
        -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
      }
    \`;
    document.head.appendChild(style);
    const meta = document.querySelector('meta[name="viewport"]') || document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover');
    document.head.appendChild(meta);
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  })();
  true;
`;

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasWebError, setHasWebError] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
    });
    return unsub;
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(WELCOME_KEY).then((seen) => {
      if (!seen) {
        setShowWelcome(true);
      }
    });
  }, []);

  const closeWelcome = useCallback(async () => {
    await AsyncStorage.setItem(WELCOME_KEY, "true");
    setShowWelcome(false);
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setHasWebError(false);
    webViewRef.current?.reload();
  }, []);

  const onRetry = useCallback(() => {
    setIsLoading(true);
    setHasWebError(false);
    webViewRef.current?.reload();
  }, []);

  const webViewSection = useMemo(() => {
    if (!isOnline) {
      return <OfflineNotice onRetry={onRetry} />;
    }

    if (hasWebError) {
      return (
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Web app unavailable</Text>
          <Text style={styles.errorText}>
            The configured URL is not reachable right now. Update `EXPO_PUBLIC_WEB_URL` to a live endpoint.
          </Text>
          <Text style={styles.errorUrl}>{WEB_URL}</Text>
          <Pressable style={styles.modalButton} onPress={onRetry}>
            <Text style={styles.modalButtonText}>Retry</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.webContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: WEB_URL }}
          originWhitelist={["*"]}
          allowsBackForwardNavigationGestures
          bounces={false}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          overScrollMode="never"
          injectedJavaScript={injectedJavaScript}
          onHttpError={() => {
            setHasWebError(true);
            setIsLoading(false);
            setIsRefreshing(false);
          }}
          onLoadEnd={() => {
            setIsLoading(false);
            setIsRefreshing(false);
          }}
          onError={() => {
            setHasWebError(true);
            setIsLoading(false);
            setIsRefreshing(false);
          }}
          startInLoadingState
          renderLoading={() => <BrandedLoader />}
        />
      </View>
    );
  }, [hasWebError, isOnline, onRetry]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <BrandHeader />
      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl tintColor={colors.gradientStart} refreshing={isRefreshing} onRefresh={onRefresh} />}
      >
        {webViewSection}
      </ScrollView>
      {isLoading && isOnline ? <BrandedLoader /> : null}

      <Modal visible={showWelcome} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Welcome to Fraylon Workspace</Text>
            <Text style={styles.modalText}>
              Your templates are preloaded. Start creating instantly in a premium dark workspace.
            </Text>
            <Pressable style={styles.modalButton} onPress={closeWelcome}>
              <Text style={styles.modalButtonText}>Get Started</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollWrap: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  webContainer: {
    flex: 1,
    minHeight: 500,
  },
  errorWrap: {
    flex: 1,
    minHeight: 500,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  errorText: {
    color: colors.gray,
    textAlign: "center",
    lineHeight: 20,
  },
  errorUrl: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.85,
    textAlign: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(10,15,28,0.78)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.navy,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  modalTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  modalText: {
    color: colors.gray,
    marginBottom: 18,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: colors.gradientStart,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: "700",
  },
});

