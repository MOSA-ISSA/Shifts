import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/Screens/MainScreen';
import DetailScreen from './src/Screens/DetailScreen';
import StartLoading from './src/asets/animations/StartLoading';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import HomeAttendance from './src/Screens/HomeAttendance';
import TheClass from './src/Screens/TheClass';
import Schedule from './src/Screens/Schedule';
import Nav from './src/Screens/Nav';


const Stack = createNativeStackNavigator();

const App =()=>{

    return(
      <TheProvider>
        <TheContext.Consumer>
          {context => (
              <Nav/>
          )}
        </TheContext.Consumer>
    </TheProvider>
    )
  }


export default App;
