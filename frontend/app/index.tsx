// frontend/app/index.tsx
// Force the home route ("/") to render the Inventory screen component directly.
import Inventory from "./inventory";

export default function Index() {
  return <Inventory />;
}
