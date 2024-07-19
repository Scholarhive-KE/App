import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getCourses, getScholarships } from "../../../services/apiService";
import { setCourses } from "../../../redux/slices/courseSlice";
import { setScholarships } from "../../../redux/slices/scholarshipSlice";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import filterScholarships from "@/utils/filters";

interface ScholarshipCatalogProps {
  route: any;
}

const ScholarshipCatalog: React.FC<ScholarshipCatalogProps> = ({ route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const courses = useSelector((state: RootState) => state.course.courses);
  const scholarships = useSelector(
    (state: RootState) => state.scholarship.scholarships
  );
  const [courseFilterOpen, setCourseFilterOpen] = useState(false);
  const [courseFilters, setCourseFilters] = useState([
    {
      label: "Courses",
      value: "none",
      selectable: false,
      labelStyle: { fontWeight: "bold", fontSize: 16 },
    },
    ...courses.map((course) => ({
      label: course.name,
      value: `course.${course._id}`,
    })),
    {
      label: "Education Levels",
      value: "none",
      selectable: false,
      labelStyle: { fontWeight: "bold", fontSize: 16 },
    },
    { label: "Bachelors", value: "level.bachelors" },
    { label: "Masters", value: "level.masters" },
  ]);
  const [courseFilter, setCourseFilter] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [scholarshipsLoading, setScholarshipsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.profile.token);

  console.log("rr", route);

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

  console.log(courseFilters);

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
        className="border rounded-md my-2"
      >
        <View className="bg-secondary p-2">
          <Text className="font-bold text-darkBgs">
            {item.institution.name}
          </Text>
        </View>
        <View className="p-2">
          <Text className="font-bold text-lg text-primary">{item.name}</Text>
          <View className="py-1 flex-row justify-between">
            <View className="gap-y-1">
              <Text className="text-lg">{item.courseInterest.name}</Text>
              <Text className="font-bold">{item.levelOfEducation}</Text>
              <Text className="text-darkText font-bold">
                {new Date(item.deadline).toLocaleDateString()}
              </Text>
            </View>
            <View className="justify-center">
              <Text className="font-bold text-lg">{item.awardAmount} Ksh</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="h-screen bg-lightBg items-center gap-y-2  mb-3">
      <Text className="text-2xl font-bold text-darkText">SCHOLARHIVE</Text>
      <View className="w-full">
        {coursesLoading ? (
          <Text>..Search filter loading</Text>
        ) : (
          <View className="px-2 w-11/12 m-2 items-center">
            <DropDownPicker
              showBadgeDot={true}
              mode="BADGE"
              multiple={true}
              badgeDotColors={["#D4A373", "#CCD5AE"]}
              // style={{
              //   borderColor: "#283618",
              //   backgroundColor: "#E9EDC9",
              // }}
              // dropDownContainerStyle={{
              //   borderColor: "#283618",
              //   backgroundColor: "#E9EDC9",
              //   zIndex: 2000,
              // }}
              showArrowIcon={false}
              open={courseFilterOpen}
              value={courseFilter}
              items={courseFilters}
              setOpen={setCourseFilterOpen}
              setValue={setCourseFilter}
              setItems={setCourseFilters}
              placeholder="Filters"
            />
          </View>
        )}
      </View>
      {scholarshipsLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View className="flex-1 -z-10">
          <FlatList
            data={
              courseFilter.length > 0
                ? filterScholarships(scholarships, courseFilter)
                : scholarships
            }
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScholarshipCatalog;
