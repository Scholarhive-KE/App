import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useCreateStudent, useEditStudent } from "@/hooks/useStudent";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getCourses } from "@/services/apiService";

type Inputs = {
  DOB: Date;
  citizenship: string;
  gender: "male" | "female";
  educationLevel: "bachelors" | "masters";
  courseInterest: string;
};

const EditStudentProfile: React.FC = () => {
  const courseState = useSelector((state: RootState) => state.course.courses);
  const { mutateAsync } = useEditStudent();
  const student = useSelector((state: RootState) => state.student.student);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      DOB: new Date(student?.DOB),
      citizenship: student?.citizenship,
      courseInterest: student?.courseInterest,
      educationLevel: student?.educationLevel,
      gender: student?.gender,
    },
  });

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

  useEffect(() => {
    const courseItems = courseState.map((course) => ({
      label: course.name,
      value: course._id,
    }));
    console.log("courseItems", courseState);
    setCourses(courseItems);
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
    <SafeAreaView className="bg-lightBg flex-1 items-center">
      <Text className="text-darkText font-bold text-2xl  my-5">
        Edit Your Profile
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

      <View className="w-11/12 ">
        <Button
          size="full"
          label="Edit Profile"
          type="primary"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditStudentProfile;
