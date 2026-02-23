import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/* ---------------- ANIMATED GRADIENT BACKGROUND ---------------- */

function AnimatedGradientBackground() {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 8000 }), -1, true);
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill]}>
      <LinearGradient
        colors={["#003a53", "#00c6ff", "#0e31419c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "150%",
          height: "150%",
        }}
      />
    </Animated.View>
  );
}

/* ---------------- GLASS CARD ---------------- */

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.cardContainer}>
      <BlurView intensity={60} tint="light" />

      <LinearGradient
        colors={["rgba(255,255,255,0.35)", "rgba(255,255,255,0.05)"]}
        style={StyleSheet.absoluteFill}
      />

      {children}
    </View>
  );
}

/* ---------------- SCREEN ---------------- */

export default function GlassScreen() {
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <AnimatedGradientBackground />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <GlassCard>
          <View style={styles.header}>
            <Text style={styles.title}>My Dashboard</Text>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=3",
              }}
              style={styles.avatar}
            />
          </View>
        </GlassCard>

        {/* BALANCE */}
        <GlassCard>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$24,589.00</Text>
        </GlassCard>

        {/* STATS */}
        <GlassCard>
          <Text style={styles.sectionTitle}>Statistics</Text>

          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$12k</Text>
              <Text style={styles.statLabel}>Income</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$4k</Text>
              <Text style={styles.statLabel}>Expenses</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$8k</Text>
              <Text style={styles.statLabel}>Savings</Text>
            </View>
          </View>
        </GlassCard>

        {/* ACTIONS */}
        <GlassCard>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionsRow}>
            <View style={styles.actionButton}>
              <Text style={styles.actionText}>Send</Text>
            </View>
            <View style={styles.actionButton}>
              <Text style={styles.actionText}>Receive</Text>
            </View>
            <View style={styles.actionButton}>
              <Text style={styles.actionText}>Pay</Text>
            </View>
          </View>
        </GlassCard>

        {/* RECENT */}
        <GlassCard>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityItem}>
            <Text style={styles.activityName}>Netflix</Text>
            <Text style={styles.activityAmount}>-$19.99</Text>
          </View>

          <View style={styles.activityItem}>
            <Text style={styles.activityName}>Salary</Text>
            <Text style={styles.activityAmountPositive}>+$3,200</Text>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    gap: 20,
  },

  cardContainer: {
    borderRadius: 25,
    padding: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },

  balanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },

  balanceAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
  },

  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  activityName: {
    color: "#fff",
  },

  activityAmount: {
    color: "#ff6b6b",
    fontWeight: "600",
  },

  activityAmountPositive: {
    color: "#4ade80",
    fontWeight: "600",
  },
});
