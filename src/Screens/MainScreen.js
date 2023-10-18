import { View, StyleSheet, Text, TouchableOpacity, Image, Alert,  Animated, Dimensions} from 'react-native';
import React, { useContext, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../Storge/thisContext';
import ADD from '../asets/animations/ADD';
import CollapsingHeader from '../component/CollapsingHedWithData/CollapsingHeader';
import CustomCollapsingHeader from '../component/CollapsingHeader';



const MainScreen =({ navigation })=>{
  // AsyncStorage.clear();
  const {ShiftInfo,} = useContext(TheContext)
  const [dateTime, setDateTime] = useState('');
  const [shift, setShift]= useState(ShiftInfo.in.length!=ShiftInfo.out.length?true:false);
  const now = new Date();


  console.log(ShiftInfo);
  console.log(ShiftInfo.dayDate.toString()+'/'+ShiftInfo.month.toString()+'/'+ShiftInfo.year.toString())

{
// const year = now.getFullYear();  // e.g. 2023
// const month = now.getMonth();  // 0-based index, so January is 0, February is 1, etc.
// const date = now.getDate();  // day of the month (1-31)
// const day = now.getDay();  // 0-based index, so Sunday is 0, Monday is 1, etc.

//console.log(ShiftInfo.dayDate.toString()+'/'+ShiftInfo.month.toString()+'/'+ShiftInfo.year.toString())
}

// const CollapsingHeader=({headerHeight})=>{
//   return(
//     <Animated.View style={[styles.header, { height: headerHeight }]}>
//           <Text style={styles.title}>Collapsing Header</Text>
//     </Animated.View>
//   )
  

// }

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

const alerstShift = () =>
  Alert.alert(shift?'do you whant to end shift':'do you whant to start shift' , '', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {handlePress()}},
]);

const ShiftBox = () =>{

  const dateIn = (ShiftInfo.in.length>0)?(ShiftInfo.in[ShiftInfo.in.length-1]).split(","):['','']
  const dateOut =(ShiftInfo.out.length>0)?(ShiftInfo.out[ShiftInfo.out.length-1]).split(","):['','']

  return (
    
    <TouchableOpacity style={[styles.Box,{flexDirection:'row'}]} onPress={() => navigation.navigate('Details')}>
      <View style={[styles.centerContainer,{backgroundColor: '#fff',margin:5,borderRadius:3}]}>
        <Text style={styles.dateText}>{ShiftInfo.dayDate}</Text>
        <Text style={styles.dateText}>{ShiftInfo.month}</Text>
        <Text style={styles.dateText}>{ShiftInfo.year}</Text>
      </View>

      <View style={{flex:2,flexDirection:'column'}}>

        <View style={styles.InOutContainer}>
          <Text style={styles.InOut}> In: </Text>
          
            <Text style={styles.textInOut}>{dateIn[0]}</Text>
            <Text style={styles.textInOut}>{dateIn[1]}</Text>
            
        </View>

        <View style={styles.InOutContainer}>
          <Text style={styles.InOut}> out: </Text>

          <Text style={styles.textInOut}>{dateOut[0]}</Text>
          <Text style={styles.textInOut}>{dateOut[1]}</Text>

        </View>

        </View>

    </TouchableOpacity>
  );
}

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
  
  
  


  return(
    <View style={styles.container}>

      <CollapsingHeader
        headerStyles={styles.headerStyles}
        customHeaderComponent={1}
        CustomHeaderComponent={()=>
          <CustomCollapsingHeader/>
        }
      />
      
      


      {/* <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
          { useNativeDriver: false },
        )}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>

          {['a','b','c','a','b','c','a','b','c','a','b','c',].map((item,i)=>(
            <View key={i} style={styles.V}>

            </View>
        ))}


        <ShiftBox/>
      <AttendanceBox/>

      <View style={[styles.Box,{flex:0.5}]}>
        <View style ={styles.centerContainer}>
          <TouchableOpacity onPress={alerstShift} style={[styles.shiftButton,{borderColor: shift?'green':'red',}]}>
            <Image style={{height:"100%",width:"100%",}}
            source={{uri:'https://th.bing.com/th/id/R.d2f6f469fa349eb52b3039b92358e0e6?rik=7BKrHI6g7idW1g&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f06%2fFingerprint-Free-Download-PNG.png&ehk=BdOLaa2YTv4B9CgvpzV5duwArnopJQrezDsF6S8muWs%3d&risl=&pid=ImgRaw&r=0'}}
            />
          </TouchableOpacity>
          {dateTime !== '' && <Text style={styles.dateTimeText}>{dateTime}</Text>}
          </View>

        
      </View>

      </Animated.ScrollView> */}

      {/* <ADD/> */}

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:10,
    // margin:5,
    backgroundColor:'#d1d1d1'
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // button: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   padding: 10,
  //   backgroundColor: '#262e3b',
  //   color: 'white',
  //   borderRadius: 5,
  // },
  dateTimeText: {
    fontSize: 16,
    marginTop: 10,
    color:'#fff'
  },
  shiftButton:{
    height:80,
    width:80,
    padding:5,
    backgroundColor:'#fff',
    borderRadius:100,
    borderWidth:2
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
    flex:1,
    backgroundColor:'#262e3b',
    padding:25,
    paddingHorizontal:40,
    margin:5,
    borderRadius:10,
  },
  headerStyles:{
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
  },
  
});

export default MainScreen