import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getCourses, getScholarships } from "../../services/apiService";
import { setCourses } from "../../redux/slices/courseSlice";
import { setScholarships } from "../../redux/slices/scholarshipSlice";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { extractInstitutions } from "../../utils/extractors";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const courses = useSelector((state: RootState) => state.course.courses);
  const scholarships = useSelector(
    (state: RootState) => state.scholarship.scholarships
  );
  const institutions = extractInstitutions(scholarships);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [scholarshipsLoading, setScholarshipsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.profile.token);

  const fetchScholarships = async () => {
    try {
      const result = await getScholarships(token);

      if (result.status == "success") {
        dispatch(setScholarships(result.data.scholarships));
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchCourses = async () => {
    try {
      const result = await getCourses(token);
      if (result.status == "success") {
        dispatch(setCourses(result.data.courses));
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setScholarshipsLoading(true);
    fetchScholarships();
    setScholarshipsLoading(false);
  }, []);

  useEffect(() => {
    setCoursesLoading(true);
    fetchCourses();
    setCoursesLoading(false);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Scholarship", {
            screen: "Details",
            params: {
              scholarship: item,
            },
          })
        }
        className="border rounded-md w-72 mr-2"
      >
        <View className="bg-secondary p-3">
          <Text className="font-bold text-darkBgs">
            {item.institution.name}
          </Text>
        </View>
        <View className="p-3">
          <Text className="font-bold text-xl text-primary">{item.name}</Text>
          <View className="py-3 flex-row justify-between">
            <View className="gap-y-2">
              <Text className="text-lg">{item.courseInterest.name}</Text>
              <Text className="font-bold">{item.levelOfEducation}</Text>
              <Text className="text-darkText font-bold text-lg">
                {new Date(item.deadline).toLocaleDateString()}
              </Text>
            </View>
            <View className="gap-y-2 justify-center">
              <Text className="font-bold text-lg">{item.awardAmount} Ksh</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderInstitutionItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        className="px-1 py-2 mr-3 bg-secondary rounded-lg gap-y-2 w-56 justify-center items-center"
        onPress={() =>
          navigation.navigate("Scholarship", {
            params: {
              queryName: "course",
              queryValue: item._id,
            },
          })
        }
      >
        <Text className="text-lg font-bold text-darkText">{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderCourseItem = ({ item }) => {
    return (
      <TouchableOpacity
        className="p-4 bg-primary rounded-lg gap-y-2 w-32 mr-4"
        onPress={() =>
          navigation.navigate("Scholarship", {
            params: {
              queryName: "course",
              queryValue: item._id,
            },
          })
        }
      >
        <Text className="text-lg font-bold text-darkText">{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="h-screen bg-lightBg items-center gap-y-2">
      <Text className="text-2xl font-bold text-darkText">SCHOLARHIVE</Text>
      <View className="gap-y-4 w-11/12">
        <Text className="text-xl font-bold text-darkText ">
          Recent Scholarships
        </Text>
        {scholarshipsLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={scholarships.slice(0, 5)}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
          />
        )}
      </View>

      <View className="gap-y-4 w-11/12">
        <Text className="text-xl font-bold text-darkText ">Filter Courses</Text>
        {coursesLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={courses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item._id}
            horizontal
          />
        )}
      </View>

      <View className="gap-y-4 w-11/12">
        <Text className="text-xl font-bold text-darkText ">
          Filter Institution
        </Text>
        {scholarshipsLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={institutions}
            renderItem={renderInstitutionItem}
            keyExtractor={(item) => item._id}
            horizontal
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
