import React from 'react';
import {ThemeProvider} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import Nav from './src/Nav';
import {StatusBar, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-native-paper';
import StateNotifacation from './src/component/StateNotifacation';


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
              {/* <StateNotifacation/> */}
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
