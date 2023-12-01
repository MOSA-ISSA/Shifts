import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert,} from 'react-native';
import { globalHW } from '../../Storge/global';
import TheContext from '../../Storge/thisContext';
import { filterDataByDate } from '../methods/methods';
import SelectDate from '../component/SelectDate';

const h = globalHW.windowHeight;
const w = globalHW.windowWidth;
const hBox = h/15;
const wBox = w/4-3;
const fontSize = hBox/2.8;
const duration = 2;

const ShiftInfo = () => {
  const currentDateTime = new Date();// import all date methods
  const {ShiftColiction,setShiftColiction} = useContext(TheContext);
  const data = ShiftColiction[0].ShiftInfo;
  const [ShiftState, setShiftState] = useState('start shift');//[start shift, end shift]
  const startMonth =`${currentDateTime.getMonth()+1}/1/${currentDateTime.getFullYear()}`; //*date

  const getLastDayOfMonth = () => { //*date
    const nextMonth = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth() + 1, 1);
    const lastDay = new Date(nextMonth - 1);
    return lastDay.toLocaleDateString();
  };

  const [filterDate, setFilterDate] = useState({from:startMonth,to:getLastDayOfMonth()});//?
  const filtered = filterDataByDate(data,filterDate.from,filterDate.to)

  const addShiftToSchedule = () => {
    const startShift = //time
     `${currentDateTime.getHours()}:`+
     `${currentDateTime.getMinutes()}`;
     //currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = currentDateTime.toLocaleDateString();

    const shiftData = {
      _date:currentDateTime,
      date: date,
      start: startShift,
      end:'-',
      duration:'-'
    };
    
    // Update the state with the new shift data
    // schedule.push(shiftData)
    ShiftColiction[0].ShiftInfo.push(shiftData)
    setShiftState('end shift')
    //set remainder // مذكر
  };

  const handleEndShift = () => {
    if (data.length <= 0) {return}
    
    const endShift = //time
    `${currentDateTime.getHours()}:`+
    `${currentDateTime.getMinutes()}`;

    const lastShift = data[data.length-1];

    const durationInMinutes  = getDurationInMinutes(
      {start:lastShift['_date'],end:currentDateTime}
    );

    if (durationInMinutes < duration) {
      showAlert()
    } else {
      // Update the end time of the last added shift
      lastShift.duration= (durationInMinutes/60).toFixed(2)
      lastShift.end = endShift;
      setShiftState('start shift');
    }
  };

  const getDurationInMinutes = ({start,end}) =>{
    return (end - start) / (1000 * 60);
  }

  const showAlert=()=>(
    Alert.alert(
        'Invalid Shift End',
        `Shift duration must be at least ${duration} minutes.`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') },
          { text: 'cancel shift', onPress: () =>{
            setShiftState("start shift")
            data.pop(),setShiftColiction([...ShiftColiction])
          }}
        ],
      )
  )
  
  const RenderBox =({shift})=>{
    const scheduleOption=['date','start','end','duration']
    console.log("test",shift);
    return(
      <View style={styles.hedSchedule} >
        {scheduleOption.map((item,i)=>(
        <View key={i} style={styles.boxSchedule}>
          <Text style={styles.scheduleOption}>{shift?.[item]||item}</Text>
        </View>
      ))}
      </View>
    )
  }

  const handleShiftStateToggle =()=>{
    if ("start shift"==ShiftState) {
      addShiftToSchedule()
    }else{
      handleEndShift()
    }
  }

  return (
    <View style={styles.container}>

      {/* <DropDownComponent/>*/}
      
      <SelectDate filterDate={filterDate} setFilterDate={setFilterDate}/>

      <Button title={ShiftState} onPress={handleShiftStateToggle } />
        <RenderBox/>

      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <RenderBox shift={item}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  hedSchedule:{
    flexDirection:'row',
    backgroundColor:'#4545',
  },
  scheduleOption:{
    fontSize: fontSize,
    fontWeight:'bold',
    color:'black',
    textAlign:'center',
    alignSelf:"stretch",
  },
  boxSchedule:{
    height: hBox,
    width: wBox,
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center'
  }

});

export default ShiftInfo;
