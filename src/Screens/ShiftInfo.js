import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert,} from 'react-native';
import { currentDateTime, globalHW } from '../../Storge/global';
import TheContext from '../../Storge/thisContext';
import { filterDataByDate } from '../methods/methods';
import SelectDate from '../component/SelectDate';

const h = globalHW.windowHeight;
const w = globalHW.windowWidth;
const hBox = h/15;
const wBox = w/4-3;
const fontSize = hBox/2.8;
const duration = 0;

const ShiftInfo = (props) => {
  const {dataTitle,index}=props.route.params;
  const currentDate = currentDateTime;// import all date methods
  const {ShiftColiction,setShiftColiction} = useContext(TheContext);
  const currentShiftInfo = ShiftColiction?.[index]?.ShiftInfo
  const lastIndex = currentShiftInfo.length-1
  const lastShift = currentShiftInfo[lastIndex]

  const data = ShiftColiction[index].ShiftInfo;
   // console.log('the data ',data);
  const [ShiftState, setShiftState] = useState((lastShift?.end==='-')?'end shift':'start shift');//[start shift, end shift]
  const startMonth = new Date (currentDate.getFullYear(),currentDate.getMonth())
  // console.log('startMonth',startMonth.toLocaleDateString());

  const getLastDayOfMonth = () => { //*date
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const lastDay = new Date(nextMonth - 1);
    return lastDay;
  };
  // console.log("getLastDayOfMonth",getLastDayOfMonth().toLocaleDateString());

  const [filterDate, setFilterDate] = useState({from:startMonth,to:getLastDayOfMonth()});//?
  const filtered = filterDataByDate(data,filterDate.from,filterDate.to)

  const addShiftToSchedule = () => {
    const startShift = //time
     `${currentDate.getHours()}:`+
     `${currentDate.getMinutes()}`;
     //currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const shiftData = {
      date:currentDate,
      start: startShift,
      end:'-',
      duration:'-'
    };
    
    // Update the state with the new shift data
    // schedule.push(shiftData)
    ShiftColiction[index].ShiftInfo.push(shiftData)
    setShiftState('end shift')
    setShiftColiction([...ShiftColiction])
    //set remainder // مذكر
  };

  const handleEndShift = () => {
    if (data.length <= 0) {return}
    
    const endShift = //time
    `${currentDate.getHours()}:`+
    `${currentDate.getMinutes()}`;

    const lastShift = data[data.length-1];

    const durationInMinutes  = getDurationInMinutes(
      {start:lastShift['date'],end:currentDate}
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
    // console.log("test",shift);
    return(
      <View style={styles.hedSchedule} >
        {scheduleOption.map((item,i)=>(
        <View key={i} style={styles.boxSchedule}>

          {item=="date"&&shift?.[item]?
          <Text style={styles.scheduleOption}>
            {DateToString(shift?.[item]) || item}
          </Text>:
          <Text style={styles.scheduleOption}>
            {shift?.[item] || item}
          </Text>
          }
        </View>
      ))}
      </View>
    )
  }

  const DateToString =(date)=>{
    try {
      return new Date(date).toLocaleDateString()
    } catch (error) {
      console.log(error.messge);
      return "err"
    }
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
      <Text style ={{fontSize: 25,color:'#000',textAlign:'center'}}>{dataTitle}</Text>
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
