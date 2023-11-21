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

  const [ShiftColiction,setShiftColiction] = useState([
    // shift
    {
      title:'test',
      ShiftInfo:[
        {
          _date: "2023-11-21T02:35:24.427Z",
          date: "11/21/2023",
          duration: "0.10",
          end: "4:41",
          start: "4:35"
        }
      ]
    }
  ])

  return (
    <TheContext.Provider
      value={{
        ShiftColiction,
        setShiftColiction,
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