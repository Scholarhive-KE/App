import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useLogin } from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const { mutateAsync } = useLogin();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-lightBg h-screen justify-center items-center">
      <Text className="text-darkText font-bold text-3xl italic">LOGIN</Text>
      <View className="w-full py-5">
        <Image
          source={require("../../assets/images/login.png")}
          className="object-scale-down w-screen h-52"
        />
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        className="my-4 w-11/12 items-center"
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { name, onChange, value } }) => (
            <Input value={value} label={name} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { name, onChange, value } }) => (
            <Input value={value} label={name} onChange={onChange} password />
          )}
        />
      </KeyboardAvoidingView>
      <View className="w-11/12">
        <Button
          label="Login"
          onPress={handleSubmit(onSubmit)}
          type="primary"
          size="full"
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
