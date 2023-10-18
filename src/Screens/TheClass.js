import React,{useContext} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import TheButton from '../component/TheButton';
import TheHeader from '../component/TheHeader';
import TheContext from '../../Storge/thisContext';
import { Text } from 'react-native-animatable';
import { globalHW } from '../../Storge/global';


const TheClass = (props) => {
    //props.route.params.class
    const {Attendance,setAttendance} = useContext(TheContext)
    const theClass = props.route.params.class
    const className = props.route.params.class.className
    const indexofItem = Attendance.indexOf(props.route.params.class)
    console.log(indexofItem);
    //console.log(Attendance[indexofItem]==props.route.params.class);
    // const a =[1,2,3,4]
    // let v =a.indexOf(2)
    // console.log(v);
    console.log(theClass.members[0].attendanceDate);

    const renderMembers =(item)=>(
        <TouchableOpacity style={styles.Box}>

            <View style={styles.centerContainer}>
                <Text>{item.name}</Text>
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
        // let index = Attendance.indexOf(item);
        // let updatedAttendance = [...Attendance];
        // updatedAttendance.splice(index, 1);
        // setAttendance(updatedAttendance);
        // claudRemove(updatedAttendance)
    };

    return (
        <View style={{flex:1, backgroundColor:'#262e3b',}}>

            <TheHeader textHeader={"class: "+className}>
            </TheHeader>

            <FlatList
             data={theClass.members}
             numColumns={3}
             renderItem={({ item }) => renderMembers(item)}
            />
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

export default TheClass;
