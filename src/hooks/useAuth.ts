import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/profileSlice";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../constants/config";

interface RegisterData {
  email: string;
  password: string;
  surname: string;
  otherNames: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserResponse {
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}

// Register user
export const useRegister = () => {
  const navigate = useNavigation();
  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const response = await axios.post<{ message: string }>(
        `${BASE_URL}/auth/register`,
        userData
      );
      return response.data;
    },
    onSuccess: (data) => {
      navigate.navigate("Login");
    },
    onError: (error: any) => {
      // Handle error
      console.error("Registration error:", error.response.data.message);
    },
  });
};

// Login user
export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (credentials: LoginData) => {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      // Dispatch action to update user state
      dispatch(setUser(data));
    },
    onError: (error: any) => {
      // Handle error
      console.error("Login error:", error.response.data.message);
    },
  });
};
