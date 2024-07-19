// App.tsx
import React from "react";
import ScholarshipCatalog from "../screens/home/scholarships/HomeScreen";
import ScholarshipDetail from "../screens/home/scholarships/DetailScreen";
import { createStackNavigator } from "@react-navigation/stack";

const ScholarshipStack = createStackNavigator();

const ScholarshipNavigator = () => {
  return (
    <ScholarshipStack.Navigator screenOptions={{ headerShown: false }}>
      <ScholarshipStack.Screen name="Root" component={ScholarshipCatalog} />
      <ScholarshipStack.Screen name="Details" component={ScholarshipDetail} />
    </ScholarshipStack.Navigator>
  );
};

export default ScholarshipNavigator;
