import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/home/profile/ProfileScreen";
import EditProfileScreen from "@/screens/home/profile/EditProfileScreen";

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Root" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="EditStudent" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
