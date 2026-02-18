import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

// Add these imports
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootGuard = () => {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!navigationState?.key || loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup) {
      router.replace("/auth");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, loading, navigationState, segments]);

  return null;
};

export default function RootLayout() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <RootGuard />
          <Stack>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
