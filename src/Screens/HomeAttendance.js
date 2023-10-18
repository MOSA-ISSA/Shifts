import React, {useContext, useState} from 'react';
import {View, StyleSheet, TextInput, Text, FlatList, KeyboardAvoidingView, Alert, TouchableHighlightComponent, TouchableOpacity} from 'react-native';
import TheModal from '../component/TheModal';
import { globalHW } from '../../Storge/global';
import TheButton from '../component/TheButton';
import TheContext from '../../Storge/thisContext';
import AddNewClassModal from '../component/AddNewClassModal';
import TheHeader from '../component/TheHeader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddLessons from '../component/AddLessons';

const exp = '{"class1": ["m", "b", "f", "a"]}'
    // console.log(exp);
//     const a = JSON.parse(exp)
//     console.log(a.class1[0]);
 // let addClass = ''
    // addClass+=('{\"'+className+'\":'+JSON.stringify(members)+'}')
    // const a = addClass
    // //console.log(a);

    //  const s = JSON.parse(a)

const HomeAttendance = () => {
    const navigation = useNavigation();


    const {Attendance,setAttendance,lessons,setLessons} = useContext(TheContext)
    const [modalVisible, setModalVisible]=useState(Attendance.length==0);
    const [ClassModal, setClassModal]=useState(false);


    // console.log(Attendance);

     const renderClasses =(item)=>(
        <TouchableOpacity style={styles.Box} onPress={()=>navigation.navigate('TheClass',{class:item})}>

            <View style={styles.centerContainer}>
                <Text>{item.className}</Text>
                <TheButton
                buttonName={'x'}
                buttonNameStyle={{ color: '#FFF', fontSize: 15 }}
                buttonStyle={{ height: 20, width: 20, }}
                onPress={() => removeItem(item)}
                />
            </View>
            
        </TouchableOpacity>
    )

    const removeItem = (item) => {
        let index = Attendance.indexOf(item);
        let updatedAttendance = [...Attendance];
        updatedAttendance.splice(index, 1);
        setAttendance(updatedAttendance);
        claudRemoveClass(updatedAttendance)
        removeClassLesson(item.className)
    };
    console.log(lessons);
    const removeClassLesson = async (className)=>{
        const newData = lessons.map((item) => {
        const newItem = item.map((subItem) => {
            if (Array.isArray(subItem)) {
            return subItem.splice(1, 2);
            } else {
            return subItem;
            }
        });
        return newItem;
        });
        // console.log(newData);
        setLessons(newData)
        await AsyncStorage.setItem(
            'lessons',
            JSON.stringify (newData)
          );
    }

    const onDoneAdding=(className,members)=>{
        var Class = {
            className:className,
            members:[...members],
        }
        if (members.length>0) {
            setAttendance([...Attendance,{...Class}])
            // console.log(Attendance);
            savedata(Class)
            // console.log(Attendance);
            setClassModal(false)
        }else{
            Alert.alert('you didn\'t add members' , '', [
                {
                    text: 'Ok',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]);
        }
    }

    const savedata =async(Class)=>{
        console.log(Class);
        try {
            await AsyncStorage.setItem(
                'Attendance',
                JSON.stringify ([...Attendance,{...Class}])
            ),

            await AsyncStorage.setItem(
                'lessons',
                JSON.stringify (lessons)
            )
        }
        catch (error) {
          console.log('====================================');
          console.error('error');
          console.log('====================================');
        }
    };

    const claudRemoveClass =async(updatedAttendance)=>{
        // console.log(updatedAttendance);
        try {
            await AsyncStorage.removeItem(
                'Attendance'
            );
            try {
            await AsyncStorage.setItem(
                'Attendance',
                JSON.stringify ([...updatedAttendance,])
              );
            }catch (error) {
                console.error('error');
            }
          } catch (error) {
            console.log('====================================');
            console.error('error');
            console.log('====================================');
          }
    }

    const getRandomColor=()=> {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    return (
        <View style={{flex:1, backgroundColor:'#262e3b',}}>

            <TheHeader textHeader={'classes'}>
                <TheButton buttonName={'hdoor'} onPress={()=>navigation.navigate('Schedule')}/>
            </TheHeader>

            <TheModal setModalVisible={modalVisible}>
                <AddLessons setModalVisible={setModalVisible} />
                {/* <AddNewClassModal onDoneAdding={onDoneAdding} setModalVisible={setModalVisible} RandomColor={getRandomColor()}/> */}
            </TheModal>

            <TheModal setModalVisible={ClassModal}>
                <AddNewClassModal
                 onDoneAdding={onDoneAdding} 
                 setModalVisible={setClassModal} 
                 RandomColor={getRandomColor()}/>
            </TheModal>
            
            
            {Attendance.length != 0 ? (
            <View style={{flex:1, alignItems:'center',}}>
                <FlatList
                numColumns={3}
                data={Attendance}
                renderItem={({ item }) => renderClasses(item)}
                />
            </View>
            ) : null}

            <TheButton buttonName={'+ lessons'} buttonStyle={{backgroundColor: 'green',}} onPress={() => setModalVisible(true)} />
            <TheButton buttonName={'+ class'} buttonStyle={{backgroundColor: '#b6b2b2',}} onPress={() => setClassModal(true)} />
            <TheButton buttonName={'lessons class time'} buttonStyle={{backgroundColor: '#fab757',}} onPress={() => setClassModal(true)} />

        </View>
    );
}

const styles = StyleSheet.create({
    Box:{
    //  flex:1,
    width: globalHW.windowWidth*0.3,
    height:  globalHW.windowWidth*0.2,
     backgroundColor:'#839bc1',
     margin:5,
     borderRadius:10,
    },
    centerContainer: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
    },
    classContainer: {
        height:globalHW.windowWidth*0.10,
        flexDirection: 'column',
        marginBottom: 5,
        backgroundColor:'#fff',
        margin:5,
        borderRadius:3,
    },
    memberContainer: {
        height:globalHW.windowWidth*0.10,
        flexDirection: 'column',
        marginBottom: 5,
        backgroundColor:'#fff',
        margin:5,
        borderRadius:3,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:5,
    },
    addMemberButton:{
        width: '10%',
        backgroundColor: '#262e3b',
        margin:5,
        borderRadius:100
    },
    doneAddingButton:{backgroundColor:'green',padding:2,borderRadius:100}
})

export default HomeAttendance;
