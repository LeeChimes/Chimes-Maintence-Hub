// frontend/app/index.tsx
import { useEffect } from "react";
import { View, Text } from "react-native";

const EMERGENT_URL = "https://qrscan-inventory.preview.emergentagent.com/";

export default function RedirectHome() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(EMERGENT_URL);
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Sending you to the app…</Text>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>{EMERGENT_URL}</Text>
    </View>
  );
}
