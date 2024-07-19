import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useCreateStudent } from "../hooks/useStudent";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getCourses } from "../services/apiService";

type Inputs = {
  DOB: Date;
  citizenship: string;
  gender: "male" | "female";
  educationLevel: "bachelors" | "masters";
  courseInterest: string;
};

const StudentCreateProfileScreen: React.FC = () => {
  const token = useSelector((state: RootState) => state.profile.token);
  const { mutateAsync } = useCreateStudent();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { DOB: new Date() } });

  const [eduDrop, setEduDrop] = useState(false);
  const [genderDrop, setGenderDrop] = useState(false);
  const [courseDrop, setCourseDrop] = useState(false);

  const [educationLevels, setEducationLevels] = useState([
    { label: "Bachelors", value: "bachelors" },
    { label: "Masters", value: "masters" },
  ]);

  const [genders, setGenders] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const result = await getCourses(token);
      if (result.status == "success") {
        const courses = result.data.courses;
        const courseItems = courses.map((course) => ({
          label: course.name,
          value: course._id,
        }));
        setCourses(courseItems);
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-lightBg h-screen items-center">
      <Text className="text-darkText font-bold text-3xl italic my-5">
        Create Profile
      </Text>
      <View className="w-11/12 flex-1">
        <Controller
          control={control}
          name="DOB"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row w-full items-center justify-between">
              <Text className="text-darkText font-bold">Date of Birth</Text>
              <DateTimePicker
                value={value}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  onChange(selectedDate);
                }}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="citizenship"
          render={({ field: { name, onChange, value } }) => (
            <Input value={value} onChange={onChange} label="Citizenship" />
          )}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View className="gap-y-2 h-fit z-50">
              <Text className="text-lg font-medium ">Gender</Text>
              <DropDownPicker
                style={{
                  borderColor: "#283618",
                  backgroundColor: "#E9EDC9",
                }}
                dropDownContainerStyle={{
                  borderColor: "#283618",
                  backgroundColor: "#E9EDC9",
                  zIndex: 1000,
                }}
                open={genderDrop}
                value={value}
                items={genders}
                setOpen={setGenderDrop}
                setValue={(state) => onChange(state())}
                setItems={setGenders}
                bottomOffset={100}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="educationLevel"
          render={({ field: { onChange, value } }) => (
            <View className="gap-y-2 z-40 my-4">
              <Text className="text-lg font-medium ">Education Level</Text>
              <DropDownPicker
                style={{
                  borderColor: "#283618",
                  backgroundColor: "#E9EDC9",
                }}
                dropDownContainerStyle={{
                  borderColor: "#283618",
                  backgroundColor: "#E9EDC9",
                  zIndex: 1000,
                }}
                open={eduDrop}
                value={value}
                items={educationLevels}
                setOpen={setEduDrop}
                setValue={(state) => onChange(state())}
                setItems={setEducationLevels}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="courseInterest"
          render={({ field: { onChange, value } }) => (
            <View className="gap-y-2 z-30">
              <Text className="text-lg font-medium ">Course Interest</Text>
              <DropDownPicker
                style={{
                  borderColor: "#283618",
                  backgroundColor: "#E9EDC9",
                }}
                dropDownContainerStyle={{
                  borderColor: "#283618",
                  backgroundColor: "#E9EDC9",
                  zIndex: 1000,
                }}
                open={courseDrop}
                value={value}
                items={courses}
                setOpen={setCourseDrop}
                setValue={(state) => onChange(state())}
                setItems={setCourses}
                searchable={courses.length > 5}
              />
            </View>
          )}
        />
      </View>
      <View className="w-11/12">
        <Button
          size="full"
          label="Create Profile"
          type="primary"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};

export default StudentCreateProfileScreen;
