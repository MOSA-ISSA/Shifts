import { View, StyleSheet, Text, TouchableOpacity, Image, Alert,  Animated, Dimensions} from 'react-native';
import React, { useContext, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../Storge/thisContext';
import ADD from '../asets/animations/ADD';
import CollapsingHeader from '../component/CollapsingHedWithData/CollapsingHeader';
import CustomCollapsingHeader from '../component/CollapsingHeader';
import TheButton from '../component/TheButton';
import TheModal from '../component/TheModal';
import { globalHW } from '../../Storge/global';
import AddNewShiftComponent from '../component/AddShift';
import ShiftBox from '../component/ShiftBox';



const MainScreen =({ navigation })=>{
  console.log("main Screen");
  // AsyncStorage.clear();
  const {ShiftInfo,ShiftColiction} = useContext(TheContext)
  const [dateTime, setDateTime] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);
  const now = new Date();
  const date = now.toLocaleDateString()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonth = monthNames[now.getMonth()];
  const currentDay = dayNames[now.getDay()];
  // console.log('data',ShiftColiction.map((item)=>item.title));
  // console.log(ShiftInfo);
  // console.log(date)
  // console.log(currentDay);
  // console.log(currentMonth);

const getdata =async()=>{
  //let date = (((now.getMonth()+1).toString())+'/'+now.getFullYear().toString())
  try {
    let key =await AsyncStorage.getAllKeys();
    if (key.length>0) {
      let item =await AsyncStorage.getItem(key.pop());
      console.log(item);
    }
  } catch (error) {
    // Error saving data
  }
};
// getdata()

const savedata =async()=>{
  let date = (ShiftInfo.dayDate.toString()+'/'+ShiftInfo.month.toString()+'/'+ShiftInfo.year.toString())
  try {
    await AsyncStorage.setItem(
      date,
      JSON.stringify (ShiftInfo)
    );
  } catch (error) {
    // Error saving data
  }
};

const AttendanceBox = () =>{

  return (
    
    <TouchableOpacity style={[styles.Box]} >
      <View style={{alignItems: 'center',backgroundColor:'#fff',marginBottom:15}}>
        <Text style={styles.textInOut}>Add your Attendance</Text>
      </View>
      {/* <View style={{flex:1,alignItems: 'center',}}></View> */}
      <TouchableOpacity style={{flex:1}} onPress={() => navigation.navigate('HomeAttendance')}>
        <ADD/>
      </TouchableOpacity>

    </TouchableOpacity>
  );
}
  
  
const data=[...ShiftColiction.map((item)=>item.title)];
  

  return(
    <View style={styles.container}>

      <CollapsingHeader
        headerStyles={styles.headerStyles}
        enableCustomHeader={1}
        CustomHeaderComponent={({AnimatedStyle})=>
          <CustomCollapsingHeader  AnimatedStyle={AnimatedStyle} AnimatedText={[date,currentDay,currentMonth,]} title={'shifts colliction'}/>
        }
        data={data}
        RenderItem={(title)=>{
          return(
            <ShiftBox  index={data.findIndex((element)=>element==title)} title={title}/>
          )}}
      >
      </CollapsingHeader>

      <TheButton
          buttonStyle={styles.button}
          onPress={()=>{setmodalVisible(!modalVisible)}}
        >
          <ADD size={globalHW.windowHeight*0.1}/>

          <TheModal  setModalVisible={modalVisible}>
            <AddNewShiftComponent
              setmodalVisible={setmodalVisible}
            />
          </TheModal>

      </TheButton>
      
      

         {/* <ShiftBox/> */}
     {/* <AttendanceBox/>

      <View style={[styles.Box,{flex:0.5}]}>
        <View style ={styles.centerContainer}>
          <TouchableOpacity onPress={alerstShift} style={[styles.shiftButton,{borderColor: shift?'green':'red',}]}>
            <Image style={{height:"100%",width:"100%",}}
            source={{uri:'https://th.bing.com/th/id/R.d2f6f469fa349eb52b3039b92358e0e6?rik=7BKrHI6g7idW1g&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f06%2fFingerprint-Free-Download-PNG.png&ehk=BdOLaa2YTv4B9CgvpzV5duwArnopJQrezDsF6S8muWs%3d&risl=&pid=ImgRaw&r=0'}}
            />
          </TouchableOpacity>
          {dateTime !== '' && <Text style={styles.dateTimeText}>{dateTime}</Text>}
          </View>

        
      </View> */}



      {/* <ADD/> */}

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:10,
    // margin:5,
    backgroundColor:'#d1d1d1',
    flexDirection:'column-reverse'
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeText: {
    fontSize: 16,
    marginTop: 10,
    color:'#fff'
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
  dateText: {
    flexGrow:1,
    fontSize: 30,
    fontWeight: 'bold',
    margin:5,
    color:'black'
  },
  InOutContainer: {
    flex:1,
    justifyContent:'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor:'#fff',
    margin:5,
    borderRadius:3,
  },
  InOut: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },
  textInOut: {
    fontSize: 18,
    fontWeight: '600',
    color:'black'
  },
  Box:{
    height: globalHW.windowHeight*0.25,
    backgroundColor:'#262e3b',
    padding:10,
    // paddingHorizontal:40,
    margin:5,
    borderRadius:10,
    // justifyContent:'space-around'
  },
  headerStyles:{
    flexDirection:'column-reverse',
    backgroundColor:'#262e3b',//same
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    elevation: 50,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    flex:1,
    // backgroundColor:'#199199',
    position: 'absolute',
    height: globalHW.windowHeight*0.1,
    width: globalHW.windowHeight*0.1,
    borderRadius:100, 
    marginLeft:globalHW.windowWidth*0.78,
    marginBottom:10,
    // alignSelf:'flex-end'
  },
  
});

export default MainScreen