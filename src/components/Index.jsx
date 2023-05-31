import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, ImageBackground, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const bgimg = { uri: 'https://i.pinimg.com/564x/ad/34/34/ad34346ab249e362341b4d553fe89e3a.jpg' };

const Index = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');


  let emailRef = useRef();
  let passwordRef = useRef();

  useEffect(() => {
    emailRef.current = emailValue;
    passwordRef.current = passwordValue;
  }, [emailValue, passwordValue]);

  const handleSignIn = () => {
    const dataSignin = {
      email: emailRef.current,
      password: passwordRef.current,
      
    };
    console.log(dataSignin)

    axios
      .post('https://minga-mobile-back.onrender.com/api/auth/signin', dataSignin)
      .then((res) => {
       AsyncStorage.setItem('token', res.data.token);
       AsyncStorage.setItem('user', JSON.stringify(res.data.user))
       navigation.navigate('Home');
       console.log('Token:', res.data.token);
       console.log('User:', res.data.user)
      })
      .catch((err) => {
        console.error(err);
      });

      const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
  
      Keyboard.addListener('keyboardDidHide', dismissKeyboard);
  
      return () => {
        Keyboard.removeListener('keyboardDidHide', dismissKeyboard);
      };
  };

  const navigation = useNavigation();

      const handleRegisterClick = () => {
        navigation.navigate('Register');
      };
      
      
  return (
   

    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <ImageBackground source={bgimg} className='w-screen h-screen flex justify-between items-center ' resizeMode='cover' >
      
      <Text className='text-white text-[30px] font-bold tracking-[5px] py-4' >MINGA MOBILE</Text>
      <View className='w-[80vw] h-[50vh] rounded-[10%]  flex flex-col items-center justify-around' >
        
        <TextInput
          className="w-[85vw] h-[10vh] bg-[#000000d1] border border-[#ff0b7d] rounded-md tracking-[1px] text-[#cfcfcf] p-2 text-[19px]"
          placeholder="Please, enter your email here..."
          placeholderTextColor="#d1d0d0"
          onChangeText={(text) => setEmailValue(text)}
          keyboardType="email-address"
        />
        <TextInput
          className="w-[85vw] h-[10vh] bg-[#000000d1] border border-[#ff0b7d] rounded-md tracking-[1px] text-[#979797] p-2 text-[19px]"
          placeholder="Please, enter your password here..."
          placeholderTextColor="#d1d0d0"
          onChangeText={(text) => setPasswordValue(text)}
          secureTextEntry={true}
        />


        <Text onPress={handleSignIn} className='text-black text-center text-[35px] font-bold pt-2 tracking-[2px] rounded-xl  w-[40vw] h-[8vh] bg-white' >SIGN IN</Text>

        
      </View>
      <Text className='text-white text-[18px] tracking-[4px] font-semibold ' >Don't have an account?</Text><Text onPress={handleRegisterClick} className='text-white font-bold bg-[#f927d6] w-40 h-10 text-center pt-3'> REGISTER NOW</Text>
      <Text className='text-[#d1d0d0] font-semibold  tracking-[8px] pb-2 ' > -By Joaquin Dimaro-</Text>
      </ImageBackground>
      </TouchableWithoutFeedback>
  )
}

export default Index