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
          date: "2023-11-22T18:47:05.744Z", 
          duration: "1", 
          end: "20:00", 
          start: "21:00",
        },
        {
          date: "2023-11-22T18:47:05.744Z", 
          duration: "1", 
          end: "20:00", 
          start: "21:00",
        },
        {
          date: "2023-11-21T02:35:24.427Z",
          duration: "0.10",
          end: "4:41",
          start: "4:35"
        },
        {
          date: "2023-11-22T18:47:05.744Z", 
          duration: "1", 
          end: "20:00", 
          start: "21:00",
        },
        {
          date: "2023-12-12T18:47:05.744Z", 
          duration: "1", 
          end: "20:00", 
          start: "21:00",
        },
        {
          date: "2023-12-22T18:47:05.744Z", 
          duration: "1", 
          end: "20:00", 
          start: "21:00",
        },
      ]
      

    },
    {
      title:'test2',
      ShiftInfo:[
        {
          date: "2023-11-22T18:47:05.744Z", 
          duration: "1", 
          end: "20:00", 
          start: "21:00",
        },
        {
          date: "2023-11-22T18:47:05.744Z", 
          duration: "1", 
          end: "20:00", 
          start: "21:00",
        },
        {
          date: "2023-11-21T02:35:24.427Z",
          duration: "0.10",
          end: "4:41",
          start: "4:35"
        },
        {
          date: "2023-11-22T18:47:05.744Z", 
          duration: "1", 
          end: "21:00", 
          start: "20:00",
        },
        {
          date: "2023-12-12T18:47:05.744Z", 
          duration: "2", 
          end: "22:00", 
          start: "20:00",
        },
        {
          date: "2023-12-22T18:47:05.744Z", 
          duration: "2", 
          end: "22:00", 
          start: "20:00",
        },
      ]
    }
  ])

  const [currentLocation, setCurrentLocation] = useState(null);

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