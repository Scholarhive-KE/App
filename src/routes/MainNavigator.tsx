// App.tsx
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import { getProfile, getStudentProfile } from "../services/apiService";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/profileSlice";
import { setStudent } from "../redux/slices/studentSlice";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ScholarshipNavigator from "./ScholarshipNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const MainStack = createBottomTabNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.profile.token);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigation();

  const checkProfile = async () => {
    try {
      const result = await getProfile(token);
      if (result.status == "success") {
        if (result.data.profile.role == "user") {
          navigate.navigate("create-student");
        } else if (result.data.profile.role !== "student") {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    } catch (err) {
      dispatch(logout());
    }
  };
  const fetchStudent = async () => {
    try {
      const result = await getStudentProfile(token);
      if (result.status == "success") {
        console.log("student", result.data);
        dispatch(setStudent(result.data));
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkProfile();
    fetchStudent();
    setChecked(true);
  }, []);

  return checked ? (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#D4A373",
        tabBarStyle: {
          backgroundColor: "#1D1D1D",
          borderTopWidth: 0,
        },
        unmountOnBlur: true,
      }}
    >
      <MainStack.Screen
        name="Root"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <MainStack.Screen
        name="Scholarship"
        component={ScholarshipNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="money" size={size} color={color} />
          ),
        }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </MainStack.Navigator>
  ) : (
    <Text>Loading</Text>
  );
};

export default MainNavigator;
