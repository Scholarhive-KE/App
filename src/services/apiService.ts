import axios from "axios";
import { BASE_URL } from "../constants/config";

export const getStudentProfile = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/students/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getScholarships = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/scholarships`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getCourses = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getScholarshipRatings = async (token: string, id: string) => {
  const response = await axios.get(`${BASE_URL}/scholarships/${id}/rating`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addRating = async (token: string, id: string, data) => {
  const response = await axios.post(
    `${BASE_URL}/scholarships/${id}/rating`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
