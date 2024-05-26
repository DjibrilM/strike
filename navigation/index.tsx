import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import OnboardingScreen from "../screens/ OnboardingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletSetup from "../screens/Auth/WalletSetup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { routes } from "../util/shared/constant";
import { AuthScreenHeader } from "./configs";
import SecurityConfig from "../screens/Auth/PasswordConfig";
import SeedPhraseSetupReminder from "../screens/Auth/SeedPhraseSetupReminder";
import SeedPhraseGeneration from "../screens/Auth/SeedPhraseGeneration";
import SeedPhraseRevelation from "../screens/Auth/SeedPhraseRevelation";
import SeedPhraseMatchTest from "../screens/Auth/SeedPhraseMatchTest";
import SeedPhraseSetUpEnd from "../screens/Auth/SeedPhraseSetUpEnd";
import ImportExistingSeedPhrase from "../screens/Auth/ImportExistingSeedPhrase";
import { View } from "../components/Tailwind";
import { Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.OnboardingScreen}>
        <Stack.Screen
          options={{
            header: () => {
              const { goBack } = useNavigation();
              return (
                <SafeAreaView style={{ backgroundColor: "white" }}>
                  <View className="border-b flex justify-center px-4 border-slate-200 h-[70px]">
                    <Pressable onPress={goBack}>
                      <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        color="#1354fe"
                      />
                    </Pressable>
                  </View>
                </SafeAreaView>
              );
            },
          }}
          name={routes.walletSetup}
          component={WalletSetup}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name={routes.OnboardingScreen}
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{
            header: () => {
              const { goBack } = useNavigation();
              return (
                <SafeAreaView style={{ backgroundColor: "white" }}>
                  <View className="border-b flex justify-center px-4 border-slate-200 h-16">
                    <TouchableOpacity onPress={goBack}>
                      <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        color="#1354fe"
                      />
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              );
            },
          }}
          name={routes.securityConfig}
          component={SecurityConfig}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.seedPhraseSetupReminder}
          component={SeedPhraseSetupReminder}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.seedPhraseGenerationPage}
          component={SeedPhraseGeneration}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.seedPhraseRevelation}
          component={SeedPhraseRevelation}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.seedPhraseMatchTest}
          component={SeedPhraseMatchTest}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.SeedPhraseSetUpEnd}
          component={SeedPhraseSetUpEnd}
        />

        <Stack.Screen
          options={{
            header: () => {
              const { goBack } = useNavigation();
              return Platform.OS === "android" ? (
                <SafeAreaView style={{ backgroundColor: "white" }}>
                  <View className="border-b flex justify-center px-4 border-slate-200 h-[70px]">
                    <TouchableOpacity onPress={goBack}>
                      <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        color="#1354fe"
                      />
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              ) : (
                <></>
              );
            },

            headerShadowVisible: false,
            animation: Platform.OS === "ios" ? "slide_from_bottom" : "default",
            fullScreenGestureEnabled: true,
            gestureDirection: "vertical",
            gestureEnabled: true,
            headerShown: Platform.OS === "ios" ? false : true,
            title: "",
            presentation: "modal",
          }}
          name={routes.seedPhraseImportantion}
          component={ImportExistingSeedPhrase}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
