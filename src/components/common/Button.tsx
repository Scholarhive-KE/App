import { GestureResponderEvent, Pressable, Text } from "react-native";

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  type: "primary" | "secondary" | "base";
  label: string;
  size: "full" | "fit";
}
const Button = ({ onPress, type, label, size }: ButtonProps) => {
  return (
    <Pressable
      className={`my-2 px-4 py-2 items-center rounded-lg  ${
        type === "primary"
          ? "bg-primary"
          : type === "secondary"
          ? "bg-secondary"
          : "bg-orange-200"
      } ${size == "full" ? "w-full" : "w-fit"}`}
      onPress={onPress}
    >
      <Text className="text-darkText text-lg font-medium">{label}</Text>
    </Pressable>
  );
};

export default Button;
