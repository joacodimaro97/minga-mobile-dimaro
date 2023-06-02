import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import axios from 'axios';


const bgimg = {uri : 'https://i.pinimg.com/564x/e8/bd/14/e8bd14d9593b74d89deddadfac0d44fe.jpg'}

const MangaDetail = ({ route }) => {
  const [mangaData, setMangaData] = useState(null);
  const { mangaId } = route.params;
  const sourceRef = useRef(axios.CancelToken.source());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://minga-mobile-back.onrender.com/api/mangas/${mangaId}`, {
          cancelToken: sourceRef.current.token,
        });
        setMangaData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      // Cancelar la solicitud si el componente se desmonta o se cambia el mangaId
      sourceRef.current.cancel('Componente desmontado o mangaId cambiado');
    };
  }, [mangaId]);

  useEffect(() => {
    setMangaData(null); // Restablecer mangaData a null al volver a montar el componente
  }, [route]);

  // Renderizar los datos del manga específico
  return (

  
    <ImageBackground source={bgimg} className='w-screen h-screen flex justify-between items-center ' resizeMode='cover' >
      {mangaData && (
        <>
        <View className='flex flex-col items-center justify-around w-full h-[100vw]  mt-60 ' >
          <Text className='text-white font-bold text-center text-[30px] '>{mangaData.response.title}</Text>
          <Text className='text-white  font-bold text-center p-2 ' >{mangaData.response.description}</Text>
          <Image source={{ uri: mangaData.response.cover_photo }} className="w-[50%] h-[40%] ml-9 contain rounded-[20%]" />
        </View>
        </>
      )}
      <View className="flex flex-row justify-around items-center h-[8vh] w-full bg-[#000] " >
        <Text className="text-white  font-bold text-[30px]" >Home</Text>
        <Text className="text-white  font-bold text-[30px]" >Mangas</Text>
      </View>
    </ImageBackground>
  );
};

export default MangaDetail;





