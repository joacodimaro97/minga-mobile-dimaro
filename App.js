import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {  View } from 'react-native';
import Index from './src/components/Index';


export default function App() {
  return (
    <NavigationContainer>
    <View>
      <Index/>
    </View>
    </NavigationContainer>
  );
}


