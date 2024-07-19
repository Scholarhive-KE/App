import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";

interface InfoRowProps {
  label: string;
  value: string;
  Icon?: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, Icon }) => (
  <View className="flex-row justify-between my-2 items-center">
    <View className="flex-row gap-x-2 items-center">
      {Icon}
      <Text className=" text-lg mr-2 text-darkText">{label}</Text>
    </View>

    <Text className="text-lg font-bold text-darkText">{value}</Text>
  </View>
);

export default InfoRow;
