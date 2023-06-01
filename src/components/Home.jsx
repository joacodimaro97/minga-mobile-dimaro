import React from 'react'
import {  Text, ImageBackground, Alert  } from 'react-native';
import Restart from 'react-native-restart';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
    const bgimg = { uri: 'https://i.pinimg.com/564x/72/d8/69/72d86997f22ba7891a362a31ee2e2e2d.jpg' };


    const navigation = useNavigation();

      const handleMangas = () => {
        navigation.navigate('Mangas');
      };
      const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          Alert.alert('See you soon','The session was successfully closed.')
          navigation.navigate('Welcome to Minga');
          Restart();
        } catch (error) {
        }
      };

  return (
    <ImageBackground source={bgimg} className='w-screen h-screen flex justify-around items-center ' resizeMode='cover' >
        <Text className='text-[#ffffffd7] text-[24px] tracking-[4px] text-center font-bold py-6 ' >Welcome to</Text>
        <Text className="text-[#f5afdc] font-bold text-[80px] tracking-[15px] text-center " >MINGA</Text>
        <Text className='text-white text-center text-[30px]  h-[35vh] font-semibold p-8 tracking-[2px]  w-full mt-[100px] bg-[#000000bb] ' >Immerse yourself in the  world of Japanese manga with our extensive collection of popular titles.</Text>
        <Text onPress={handleMangas} className="text-[#ffffffda] bg-[#5d2659] rounded-xl w-[60vw] h-[10vh] text-center border border-[#ffffff] text-[27px] font-bold mt-10 py-4 " >Explore Mangas!</Text>
        <Text onPress={handleLogout} className="text-[#f8dbdbbb] text-[25px] tracking-[4px] font-bold " >Logout</Text>
    </ImageBackground>
  )
}


export default Home