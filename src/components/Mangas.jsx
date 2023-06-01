import React, { useEffect, useState, useParams } from 'react';
import { View, Text,ImageBackground, TextInput, Image, ScrollView, TouchableOpacity  } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './Card'
import { useNavigation } from '@react-navigation/native';


const bgimg = { uri: 'https://i.pinimg.com/564x/c1/33/5b/c1335b615daca8198484062a9f769a24.jpg'}


 const Mangas = () => {
 
const [mangas, setMangas] = useState([]);
const [filterManga, setFilterManga] = useState ([])

const handleSearch = (text) => {
  const searchText = text.toLowerCase();
  const filterManga = mangas.filter((manga) =>
    manga.title.toLowerCase().includes(searchText)
  );
  setFilterManga(filterManga);
};




  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const headers = {
            headers: { 'Authorization': `Bearer ${token}` }
          };
          console.log(headers)
          axios.get('https://minga-mobile-back.onrender.com/api/mangas', headers)
            .then(response => {
              setMangas(response.data.response);
              setFilterManga(response.data.response)
              
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          // Manejar caso cuando no hay token en AsyncStorage
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    getToken();
  }, []);

  console.log(filterManga)
  const navigation = useNavigation();

      const handleHome = () => {
        navigation.navigate('Home');
      };
      const handleDetail = () => {
        navigation.navigate('Detail');
      }
  
  return (
   <ImageBackground source={bgimg} className='w-screen h-screen flex justify-between items-center ' resizeMode='cover' >
    
        <Text className='text-white  font-bold text-[30px] py-4'>MANGAS</Text>
        <TextInput className="text-black w-[70vw] rounded-md h-[8vh] bg-[#fbfbfbc3] p-2 text-[20px] " onChangeText={(e)=>handleSearch(e)} placeholder="Search.... 🔎"
        placeholderTextColor="black" ></TextInput>
        <View className='w-full h-[80vh] flex justify-between' >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
        <View className=' h-[90%] p-20 flex flex-col justify-evenly items-center ' >
        <TouchableOpacity onPress={handleDetail} >
        <Card filterManga={filterManga} />
        </TouchableOpacity>
        </View>
        </ScrollView>
        <View className='bg-black fixed w-full h-[10%] flex justify-center items-center' ><Text onPress={handleHome} className='text-white  font-bold text-[30px] ' >Go back to HOME</Text></View>
        </View>
    </ImageBackground>
  )
}

export default Mangas


