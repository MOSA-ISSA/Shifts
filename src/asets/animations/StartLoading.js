import LottieView from 'lottie-react-native';
import React, { useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';

const StartLoading = props => {
    console.log('StartLoading');
    const {ShiftInfo,setAttendance,setLessons,lessons,Attendance} = useContext(TheContext)
    const [stop, setStop] = useState([0]);

    

    const restorData = async ()=>{
        let key = await AsyncStorage.getAllKeys()

        console.log(key);

        let Shift = key.filter((date) => {
            return date.includes('/');
        });

        // let attendance = key.filter((a) => {
        //     return a.includes('Attendance');
        // });

        // let Thelessons = key.filter((l) => {
        //     return l.includes('lessons');
        // });

        //console.log(attendance);

        if (Shift.length!=0) {
            let item =JSON.parse(await AsyncStorage.getItem(Shift.pop()));
            ShiftInfo.in=item.in
            ShiftInfo.out=item.out
        }

        if (stop.length==1) {
            let attendance=JSON.parse(await AsyncStorage.getItem('Attendance'));
            let Thelessons=JSON.parse(await AsyncStorage.getItem('lessons'));
            // console.log(('///////////')+await AsyncStorage.getItem('lessons'));
            setStop([])
            if (Thelessons) {
                setLessons(Thelessons)
            }
            if (attendance) {
                setAttendance(attendance)
            }
            // if (Thelessons.length!=0) {
            //     setLessons(Thelessons)
            // }
        }
    }

    return (
        <View style={styles.Screen}>
            <LottieView 
            speed={2}
            source={require('./StartLoudingAnimation.json')}
            autoPlay
            loop={false}
            resizeMode={'contain'}
            // onAnimationLoop={restorData()}
            onAnimationFinish={()=>props.navigation.navigate('MainScreen')}// Test
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Screen:{
        flex:1, 
        backgroundColor:"#252525",
    }
})

export default StartLoading;
