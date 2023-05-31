import React from 'react'
import { View, Text, TextInput, ImageBackground  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const bgimg = { uri: 'https://i.pinimg.com/564x/85/bb/ef/85bbef2c5b2156a5eb007b01b4779d16.jpg' };


    const navigation = useNavigation();

      const handleMangas = () => {
        navigation.navigate('Mangas');
      };

  return (
    <ImageBackground source={bgimg} className='w-screen h-screen flex justify-around items-center ' resizeMode='cover' >
        <Text className='text-white text-[24px] tracking-[4px] text-center font-bold py-2 ' >Welcome to{'\n'} MINGA Mobile Application</Text>
        <Text className='text-white text-center text-[22px]  h-[35vh] font-semibold p-4 tracking-[2px] w-full ' >Immerse yourself in the exciting world of Japanese manga with our extensive collection of popular and exciting titles. From epic adventure stories to heartwarming romantic dramas, you'll find something for everyone here.</Text>
        <Text onPress={handleMangas} className="text-[#ffffffda] bg-[#5f0e5a] rounded-xl w-[60vw] h-[10vh] text-center border border-[#ffffff] text-[30px] font-bold mt-10 py-4 " >Explore Mangas!</Text>
    </ImageBackground>
  )
}


export default Home