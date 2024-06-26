import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import CurrencyHomeList from "../components/CurrencyHomeList";
import ShareControls from "../components/Common/ShareControls";
import { StatusBar } from "../components/Common/StatusBar";


import Animated, {
  useScrollViewOffset,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "../components/Tailwind";
import Visible from "../components/Common/Visibility";

const Home = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);
  const top = useSharedValue(-100);

  const scrollView = () => {
    if (scrollOffset.value > 227) {
      top.value = withTiming(0);
    } else {
      top.value = withTiming(-100);
    }
  };

  return (
      <SafeAreaView className="flex-1 relative bg-white">
        <StatusBar />
        <Animated.View
          style={{
            paddingHorizontal: 15,
            backgroundColor: "white",
            borderBottomWidth: 0.5,
            borderColor: "#0000001a",
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: top,
            zIndex: 30,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View className="py-2 flex-1  bg-white">
            <Pressable
              onPress={() => {}}
              android_ripple={{ color: "#ffffff33" }}
              className="h-12 px-4 bg-slate-100   flex-row flex w-full items-center rounded-lg"
            >
              <EvilIcons name="search" size={24} color="#64748b" />
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-slate-500 ml-2"
              >
                Search
              </Text>
            </Pressable>
          </View>

          <TouchableOpacity className="bg-slate-200 p-2 h-[45px] w-[45px] justify-center items-center rounded-lg">
            <AntDesign name="scan1" size={22} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-slate-200 p-2 h-[45px] w-[45px] justify-center items-center rounded-lg">
            <Feather name="copy" size={18} color="#64748b" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.ScrollView onScroll={scrollView} ref={animatedRef}>
          <View className="px-4">
            <Pressable
              onPress={() => {}}
              android_ripple={{ color: "#ffffff33" }}
              className="h-14 bg-slate-100 flex-row flex px-4 items-center my-6 rounded-lg"
            >
              <EvilIcons name="search" size={24} color="#64748b" />
              <Text
                style={{ fontFamily: "Nunito-Regular" }}
                className="text-slate-500 ml-2"
              >
                Search
              </Text>
            </Pressable>
          </View>

          <View className="flex mt-5 px-7 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => setHideBalance(!hideBalance)}
              className="flex relative left-2 flex-row gap-2 items-center"
            >
              <Visible condition={!hideBalance}>
                <View className="flex flex-row items-center">
                  <Text className="text-[34px] text-slate-600">$</Text>
                  <Text
                    style={{ fontFamily: "Nunito-ExtraBold" }}
                    className="text-[30px] text-slate-500"
                  >
                    {10000.0}
                  </Text>
                </View>
              </Visible>

              <Visible condition={hideBalance}>
                <View className=" text-slate-700 flex flex-row gap-2">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <View
                      key={"hide-dots-" + index}
                      className="h-2 w-2 bg-black/60 rounded-full"
                    />
                  ))}
                </View>
              </Visible>
              <Feather
                name={hideBalance ? "eye-off" : "eye"}
                size={20}
                color="#64748b"
                style={{ position: "relative", bottom: 5 }}
              />
            </TouchableOpacity>

            <View className="flex flex-row gap-3">
              <TouchableOpacity className="bg-slate-200 p-2 rounded-lg">
                <AntDesign name="scan1" size={18} color="#64748b" />
              </TouchableOpacity>

              <TouchableOpacity className="bg-slate-200 p-2 rounded-lg">
                <Feather name="copy" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-10 px-5">
            <ShareControls />
          </View>

          <View className="mt-4" />
          <CurrencyHomeList />
        </Animated.ScrollView>
      </SafeAreaView>
  );
};

export default Home;
