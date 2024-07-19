import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { addRating, getScholarshipRatings } from "@/services/apiService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FlatList } from "react-native-gesture-handler";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const ScholarshipDetail = ({ route }) => {
  const { scholarship } = route.params;
  console.log("ff", route.params);
  const token = useSelector((state: RootState) => state.profile.token);
  const [ratings, setRatings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const fetchRatings = async (token: string, id: string) => {
    try {
      const result = await getScholarshipRatings(token, id);
      if (result.data) {
        console.log(result.data);
        setRatings(result.data.ratings);
      } else {
        console.log(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStarClick = (starIndex: number) => {
    // Increment the rating by 1 if clicked on the same star, otherwise set the new rating
    const newRating = starIndex === rating ? rating - 1 : starIndex;
    setRating(newRating);
  };

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View className="border-b py-3 gap-y-2">
        <View className="flex-row justify-between">
          <Text className="font-bold capitalize">
            {item.student.profile.surname}
          </Text>
          <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
        <View className="gap-x-2 flex-row">
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index}>
              <MaterialIcons
                name={index < item.rating ? "star" : "star-outline"}
                size={20}
                color="orange"
              />
            </View>
          ))}
        </View>

        <Text>{item.comment}</Text>
      </View>
    );
  };

  const onSubmit = async () => {
    try {
      const result = await addRating(token, scholarship._id, {
        rating,
        comment,
      });
      setComment("");
      setRating(0);
      setRatings([...ratings, result.data.rating]);
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRatings(token, scholarship._id);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white items-center gap-y-5">
      <Text className="text-3xl font-bold text-primary">SCHOLARHIVE</Text>

      <View className="w-full items-center px-3 flex-row justify-between">
        <Text className="text-2xl font-bold text-darkText">
          {scholarship.name}
        </Text>
        <Text
          className="font-bold my-2 px-5 py-3 items-center rounded-lg bg-secondary "
          onPress={() =>
            Linking.openURL(`https://${scholarship.applicationLink}`)
          }
        >
          Apply
        </Text>
      </View>

      <View className="w-full items-start px-3">
        <Text className="text-lg font-bold text-darkText mb-4">
          About the scholarship
        </Text>
        <Text className=" text-darkText font-medium ">
          {scholarship.description}
        </Text>
      </View>

      <View className="gap-y-2 w-full px-3">
        <Text className="text-lg font-bold text-darkText">Details</Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="calendar" size={24} color="#CCD5AE" />
          <Text className="text-lg text-darkText ml-2">
            {new Date(scholarship.deadline).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MaterialIcons name="money" size={24} color="#CCD5AE" />

          <Text className="text-lg text-darkText ml-2">
            KSH {scholarship.type == "full" ? "Full" : scholarship.awardAmount}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="book-education-outline"
            size={24}
            color="#CCD5AE"
          />
          <Text className="text-lg text-darkText ml-2">
            {scholarship.levelOfEducation}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="diversify" size={24} color="#CCD5AE" />
          <Text className="text-lg text-darkText ml-2">
            {scholarship.courseInterest.name}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="office-building-marker-outline"
            size={24}
            color="#CCD5AE"
          />
          <Text className="text-lg text-darkText ml-2">
            {scholarship.institution.name}
          </Text>
        </View>
      </View>

      <View className="w-full px-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-darkText mb-4">
            Insitution Rating
          </Text>
          <Button
            label="Rate"
            onPress={() => setModalVisible(true)}
            size="fit"
            type="primary"
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className=" h-full items-center justify-center">
            <View className="bg-secondary opacity-100 p-5 rounded-lg w-11/12">
              <Pressable onPress={() => setModalVisible(false)}>
                <MaterialIcons size={24} color="black" name="close" />
              </Pressable>
              <Text className="text-lg font-medium">Rate the scholarship</Text>
              <View className="gap-x-2 flex-row">
                {Array.from({ length: 5 }).map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleStarClick(index + 1)}
                  >
                    <MaterialIcons
                      name={index < rating ? "star" : "star-outline"}
                      size={24}
                      color="orange"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View>
                <Input label="comment" onChange={setComment} value={comment} />
              </View>
              <Button
                label="Submit"
                onPress={onSubmit}
                size="full"
                type="primary"
              />
            </View>
          </View>
        </Modal>
        <FlatList data={ratings} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default ScholarshipDetail;
