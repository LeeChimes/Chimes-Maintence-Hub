// frontend/app/_layout.tsx
import { Stack, router } from "expo-router";
import React, { useEffect } from "react";
import { TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AppErrorHandler } from "../utils/AppErrorHandler";

/**
 * Small boot shim:
 * - Reads EXPO_PUBLIC_API_BASE_URL
 * - Exposes it on global/window under several common names
 * - Rewrites bad fetches like "/undefined/api/..." to the correct base
 */
function useApiBaseBootShim() {
  useEffect(() => {
    const envBase =
      // Expo Web (Vite/Metro for web exposes EXPO_PUBLIC_* at build time)
      (process as any)?.env?.EXPO_PUBLIC_API_BASE_URL ??
      // Also check import.meta.env if Vite is in play
      (typeof import.meta !== "undefined"
        ? (import.meta as any).env?.EXPO_PUBLIC_API_BASE_URL
        : undefined);

    const fallbackFromLocation =
      typeof window !== "undefined" ? window.location.origin : undefined;

    const API_BASE: string | undefined = envBase || fallbackFromLocation;

    // Make it visible for any legacy code that looks on global/window
    const g: any =
      typeof window !== "undefined" ? window : (globalThis as any);

    g.API_BASE = API_BASE;
    g.API_BASE_URL = API_BASE;
    g.BASE_URL = API_BASE;
    g.SERVER_URL = API_BASE;

    // Helpful debug so we can see it in the console
    // (Safe to keep; remove later if you prefer)
    // eslint-disable-next-line no-console
    console.log("🔌 API base resolved:", API_BASE);

    // Monkey-patch fetch on web to fix "/undefined/api/*" at runtime
    if (typeof window !== "undefined" && typeof window.fetch === "function") {
      const realFetch = window.fetch.bind(window);
      window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
        try {
          if (typeof input === "string") {
            // Case 1: exactly starts with "/undefined/api"
            if (input.startsWith("/undefined/api") && API_BASE) {
              const fixed = API_BASE + input.replace("/undefined", "");
              // eslint-disable-next-line no-console
              console.warn("🛠️ Rewrote fetch URL →", input, "→", fixed);
              return realFetch(fixed, init);
            }
            // Case 2: accidentally prefixed with "/" + absolute URL (rare)
            if (API_BASE && input.startsWith("/http")) {
              const fixed = input.slice(1); // remove leading slash
              // eslint-disable-next-line no-console
              console.warn("🛠️ Normalized fetch URL →", input, "→", fixed);
              return realFetch(fixed, init);
            }
          }
        } catch {
          // ignore; fall through to real fetch
        }
        return realFetch(input as any, init);
      };
    }
  }, []);
}

export default function RootLayout() {
  useEffect(() => {
    // Initialize comprehensive error handling system
    AppErrorHandler.initialize();
  }, []);

  // Install the API base shim + fetch fixer
  useApiBaseBootShim();

  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: Platform.select({
            ios: "slide_from_right",
            android: "slide_from_right",
            default: "fade",
          }),
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="scanner" options={{ headerShown: false }} />
        <Stack.Screen name="inventory" options={{ headerShown: false }} />
        <Stack.Screen name="stock-take" options={{ headerShown: false }} />
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: true,
            title: "Smart Dashboard",
            headerStyle: { backgroundColor: "#2d2d2d" },
            headerTintColor: "#fff",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/help")}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="help-circle" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="add-item" options={{ headerShown: false }} />
        <Stack.Screen name="bulk-upload" options={{ headerShown: false }} />
        <Stack.Screen name="suppliers" options={{ headerShown: false }} />
        <Stack.Screen name="deliveries" options={{ headerShown: false }} />
        <Stack.Screen name="audit-log" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen
          name="contact-supervisors"
          options={{ headerShown: false }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
