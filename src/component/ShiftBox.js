import React, { useContext, useState } from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, Image, Text} from 'react-native';
import Images from '../asets/images/ImportImages';
import { useNavigation } from '@react-navigation/native';
import { globalHW } from '../../Storge/global';
import TheContext from '../../Storge/thisContext';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const ShiftBox = ({title,index}) =>{

    const navigation= useNavigation()
    const {setShiftColiction,ShiftColiction} = useContext(TheContext)
    const [shift, setShift]= useState(false)
    const currentShiftInfo = ShiftColiction?.[index]?.ShiftInfo
    const shiftLength= currentShiftInfo.length;
    const lastIndex = currentShiftInfo.length-1
    const lastShift = currentShiftInfo[lastIndex]
    const newShiftStart = lastShift?.end=='-';
    // console.log(newShiftStart);
        // ShiftInfo.in.length!=ShiftInfo.out.length?true:false);

    // const dateIn = (ShiftInfo.in.length>0)?(ShiftInfo.in[ShiftInfo.in.length-1]).split(","):['','']
    // const dateOut =(ShiftInfo.out.length>0)?(ShiftInfo.out[ShiftInfo.out.length-1]).split(","):['','']

    const alerstShift = () =>
    Alert.alert(shift?'do you whant to end shift':'do you whant to start shift' , '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {handlePress()}},
  ]);

  const handlePress = () => {
    setDateTime(now.toLocaleString());
    if (!shift) {
      console.log('in');
      ShiftInfo.in.push(now.toLocaleString())
      setShift(true)
    }
    if (shift) {
      console.log('out');
      ShiftInfo.out.push(now.toLocaleString())
      setShift(false)
    }
    savedata()
  };

    const RenderShiftBox=()=>{// recent shift / current shift  / new shift {add costmaization}
        const reactShift =shiftLength?{
                text:'React Shift',
                shift:newShiftStart?currentShiftInfo[lastIndex-1]:lastShift
            }:null
        ;
        const currentShift= newShiftStart?{
                text:'Current Shift',
                shift:lastShift
            }:null
        ;

        return(
            [reactShift,currentShift].map((shiftInfo,i)=>(
                (shiftInfo?.shift!=null)?
                <View style={styles.ShiftBox} key={i}>
                    <Text style={styles.shiftState}> {shiftInfo.text}: </Text>
                    {/* {console.log(shiftInfo)} */}
                    <Text style={styles.date}>{new Date(shiftInfo.shift.date).toLocaleDateString()}</Text>
                    <Text style={styles.date}>{`${shiftInfo.shift.start} - ${shiftInfo.shift.end}`}</Text>
                    
                </View>
                :null
            ))
        )
    }

    const FingerPrint=()=>(
        <TouchableOpacity onPress={alerstShift} style={[styles.shiftButton,{borderColor: shift?'green':'red',}]}>
            <Image 
            style={{height:"100%",width:"100%",}}
            source={Images.fingerPrint}
            />
        </TouchableOpacity>
    )

    const NewShift = (RenderShiftBox().every((item)=>item==null));
  
    return (
      
      <TouchableOpacity style={styles.Box} onPress={()=>navigation.navigate('ShiftInfo',{dataTitle:title,index:index})}>
        <Text style={styles.title}>{title}</Text>
  
        <View style={{flexDirection:'row',flex:1,}}>

            <View style={{flex:1,flexDirection:'column'}}>

            {!NewShift?<RenderShiftBox/>:
                <View style={styles.ShiftBox}>
                    <Text style={styles.shiftState}> {'new shift'} </Text>
                </View> // componnet
            }
  
            </View>
  
          <FingerPrint/>

        </View>
  
        
  
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    Box:{
        height: globalHW.windowHeight*0.25,
        backgroundColor:'#262e3b',
        padding:10,
        // paddingHorizontal:40,
        margin:5,
        borderRadius:10,
        // justifyContent:'space-around'
    },
    title:{
        fontSize: 25,
        color:"#fff"
    },
    ShiftBox: {
        flex:1,
        justifyContent:'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor:'#fff',
        margin:5,
        borderRadius:3,
      },
      shiftState: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'black',
      },
      date: {
        fontSize: 18,
        fontWeight: '600',
        color:'black'
      },
      shiftButton:{
        alignSelf:'flex-end',
        height:80,
        width:80,
        backgroundColor:'#fff',
        borderRadius:100,
        borderWidth:2,
        marginLeft:10,
      },
})

export default ShiftBox;
