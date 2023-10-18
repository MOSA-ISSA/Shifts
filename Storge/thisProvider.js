import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';

import TheContext from './thisContext';

const TheProvider = props => {

  const now = new Date();

  const [ShiftInfo,setShiftInfo] = useState({
    year: now.getFullYear(),
    month: now.getMonth()+1,
    dayDate: now.getDate(),
    in: [],
    out: [],
  })

  const [Attendance,setAttendance] = useState([])

  const [lessons,setLessons] = useState([
    ['Sunday',],
    ['Monday',],
    ['Tuesday',],
    ['Wednesday',],
    ['Thursday',],
    ['Friday',],
    ['Saturday',],
  ])

  //const [admin,setAdmin]= useState(0)

  return (
    <TheContext.Provider
      value={{
        ShiftInfo,
        setShiftInfo,
        Attendance,
        setAttendance,
        lessons,
        setLessons,
      }}>
      {props.children}
    </TheContext.Provider>
  );
};

export default TheProvider;