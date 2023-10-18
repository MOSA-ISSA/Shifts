import React,{useContext} from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import TheContext from '../../Storge/thisContext';
import TheButton from '../component/TheButton';
import { globalHW } from '../../Storge/global';

const Schedule =()=>{

    const now = new Date();
    const day = now.getDay();
    const  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const {lessons,setLessons} = useContext(TheContext)

    const renderLessons =(item)=>(
        <TouchableOpacity style={styles.lessonsCover}>
            <Text style={styles.Text}>{item}</Text>
        </TouchableOpacity>
    )

return(

    <View style={{flex:1, backgroundColor:'#255',alignItems:'center',}}>
        <Text style={styles.Text}>{weekDays[day]} lessons</Text>
        <View style={{height: '80%',width: '100%', marginTop:20}}>
            {/* <FlatList
            style={{flex:1,marginHorizontal:20}}
            data={lessons}
            renderItem={({ item }) => renderLessons(item)}
            /> */}
        </View>
        <TheButton buttonName={'+'} buttonStyle={styles.addButtonSt}/>
    </View>
)    
}

const styles = StyleSheet.create({
    Text:{
        fontSize: 20,
        fontWeight:'600',
    },
    lessonsCover:{
        flex:1,
        borderRadius:100,
        backgroundColor:'#199',
        padding:5,
        margin:5,
        alignItems:'center'
    },
    addButtonSt:{
        height:globalHW.windowWidth*0.15,
        width: globalHW.windowWidth*0.15,
        backgroundColor:'green',
        borderRadius:100
    }
})

export default Schedule