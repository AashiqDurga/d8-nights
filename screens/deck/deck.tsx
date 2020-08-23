import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  SafeAreaView,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import { Layout, TopNavigation, Divider } from "@ui-kitten/components/ui";
const Users = [
  { id: "1", uri: require("./assets/1.jpg") },
  { id: "2", uri: require("./assets/2.jpg") },
  { id: "3", uri: require("./assets/3.jpg") },
  { id: "4", uri: require("./assets/4.jpg") },
  { id: "5", uri: require("./assets/5.jpg") },
];


export default function deck() {
  const position = new Animated.ValueXY();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    position.setValue({ x: 0, y: 0 })
  }, [currentIndex]);

   const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });

   const  rotateAndTranslate = {
      transform: [
        {
          rotate: rotate,
        },
        ...position.getTranslateTransform(),
      ],
    };


    const likeOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });
    const dislikeOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    });

    const nextCardOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp",
    });
    const nextCardScale = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp",
    });

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(  position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex( currentIndex + 1 );
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex( currentIndex + 1 );
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    });

    const renderUsers = () => {
      return Users.map((item, i) => {
        if (i < currentIndex) {
          return null;
        } else if (i == currentIndex) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              key={item.id}
              style={[
                rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute",
                },
              ]}
            >
              <Animated.View
                style={{
                  opacity: likeOpacity,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000,
                }}
              >
                <Text
                  style={{
                    fontSize: 62,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  😍
                </Text>
              </Animated.View>
  
              <Animated.View
                style={{
                  opacity: dislikeOpacity,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000,
                }}
              >
                <Text
                  style={{
                    fontSize: 62,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  😥
                </Text>
              </Animated.View>
  
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={item.uri}
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  opacity: nextCardOpacity,
                  transform: [{ scale: nextCardScale }],
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute",
                },
              ]}
            >
              <Animated.View
                style={{
                  opacity: 0,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000,
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "green",
                    color: "green",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  LIKE
                </Text>
              </Animated.View>
  
              <Animated.View
                style={{
                  opacity: 0,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000,
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "red",
                    color: "red",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  NO D8
                </Text>
              </Animated.View>
  
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={item.uri}
              />
            </Animated.View>
          );
        }
      }).reverse();
    };
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <TopNavigation title="D8 Nights" alignment="center" />
    <Divider />
    <Layout
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {renderUsers()}
    </Layout>
  </SafeAreaView>
  )
}
