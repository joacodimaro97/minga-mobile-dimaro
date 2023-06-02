import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ImageBackground, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './Card';
import { useNavigation } from '@react-navigation/native';

const bgimg = { uri: 'https://i.pinimg.com/564x/c1/33/5b/c1335b615daca8198484062a9f769a24.jpg' };

const Mangas = () => {
  const [mangas, setMangas] = useState([]);
  const [filterManga, setFilterManga] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    const filteredManga = mangas.filter((manga) =>
      manga.title.toLowerCase().includes(searchText)
    );
    setFilterManga(filteredManga);
  };

  const loadMoreMangas = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const headers = {
            headers: { 'Authorization': `Bearer ${token}` }
          };
          axios.get(`https://minga-mobile-back.onrender.com/api/mangas?page=${page}`, headers)
            .then(response => {
              const newMangas = response.data.response;
              setMangas(prevMangas => [...prevMangas, ...newMangas]);
              setFilterManga(prevMangas => [...prevMangas, ...newMangas]);
              setIsLoading(false);
            })
            .catch(error => {
              console.error(error);
              setIsLoading(false);
            });
        } else {
          // Manejar caso cuando no hay token en AsyncStorage
        }
      } catch (error) {
        console.error(error);
      }
    };

    getToken();
  }, [page]);

  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleDetail = (mangaId) => {
    navigation.navigate('Detail', { mangaId });
  };
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20; // Puedes ajustar este valor según tus necesidades
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };
  

  return (
    <ImageBackground source={bgimg} className='flex justify-between items-center' style={{ flex: 1 }} resizeMode='cover'>
  <Text className='text-white font-bold text-[30px] py-4'>MANGAS</Text>
  <TextInput
    className='text-black w-[70vw] rounded-md h-[8vh] bg-[#fbfbfbc3] p-2 text-20'
    onChangeText={(text) => handleSearch(text)}
    placeholder="Search.... 🔎"
    placeholderTextColor="black"
  />
  <View className='w-full h-[80vh] flex border border-white ' >
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          loadMoreMangas();
        }
      }}
      scrollEventThrottle={400}
    >
      <View className='h-[90vh] p-20 flex flex-col justify-evenly items-center' style={{ height: '90%', padding: 20 }}>
        {filterManga.map((manga, index) => (
          <TouchableOpacity key={index} onPress={() => handleDetail(manga._id)}>
            <Card manga={manga} />
          </TouchableOpacity>
        ))}
        {isLoading && (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </View>
    </ScrollView>
    <View className='bg-black fixed w-full h-[10vh] flex justify-center items-center'>
      <Text onPress={handleHome} className='text-white font-bold text-[30px]'>
        Go back to HOME
      </Text>
    </View>
  </View>
</ImageBackground>
    );
  };
  
  export default Mangas;


