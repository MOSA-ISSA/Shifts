import React from 'react';
import {ThemeProvider} from '@react-navigation/native';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import Nav from './src/Nav';
import {StatusBar} from 'react-native';
import { Provider } from 'react-native-paper';

const App =()=>{
  console.log("app");
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
