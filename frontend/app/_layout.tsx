import { Stack } from 'expo-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { AppErrorHandler } from '../utils/AppErrorHandler';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RootLayout() {
  useEffect(() => {
    // Initialize comprehensive error handling system
    AppErrorHandler.initialize();
  }, []);

  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="scanner" options={{ headerShown: false }} />
        <Stack.Screen name="inventory" options={{ headerShown: false }} />
        <Stack.Screen name="stock-take" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="add-item" options={{ headerShown: false }} />
        <Stack.Screen name="bulk-upload" options={{ headerShown: false }} />
        <Stack.Screen name="suppliers" options={{ headerShown: false }} />
        <Stack.Screen name="deliveries" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </ErrorBoundary>
  );
}