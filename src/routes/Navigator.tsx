// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import CreateStudentScreen from "../screens/studentScreen";

const AppStack = createStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.profile.isAuthenticated
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Root" component={MainNavigator} />
          <AppStack.Screen
            name="create-student"
            component={CreateStudentScreen}
          />
        </AppStack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
