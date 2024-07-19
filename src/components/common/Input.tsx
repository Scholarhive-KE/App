import { Text, TextInput, View } from "react-native";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  label: string;
  password?: boolean;
}
const Input = ({ value, onChange, label, password }: InputProps) => {
  return (
    <View className="gap-y-2 my-2 w-full">
      <Text className="text-lg font-medium ">{label}</Text>
      <TextInput
        className="px-4 py-3 border rounded-md text-darkText bg-lightText font-medium justify-center"
        placeholder={label}
        secureTextEntry={password}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default Input;
