import React, { useEffect, useRef, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { FadeOutDown, FadeInDown, FadeOut } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import NumPad from "../../components/Common/NumPad";
import { useAnimatedShake } from "../../util/hooks/useShakeAnimation";
import { SafeAreaView, Text, View } from "../../components/Tailwind";
import Visible from "../../components/Common/Visibility";
import { cn } from "../../util/cn";
import { useSettings } from "../../states/settings";
import { useAppStateStore } from "../../states/appState";
import { useStore } from "zustand";

type InputField = {
  value: number | null;
  focused: boolean;
  filled: boolean;
  isInavlid: boolean;
  isValid: boolean;
};

const InputField: React.FC<InputField> = ({
  value,
  filled,
  focused,
  isInavlid,
  isValid,
}) => {
  return (
    <View
      className={cn(
        "w-[50px] flex items-center justify-center h-[50px] mx-2 border border-slate-300 rounded-lg",
        {
          "border-red-500": isInavlid,
          "border-blueDefault": isValid,
        }
      )}
    >
      <Visible condition={value !== null}>
        <Animated.Text
          entering={FadeInDown.duration(100)}
          exiting={FadeOutDown.duration(100)}
          style={[style.textFieldValue, isInavlid && style.redText]}
        >
          *
        </Animated.Text>
      </Visible>
    </View>
  );
};

const passcodeAreaInitialValue: {
  value: number | null;
  focused: boolean;
  filled: boolean;
}[] = [
  { value: null, focused: false, filled: false },
  { value: null, focused: false, filled: false },
  { value: null, focused: false, filled: false },
  { value: null, focused: false, filled: false },
  { value: null, focused: false, filled: false },
];

const LockeScreen = () => {
  const { shake, rStyle } = useAnimatedShake();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isvalid, setIsValid] = useState(false);
  const [passcodeArea, setPassCodeArea] = useState(passcodeAreaInitialValue);
  const valueRef = useRef<number | null | string>(0);
  const { password } = useSettings();
  const { unlockApplication } = useStore(useAppStateStore);

  console.log(valueRef.current);

  const clearInputs = () => {
    let preValue = [...passcodeArea];
    preValue = preValue.map((currentElement) => ({
      ...currentElement,
      value: null,
    }));
    setPassCodeArea(passcodeArea);
    valueRef.current = null;
  };

  const handleInputChange = (value: number) => {
    const preValue = [...passcodeArea];
    const findEmptyField = preValue.findIndex((el) => el.value === null);

    if (findEmptyField !== -1) {
      preValue[findEmptyField].value = value;
      setPassCodeArea(preValue);
    }

    valueRef.current = preValue
      .map((el) => el.value?.toString())
      .join("")
      .toString();
  };

  const handleDelete = () => {
    let preValue = [...passcodeArea];
    const findEmptyField = preValue.findLastIndex((el) => el.value !== null);

    //clear if completed and invalid
    if (
      valueRef.current &&
      isInvalid &&
      valueRef.current.toString().length === 5
    ) {
      clearInputs();
      console.log("clear inputs");
    }

    if (findEmptyField !== -1) {
      preValue[findEmptyField].value = null;
      setPassCodeArea(preValue);
    }
    valueRef.current = Number(preValue.map((el) => el.value).join(""));
  };

  useEffect(() => {
    setIsInvalid(false);
    console.log(valueRef.current, "key stroke");
    console.log(password, "password");

    if (
      valueRef.current?.toString().length === 5 &&
      valueRef.current.toString() !== password.toString()
    ) {
      setIsInvalid(true);
      shake();
    }

    if (valueRef.current === password) {
      setIsValid(true);
      setTimeout(() => {
        unlockApplication();
        clearInputs();
      }, 100);
    }

    if (valueRef.current && valueRef.current.toString().length < 5) {
      setIsValid(false);
    }
  }, [valueRef.current]);

  const authorizeWithBiometricCredentials = async () => {
    const authorize = await LocalAuthentication.authenticateAsync();
    if (authorize.success) {
      unlockApplication();
    }
  };

  return (
    <SafeAreaView className="flex-1 flex flex-columns justify-between">
      <View className="justify-center flex-col gap-6 flex-1 mt-7">
        <Text style={{ fontFamily: "Nunito-SemiBold" }} className="text-center">
          Enter passcode
        </Text>

        <Animated.View style={[style.textFieldContainer, rStyle]}>
          {passcodeArea.map((inpput, index) => (
            <InputField
              isValid={isvalid}
              isInavlid={isInvalid}
              {...inpput}
              key={"passcode-field-input" + index}
            />
          ))}
        </Animated.View>
        <Text className="text-center" style={{ fontFamily: "Nunito-Regular" }}>
          Extra layer of security
        </Text>
      </View>

      <NumPad
        onDelete={handleDelete}
        onChange={handleInputChange}
        onpressBiomtricAuthorization={authorizeWithBiometricCredentials}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textFieldContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  textFieldValue: {
    fontSize: 30,
    position: "relative",
    top: 5,
  },

  redText: {
    color: "#ee1717",
  },
});

export default LockeScreen;
