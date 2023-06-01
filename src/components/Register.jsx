import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const bgimg = { uri: 'https://i.pinimg.com/564x/ad/34/34/ad34346ab249e362341b4d553fe89e3a.jpg' };

const Register = () => {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [photoValue, setPhotoValue] = useState('');
  const navigation = useNavigation();
  
  let nameRef = useRef();
  let passwordRef = useRef();
  let emailRef = useRef();
  let photoRef = useRef();
  
  useEffect(() => {
    nameRef.current = nameValue;
    passwordRef.current = passwordValue;
    emailRef.current = emailValue;
    photoRef.current = photoValue;
  }, [nameValue,passwordValue, emailValue, photoValue]);

  const handleRegister = () => {
    const dataRegister = {
      name: nameRef.current,
      password: passwordRef.current,
      email: emailRef.current,
      photo: photoRef.current
      
    };
    console.log(dataRegister)

    axios
      .post('https://minga-mobile-back.onrender.com/api/auth/signup', dataRegister)
      .then((res) => {
       Alert.alert('Success', 'Registration was successful! ');
       navigation.navigate('Welcome to Minga');
      
      })
      .catch((err) => {
        let error = err.response.data.message;
        Alert.alert('Error',`${error}`);
        
      });

      const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
  
      Keyboard.addListener('keyboardDidHide', dismissKeyboard);
  
      return () => {
        Keyboard.removeListener('keyboardDidHide', dismissKeyboard);
      };
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ImageBackground source={bgimg} className='bg-black flex-1 flex justify-between items-center' resizeMode='cover'>
        

        
        <Text className="text-white font-bold text-[28px] w-[90%] text-center mt-10 ">Register and explore the world of mangas:</Text>
          <View className=" h-[60vh] flex justify-evenly">
            <TextInput
              className="text-white bg-[#000000dd] w-[80vw] h-[8vh] rounded-xl p-2 border-[#fff] border-[2px] "
              placeholder="Register your Name here..."
              placeholderTextColor="#d1d0d0"
              onChangeText={(text) => setNameValue(text)}
            />
            <TextInput
              className="text-white bg-[#000000dd] w-[80vw] h-[8vh] rounded-xl p-2 border-[#fff] border-[2px] "
              placeholder="Register your Password here..."
              placeholderTextColor="#d1d0d0"
              onChangeText={(text) => setPasswordValue(text)}
              secureTextEntry={true}
            />
            <TextInput
              className="text-white bg-[#000000dd] w-[80vw] h-[8vh] rounded-xl p-2 border-[#fff] border-[2px] "
              placeholder="Register your Email here..."
              placeholderTextColor="#d1d0d0"
              onChangeText={(text) => setEmailValue(text.trim())}
              keyboardType="email-address"
              
            />
            <TextInput
              className="text-white bg-[#000000dd] w-[80vw] h-[8vh] rounded-xl p-2 border-[#fff] border-[2px] "
              placeholder="Register your Url Photo here..."
              placeholderTextColor="#d1d0d0"
              onChangeText={(text) => setPhotoValue(text)}
            />
        <Text onPress={handleRegister} className="text-black text-[30px] font-bold tracking-[6px] bg-[#edececc8] p-2 text-center " >REGISTER</Text>
          </View>
        
          <Text className='text-[#d1d0d0] font-semibold  tracking-[8px] pb-2 ' > -By Joaquin Dimaro-</Text>
      </ImageBackground>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
