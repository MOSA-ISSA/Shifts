import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker'

const SelectDate=({filterDate,setFilterDate})=>{
    console.log("**********************************",filterDate);
  
    const RenderSlectData=()=>{
        const [select,setSelect] = useState([
            {
                state:'from',
                month:filterDate.from,//Obj
                modal:false
            },
            {
                state:'to',
                month:filterDate.to,
                modal:false,
            }
        ]);

        return(
        select.map((item,i)=>
          <View key={i}>
            <TouchableOpacity style={styles.dateBtn} onPress={() => {
                item.modal=true;
                setSelect([...select])
            }}>
              <Text style={styles.text}>{item.state} </Text>
              <Text style={[styles.text,{backgroundColor:'#959595'}]}>{item.month.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <DatePicker
                title={`select date ${item.state}`}
                mode='date'
                modal
                theme='dark'
                open={item.modal}
                date={item.month}//
                onConfirm={(date) => {
                  console.log(date);
                    item.month=date
                    filterDate[item.state]= date
                    setFilterDate({...filterDate})
                    item.modal=false;
                    setSelect([...select])
                }}
                onCancel={() => {
                    item.modal=false;
                    setSelect([...select])
                }}
            />
            </View>
          )
        )
    }
  
      return(
        <View style={styles.continer}>
          <RenderSlectData/>
        </View>
      )
    }

    const styles = StyleSheet.create({
        continer:{
          flexDirection:"row",
          justifyContent:"center",
          margin:10,
        },
        dateBtn:{
          borderRadius:10,
          backgroundColor:'#454545',
          marginHorizontal:5,
          flexDirection:"row",
          padding:10,
        },
        text:{
          fontSize:20,
          padding:5,
          borderRadius:5,
        }
    })

    export default SelectDate;