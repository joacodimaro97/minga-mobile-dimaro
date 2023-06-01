import React from 'react';
import { View, Text, Image } from 'react-native';

const Card = ({ filterManga }) => {

  
  const cards = filterManga.map((manga, index) => (
    <View key={index} className="flex justify-center flex-row items-center w-[90vw] h-[30vh] m-2 rounded-[40%] bg-[#4c454c]">
      <View className="w-[40%] h-[80%] flex justify-evenly pl-2 ">
        <Text className="text-[20px] font-bold text-white " >{manga.title}</Text>
        <Text className="text-white" >Category manga</Text>
      </View>
      <Image source={{ uri: manga.cover_photo }} className="w-[50%] h-[75%] ml-9 rounded-[20%]" />
    </View>
  ));

  return <View>{cards}</View>;
};

export default Card;


