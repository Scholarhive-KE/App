// hooks/useStudent.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setStudent } from "../redux/slices/studentSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../constants/config";

interface StudentData {
  DOB: Date;
  citizenship: string;
  gender: string;
  educationLevel: "bachelors" | "masters";
  courseInterest: string;
}

export const useCreateStudent = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.profile.token);
  const navigate = useNavigation();
  return useMutation({
    mutationFn: async (studentData: StudentData) => {
      const response = await axios.post(`${BASE_URL}/students`, studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(setStudent(data.student));
      navigate.navigate("Root");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};

export const useEditStudent = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.profile.token);
  const navigate = useNavigation();
  return useMutation({
    mutationFn: async (studentData: StudentData) => {
      const response = await axios.put(`${BASE_URL}/students`, studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setStudent(data.data));
      navigate.goBack();
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};
