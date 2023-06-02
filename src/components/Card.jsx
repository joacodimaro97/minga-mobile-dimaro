import React from 'react';
import { View, Text, Image } from 'react-native';

const Card = ({ manga }) => {

  return (
    <View className="flex justify-center flex-row items-center w-[90vw] h-[30vh] m-6 rounded-[40%] bg-[#4c454c]">
      <View className="w-[40%] h-[80%] flex justify-evenly pl-2">
        <Text className="text-[20px] font-bold text-white">{manga.title}</Text>
        <Text className="text-white">Touch here for details</Text>
      </View>
      <Image source={{ uri: manga.cover_photo }} className="w-[50%] h-[75%] ml-9 rounded-[20%]" />
    </View>
  );
};

export default Card;



