import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker'

const SelectDate=()=>{
    const currentDateTime=new Date();
    const startMonth =`${currentDateTime.getMonth()+1}/1/${currentDateTime.getFullYear()}`;
    
    const [monthState, setMonthState] = useState('')
      // `${currentDateTime.getMonth()}/1/${currentDateTime.getFullYear()}`)

    const getLastDayOfMonth = () => {
      const nextMonth = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth() + 1, 1);
      const lastDay = new Date(nextMonth - 1);
      // setDate(lastDay);
      return lastDay.toLocaleDateString();
    };
  
    const endMonth = getLastDayOfMonth();

  
      const RenderSlectData=()=>{
        // const [open, setOpen] = useState(false)
        const [select,setSelect] = useState([
            {
                state:'from',
                month:startMonth,
                modal:false
            },
            {
                state:'to',
                month:endMonth,
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
              <Text style={[styles.text,{backgroundColor:'#959595'}]}>{item.month}</Text>
            </TouchableOpacity>
            <DatePicker
                title={`select date ${item.state}`}
                mode='date'
                modal
                theme='dark'
                open={item.modal}
                date={new Date()}
                onConfirm={(date) => {
                    item.month=date.toLocaleDateString()
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
        <>
        <View style={styles.continer}>
          <RenderSlectData/>
        </View>
        
        </>
      )
    }

    const styles = StyleSheet.create({
        continer:{
          flexDirection:"row"
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