import { View, Text, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../Storge/thisContext';
import { globalHW } from '../../Storge/global';

const DetailScreen=()=>{
  const {ShiftInfo,} = useContext(TheContext)

  const now = new Date();

  
  //getdata()
  //console.log(allShifts
  
  // console.log(ShiftInfo);
  // console.log(ShiftInfo.dayDate.toString()+'/'+ShiftInfo.month.toString()+'/'+ShiftInfo.year.toString())

  return (
    <View style={{flex:1, backgroundColor: '#4545', padding:20}}>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
       <Text>in</Text><Text>out</Text>
      </View>
      {/* <ShowItem/> */}
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <View style={{width:globalHW.windowWidth*0.5,alignItems:'center',flexDirection:'column',}}>
          {ShiftInfo.in.map((item)=>(
            <View key={item}
            style={{width:globalHW.windowWidth*0.5,alignItems:'center',flexDirection:'column',}}>
            <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View style={{width:globalHW.windowWidth*0.5,alignItems:'center',flexDirection:'column',}}>
          {ShiftInfo.out.map((item)=>(
            <View key={item}
            style={{width:globalHW.windowWidth*0.5,alignItems:'center',flexDirection:'column',}}>
            <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>

    </View>
  )
}

export default DetailScreen