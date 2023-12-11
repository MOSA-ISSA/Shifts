import { DarkTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import TheButton from './TheButton';
import { globalHW } from '../../Storge/global';
import TheContext from '../../Storge/thisContext';

const CustomInputComponent = ({ setmodalVisible}) => {
    const {setShiftColiction,ShiftColiction} = useContext(TheContext)
    const [text, setText] = useState('');

    const onDone=()=>{
        if (text!='') {
            setShiftColiction([...ShiftColiction,{title:text,ShiftInfo:[]}])
            setmodalVisible(false)
        }else{
            Alert.alert(
                '','you most enter title for the Shift',
                [{text: 'OK'},]
                )
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.hed}>
            <Text style={styles.title}>Add shift</Text>
            <TheButton
                buttonName={'X'}
                onPress={()=>{setmodalVisible(false)}}
                buttonStyle={styles.exitBtn}
            />
        </View>
          
      
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={text}
        onChangeText={setText}
        theme={DarkTheme}
      />
      <TheButton
            buttonName={'done'}
            onPress={()=>onDone()}
            buttonStyle={styles.DoneButton}
            buttonNameStyle={{margin:10}}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: globalHW.windowWidth*0.8,
    width: globalHW.windowWidth*0.8,
    backgroundColor:"black",
    borderRadius:25,
    padding:10,
    justifyContent:'space-around',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    flex:1
    // alignSelf:'stretch',
  },
  input: {
    marginBottom: 10,
    backgroundColor:'#959595'
  },
  DoneButton:{
    alignSelf:'center',
    backgroundColor:'#494949',
    borderRadius:10,
  },
  hed:{
    flexDirection:'row',
    alignSelf:'stretch',
    alignItems:'center',
    // justifyContent:'space-around',
  },
  exitBtn:{
    margin:10
  }
});

export default CustomInputComponent;
