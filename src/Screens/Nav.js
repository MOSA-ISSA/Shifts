import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import DetailScreen from './DetailScreen';
import HomeAttendance from './HomeAttendance';
import TheClass from './TheClass';
import Schedule from './Schedule';
import StartLoading from '../asets/animations/StartLoading';
import Test from './Test';


const Stack = createNativeStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="StartLoading" component={StartLoading} options={{headerShown:false}}/>
        <Stack.Screen name="Test" component={Test} options={{headerShown:false}}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="HomeAttendance" component={HomeAttendance} options={{headerShown:false}}/>
        <Stack.Screen name="TheClass" component={TheClass} options={{headerShown:false}}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Nav
