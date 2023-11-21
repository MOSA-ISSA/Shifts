import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { globalHW } from '../../Storge/global';

const h = globalHW.windowHeight;
const w = globalHW.windowWidth;
const hBox = h/15;
const wBox = w/4-3;
const fontSize = hBox/2.8;
const duration = 5;

const App = () => {
  const currentDateTime = new Date();
  const [schedule, setSchedule] = useState([]);

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
    setSchedule((prevSchedule) => [...prevSchedule, shiftData]);
    //set remainder // مذكر
  };

  const handleEndShift = () => {
    if (schedule.length <= 0) {return}
    const endShift = //time
    `${currentDateTime.getHours()}:`+
    `${currentDateTime.getMinutes()}`;

    const lastShift = schedule[schedule.length-1];

    const durationInMinutes  = getDurationInMinutes(
      {start:lastShift['_date'],end:currentDateTime}
    );

    if (durationInMinutes < duration) {
      alertStart()
    } else {
      // Update the end time of the last added shift
      setSchedule((prevSchedule) => {
        lastShift.duration= (durationInMinutes/60).toFixed(2)
        lastShift.end = endShift;
        return [...prevSchedule];
      });
    }
  };

  const getDurationInMinutes = ({start,end}) =>{
    return (end - start) / (1000 * 60);
  }

  const alertStart=()=>(
    Alert.alert(
        'Invalid Shift End',
        `Shift duration must be at least ${duration} minutes.`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') },
          { text: 'cancel shift', onPress: () =>{schedule.pop(),setSchedule([...schedule])}}
        ],
      )
  )
  
  const RenderBox =({shift})=>{
    const scheduleOption=['date','start','end','duration']
    console.log(shift);
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

  return (
    <View style={styles.container}>
      <Button title="Add Shift" onPress={addShiftToSchedule} />
      <Button title="End Shift" onPress={handleEndShift} />
        <RenderBox/>

      <FlatList
        data={schedule}
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
    padding: 6,
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

export default App;
