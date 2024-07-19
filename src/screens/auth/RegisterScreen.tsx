import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRegister } from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/common/Button";

type Inputs = {
  surname: string;
  otherNames: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen: React.FC = () => {
  const { mutateAsync } = useRegister();

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
      <Text className="text-darkText font-bold text-3xl italic">
        Create Account
      </Text>
      <View className="my-4 w-11/12 items-center"></View>
      <KeyboardAvoidingView behavior="padding" className="w-11/12 flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            control={control}
            name="surname"
            render={({ field: { name, onChange, value } }) => (
              <Input value={value} onChange={onChange} label="Surname" />
            )}
          />
          <Controller
            control={control}
            name="otherNames"
            render={({ field: { name, onChange, value } }) => (
              <Input value={value} onChange={onChange} label="Other Names" />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { name, onChange, value } }) => (
              <Input value={value} onChange={onChange} label="Email" />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { name, onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Password"
                password
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { name, onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Confirm Password"
                password
              />
            )}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="w-11/12">
        <Button
          label="Register"
          type="primary"
          onPress={handleSubmit(onSubmit)}
          size="full"
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
