import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  Pressable,
} from "../../components/Tailwind";
import Button from "../../components/Widgets/Button";
import { useAuthSetps } from "../../states/authSteps.state";
import { cn } from "../../util/cn";
import { Platform } from "react-native";

const SeedPhraseSetUpEnd = () => {
  const navigation = useNavigation();
  const { updateSteps } = useAuthSetps();

  useEffect(() => {
    navigation.addListener("focus", () => updateSteps(4));
  }, []);
  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View
        className={cn("h-full flex-1", {
          "px-6": Platform.OS === "ios",
        })}
      >
        <Image
          className="mx-auto w-[150px] h-[150px] mt-20 mb-4"
          source={require("../../assets/images/3d-fluency-partying-face.png")}
        />

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-[18px] mb-3 text-slate-800"
        >
          Congratulations
        </Text>
        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="w-10/12 leading-5 text-slate-700"
        >
          you've successfully protexted your wallet. Remember to keep your seed
          phrase safe, it's your responsibility!
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="text-blue-500 my-5 underline"
        >
          Leave yourself a hint?
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Regular" }}
          className="text-slate-700 text-base"
        >
          Cryptooly cannot recover your wallet should you lose it. You can find
          your seedphrase in
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="mt-5 text-[16px] text-black"
        >
          Setting {">"} Security & Privacy
        </Text>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="my-6 text-blue-500 text-[17px]"
        >
          Learn more
        </Text>

        <View className="flex-1 justify-end mb-4">
          <Button label="Continute" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SeedPhraseSetUpEnd;
