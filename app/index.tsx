import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  FadeInDown,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

/* ---------------- DATA ---------------- */

const stylesList = [
  { name: "Glass", path: "/glass/glass.screen" },
  { name: "Minimal", path: "/minimal/minimal.screen" },
  { name: "Clay", path: "/clay/clay.screen" },
  { name: "Liquid", path: "/liquid/liquid.screen" },
  { name: "Skew", path: "/skew/skew.screen" },
  { name: "Neomorphism", path: "/neo/neo.screen" },
];

/* ---------------- MOTION BACKGROUND ---------------- */

function MotionBackground({ touchX }: { touchX: SharedValue<number> }) {
  const move1 = useSharedValue(-100);
  const move2 = useSharedValue(150);

  React.useEffect(() => {
    move1.value = withRepeat(withTiming(200, { duration: 6000 }), -1, true);
    move2.value = withRepeat(withTiming(-200, { duration: 8000 }), -1, true);
  }, []);

  const style1 = useAnimatedStyle(() => ({
    transform: [
      { translateY: move1.value },
      {
        translateX: interpolate(touchX.value, [0, width], [-40, 40]),
      },
    ],
  }));

  const style2 = useAnimatedStyle(() => ({
    transform: [
      { translateY: move2.value },
      {
        translateX: interpolate(touchX.value, [0, width], [40, -40]),
      },
    ],
  }));

  return (
    <>
      <Animated.View style={[styles.blob, style1]}>
        <LinearGradient
          colors={["#ff6ec4", "#7873f5"]}
          style={styles.blobInner}
        />
      </Animated.View>

      <Animated.View style={[styles.blob2, style2]}>
        <LinearGradient
          colors={["#42e695", "#3bb2b8"]}
          style={styles.blobInner}
        />
      </Animated.View>
    </>
  );
}

/* ---------------- HOME ---------------- */

export default function Home() {
  const touchX = useSharedValue(width / 2);

  return (
    <View
      style={styles.container}
      onTouchMove={(e) => {
        touchX.value = e.nativeEvent.locationX;
      }}
    >
      <MotionBackground touchX={touchX} />

      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>UI Effects</Text>
          <Text style={styles.subtitle}>Modern Design Showcase</Text>
        </View>

        <FlatList
          data={stylesList}
          numColumns={2}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 120)}
              style={{ flex: 1 }}
            >
              <EffectCard item={item} index={index} />
            </Animated.View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function EffectCard({ item, index }: any) {
  const scale = useSharedValue(1);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { perspective: 600 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    rotateX.value = withSpring(0);
    rotateY.value = withSpring(0);
  };

  const onTouchMove = (e: any) => {
    const { locationX, locationY } = e.nativeEvent;
    rotateY.value = interpolate(locationX, [0, 160], [-10, 10]);
    rotateX.value = interpolate(locationY, [0, 170], [10, -10]);
  };

  const containerStyle = getCardContainer(index);
  const titleStyle = getTitleStyle(index);

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onTouchMove={onTouchMove}
      onPress={() => router.push(`/(styles)${item.path}` as any)}
      style={{ flex: 1 }}
    >
      <Animated.View style={animatedStyle}>
        {index === 0 ? (
          /* GLASS */
          <View style={containerStyle}>
            <LinearGradient
              colors={["rgba(255,255,255,0.25)", "rgba(255,255,255,0.05)"]}
              style={StyleSheet.absoluteFill}
            />
            <BlurView
              intensity={90}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              colors={["rgba(255,255,255,0.6)", "transparent"]}
              style={styles.glassReflection}
            />
            <Text style={titleStyle}>{item.name}</Text>
          </View>
        ) : index === 3 ? (
          /* LIQUID ANIMATED */
          <AnimatedLiquid
            containerStyle={containerStyle}
            titleStyle={titleStyle}
            name={item.name}
          />
        ) : (
          <View style={containerStyle}>
            <Text style={titleStyle}>{item.name}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

/* ---------------- ANIMATED LIQUID ---------------- */

function AnimatedLiquid({ containerStyle, titleStyle, name }: any) {
  const shift = useSharedValue(0);

  React.useEffect(() => {
    shift.value = withRepeat(withTiming(1, { duration: 4000 }), -1, true);
  }, []);

  const animatedGradient = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(shift.value, [0, 1], [-20, 20]),
      },
    ],
  }));

  return (
    <View style={containerStyle}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedGradient]}>
        <LinearGradient
          colors={["#4facfe", "#00f2fe", "#43e97b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Text style={titleStyle}>{name}</Text>
    </View>
  );
}

/* ---------------- STYLE HELPERS ---------------- */

function getCardContainer(index: number): ViewStyle {
  switch (index) {
    case 0:
      return {
        margin: 10,
        height: 170,
        borderRadius: 28,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.4)",
        backgroundColor: "rgba(255,255,255,0.08)",
        justifyContent: "center",
        alignItems: "center",
      };
    case 1:
      return {
        margin: 10,
        height: 170,
        borderRadius: 6,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      };
    case 2:
      return {
        margin: 10,
        height: 170,
        borderRadius: 35,
        backgroundColor: "#ffd6e0",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#ff9bb3",
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
      };
    case 3:
      return {
        margin: 10,
        height: 170,
        borderRadius: 50,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      };
    case 4:
      return {
        margin: 10,
        height: 170,
        borderRadius: 12,
        backgroundColor: "#1f1f1f",
        justifyContent: "center",
        alignItems: "center",
        transform: [{ rotate: "-5deg" }],
      };
    case 5:
      return {
        margin: 10,
        height: 170,
        borderRadius: 25,
        backgroundColor: "#2c2c2c",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        elevation: 15,
      };
    default:
      return {};
  }
}

function getTitleStyle(index: number): TextStyle {
  return {
    fontSize: 18,
    fontWeight: "700",
    color: index === 1 ? "#111" : "#fff",
    letterSpacing: 1,
  };
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  safe: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#cbd5e1",
    marginTop: 6,
  },
  blob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.4,
    top: 100,
    left: -50,
  },
  blob2: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    opacity: 0.35,
    bottom: 50,
    right: -80,
  },
  blobInner: {
    flex: 1,
    borderRadius: 999,
  },
  glassReflection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "60%",
    height: "60%",
    borderTopLeftRadius: 28,
  },
});
