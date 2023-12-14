import { DarkTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import TheButton from './TheButton';
import { globalHW } from '../../Storge/global';
import TheContext from '../../Storge/thisContext';
import InputComponent from './InputComponent';

const AddNewShiftComponent = ({setmodalVisible}) => {
    const {setShiftColiction,ShiftColiction} = useContext(TheContext)
    const [inputs, setInputs] = useState({
      'title':'',
      'min shift length':'',
      'max shift length':'',
    });
    const shiftValue = Object.keys(inputs);

    const onDone=()=>{
        if (inputs.title!='') {
            setShiftColiction([...ShiftColiction,{
              title:inputs.title,
              "min shift length":inputs["min shift length"],
              "max shift length":inputs["max shift length"],
              ShiftInfo:[]}])
            setmodalVisible(false)
        }else{
            Alert.alert(
                '','you most enter title for the Shift',
                [{text: 'OK'},]
                )
        }
    }

    const RenderInputs=()=>{
      return(
        shiftValue.map((value,i)=>
        <View key={i} style={{flex:1}}>
          <InputComponent value={value} setInputs={setInputs} inputs={inputs} shiftValue={shiftValue} i={i}/>
        </View>
        )
      )
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
          
        <RenderInputs/>
      
      {/* <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={text}
        onChangeText={setText}
        theme={DarkTheme}
      /> */}
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

export default AddNewShiftComponent;
