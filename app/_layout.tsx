import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Slot } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const splashFontSize = SCREEN_WIDTH * 0.08; 

  useEffect(() => {
    async function loadResources() {
     
      await Font.loadAsync({
        BBHSansBartle: require("../assets/images/fonts/BBHSansBartle-Regular.ttf"),
        MontserratRegular: require("../assets/images/fonts/Montserrat-Regular.ttf"),
      });
      setFontsLoaded(true);

      
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();

      // Splash fade-out
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }).start(() => setShowSplash(false));
      }, 1500);

      return () => clearTimeout(timer);
    }

    loadResources();
  }, []);


  if (!fontsLoaded) return null;

  if (showSplash) {
    return (
      <LinearGradient
        colors={["#000000", "#290404", "#400707", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.splashContainer}
      >
        <Animated.Text
          style={[
            styles.splashText,
            { opacity, fontFamily: "BBHSansBartle", fontSize: splashFontSize },
          ]}
        >
          m o v i e z
        </Animated.Text>
      </LinearGradient>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    color: "lightgrey",
    textAlign: "center",
  },
});
