import { Stack } from 'expo-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { AppErrorHandler } from '../utils/AppErrorHandler';
import { useEffect } from 'react';

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
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </ErrorBoundary>
  );
}