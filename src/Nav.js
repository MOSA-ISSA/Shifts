import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Screens/MainScreen';
import DetailScreen from './Screens/DetailScreen';
import HomeAttendance from './Screens/HomeAttendance';
import TheClass from './Screens/TheClass';
import Schedule from './Screens/Schedule';
import StartLoading from './asets/animations/StartLoading';
import ShiftInfo from './Screens/ShiftInfo';
import MapTest from './Screens/MapTest';


const Stack = createNativeStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="StartLoading" component={StartLoading} options={{headerShown:false}}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ShiftInfo" component={ShiftInfo} options={{headerShown:false}}/>
        <Stack.Screen name="Maps" component={MapTest} options={{headerShown:false}}/>
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="HomeAttendance" component={HomeAttendance} options={{headerShown:false}}/>
        <Stack.Screen name="TheClass" component={TheClass} options={{headerShown:false}}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Nav
