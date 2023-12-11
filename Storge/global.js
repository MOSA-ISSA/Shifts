import { StyleSheet,Dimensions } from 'react-native';
import * as RNLocalize from 'react-native-localize';

export const globalHW ={
    windowWidth : Dimensions.get('window').width,
    windowHeight : Dimensions.get('window').height, 
}

export const globalColor={
  
}

export const deviceRegion = RNLocalize.getCountry();

export const currentDateTime = new Date();

export const localeDateString=(date)=>{
    return (new Intl.DateTimeFormat('en-'+deviceRegion).format(date))
}

export const unionDate = currentDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

//   fix on Select date

{
    // const year = now.getFullYear();  // e.g. 2023
    // const month = now.getMonth();  // 0-based index, so January is 0, February is 1, etc.
    // const date = now.getDate();  // day of the month (1-31)
    // const day = now.getDay();  // 0-based index, so Sunday is 0, Monday is 1, etc.
    
    //console.log(ShiftInfo.dayDate.toString()+'/'+ShiftInfo.month.toString()+'/'+ShiftInfo.year.toString())
}