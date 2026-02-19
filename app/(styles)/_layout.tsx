import { Drawer } from "expo-router/drawer";

export default function StylesLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#111" },
        headerTintColor: "#fff",
        drawerStyle: { backgroundColor: "#111" },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#888",
      }}
    >
      <Drawer.Screen
        name="glass/glass.screen"
        options={{ title: "Glass Morphism" }}
      />
      <Drawer.Screen
        name="minimal/minimal.screen"
        options={{ title: "Minimalism" }}
      />
      <Drawer.Screen
        name="clay/clay.screen"
        options={{ title: "Clay Morphism" }}
      />
      <Drawer.Screen
        name="liquid/liquid.screen"
        options={{ title: "Liquid Glass" }}
      />
      <Drawer.Screen
        name="skew/skew.screen"
        options={{ title: "Skew Morphism" }}
      />
      <Drawer.Screen name="neo/neo.screen" options={{ title: "Neomorphism" }} />
    </Drawer>
  );
}
