import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import InfoRow from "@/components/profile/InfoRow";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/common/Button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/profileSlice";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const student = useSelector((state: RootState) => state.student.student);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-lightBg gap-y-6 items-center">
      <Text className="text-3xl font-bold text-primary">SCHOLARHIVE</Text>
      <View className="border-b-2 px-3 pb-3 gap-y-3 w-full">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold my-2 text-darkBg">
            Profile Information
          </Text>
          {/* <Button
            label="Edit"
            size="fit"
            type="primary"
            onPress={() => navigation.navigate("EditProfile")}
          /> */}
        </View>
        <InfoRow
          label="Name"
          value={profile?.name}
          Icon={<MaterialIcons name="person" size={18} color="black" />}
        />
        <InfoRow
          label="Email"
          value={profile?.email}
          Icon={<MaterialIcons name="mail" size={18} color="black" />}
        />
      </View>
      <View className="px-3 pb-3 w-full">
        <View className="flex-row justify-between items-center mb-2 gap-y-4">
          <Text className="text-xl font-bold my-2 text-darkBg">
            Your Student Info
          </Text>
          <Button
            label="Edit"
            size="fit"
            type="primary"
            onPress={() => navigation.navigate("EditProfile")}
          />
        </View>
        <InfoRow
          label="Date Of Birth"
          value={new Date(student?.DOB)?.toLocaleDateString()}
          Icon={
            <MaterialIcons
              name="perm-contact-calendar"
              size={18}
              color="black"
            />
          }
        />
        <InfoRow
          label="Citizenship"
          value={student?.citizenship}
          Icon={<MaterialIcons name="trip-origin" size={18} color="black" />}
        />
        <InfoRow
          label="Education Level"
          value={student?.educationLevel}
          Icon={
            <MaterialCommunityIcons
              name="book-education"
              size={18}
              color="black"
            />
          }
        />
        <InfoRow
          label="Gender"
          value={student?.gender}
          Icon={
            <MaterialCommunityIcons
              name="gender-female"
              size={18}
              color="black"
            />
          }
        />
      </View>
      <View className="flex-1 justify-end w-full px-2">
        <Button
          label="Logout"
          onPress={() => dispatch(logout())}
          type="base"
          size="full"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
