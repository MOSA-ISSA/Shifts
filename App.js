import React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/Screens/MainScreen';
import DetailScreen from './src/Screens/DetailScreen';
import StartLoading from './src/asets/animations/StartLoading';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import HomeAttendance from './src/Screens/HomeAttendance';
import TheClass from './src/Screens/TheClass';
import Schedule from './src/Screens/Schedule';
import Nav from './src/Nav';
import {StatusBar, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const App =()=>{

    return(
      <TheProvider>
        <TheContext.Consumer>
          {context => (
            <Provider>
            <ThemeProvider>
              <StatusBar
                backgroundColor={'#454545'}
                barStyle={"dark-content"}
              />
              <Nav/>
              </ThemeProvider>
            </Provider>
              // <View style ={{flex:1}}>
              //   <TouchableOpacity style={{height: 100,width: 100,backgroundColor: "red",}}/>
              // </View>
          )}
        </TheContext.Consumer>
    </TheProvider>
    )
  }


export default App;
