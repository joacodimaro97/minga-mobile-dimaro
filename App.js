import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './src/components/Index';
import Register from './src/components/Register'
import Home from './src/components/Home';
import Mangas from './src/components/Mangas';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Stack = createStackNavigator();
 

  return (

    <NavigationContainer>
      <Stack.Navigator>
        
          
            <Stack.Screen
              name="Welcome to Minga"
              component={Index}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          
        
          
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Mangas"
              component={Mangas}
              options={{ headerShown: false }}
            />
          
       
        
      </Stack.Navigator>
    </NavigationContainer>

  );
}


