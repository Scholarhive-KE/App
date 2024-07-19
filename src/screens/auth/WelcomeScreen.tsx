import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import Button from "../../components/common/Button";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView className="bg-lightBg h-screen justify-center ">
      <View className="w-full px-4 items-center gap-y-4 py-5">
        <Text className="text-primary font-bold text-3xl">SCHOLARHIVE</Text>
      </View>

      <View className="w-full py-5">
        <Image
          source={require("../../assets/images/welcome.png")}
          className="object-scale-down w-screen h-40"
        />
      </View>

      <View className="w-full px-4 items-center gap-y-6 py-5">
        <View className="w-full items-center gap-y-2 my-3">
          <Text className="text-3xl italic font-bold text-darkText">
            Welcome
          </Text>
          <Text className="text-base text-darkText font-medium text-center">
            Discover Verified Scholarships for Your Future
          </Text>
        </View>
        <Button
          onPress={handleRegister}
          label="Register"
          type="primary"
          size="full"
        />
        <Button
          onPress={handleLogin}
          label="Login"
          type="secondary"
          size="full"
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
