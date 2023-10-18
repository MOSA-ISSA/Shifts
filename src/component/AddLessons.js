import React, {useState,useContext} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Pressable, Alert, FlatList} from 'react-native';
import { globalHW } from '../../Storge/global';
import TheButton from './TheButton';
import TheContext from '../../Storge/thisContext';
import TheModal from './TheModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddLessons = ({setModalVisible}) => {
    console.log('AddLessons');

    const {lessons,setLessons} = useContext(TheContext)
    const [day, setday] = useState('shose day');
    const  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [dauyChoices,setDayChoice] =useState(false);
    const [number, setNumber] = useState('');


    const lessonsInWeek =([
      ['Sunday',],
      ['Monday',],
      ['Tuesday',],
      ['Wednesday',],
      ['Thursday',],
      ['Friday',],
      ['Saturday',],
    ])

    const onDoneAdding =()=>{
        setModalVisible(false)
    }

    const NumConditions = () =>
    Alert.alert('lessons num most be', '10>num>0', [
      {
        text: 'Ok',
        onPress: () => setNumber(''),
        style: 'cancel',
      },
    ]);

    const saveLessonsNum =()=>{
      if (number !== 0 && (day === 'shose day' || day === 'for all the week')) {
        let newlessonsInWeek = lessonsInWeek.map((item) => {
          let newItem = [...item];
          for (let i = 0; i < number; i++) {
            newItem.push(['lesson' + (i + 1)]);
          }
          return newItem;
        });
        // console.log(newlessonsInWeek);
        StorageSave(newlessonsInWeek)
        setLessons(newlessonsInWeek);
      } else if (number !== 0 && day === 'sun - thur') {
        let newlessonsInWeek = lessonsInWeek.map((item) => {
          let newItem = [...item];
          if (item != 'Friday' && item != 'Saturday') {
            for (let i = 0; i < number; i++) {
                newItem.push(['lesson' + (i + 1)]);
              }
              return newItem;
          } else {
            return item;
          }
        });
        // console.log(newlessonsInWeek);
        // StorageSave(newlessonsInWeek)
        setLessons(newlessonsInWeek);
      }  
      else {
        let newlessonsInWeek = lessons.map((item) => {
          if (item[0] === day) {
            let newItem = [day];
            for (let i = 0; i < number; i++) {
                newItem.push(['lesson' + (i + 1)]);
            }
            return newItem;
          } else {
            return item;
          }
        });
        // console.log(newlessonsInWeek);
        // StorageSave(newlessonsInWeek)
        setLessons(newlessonsInWeek);
      }
    }

    const StorageSave=async (item)=>{
      console.log(item);
      await AsyncStorage.setItem(
        'lessons',
        JSON.stringify(item)
      );
    }

    const getdata =async()=>{
      //let date = (((now.getMonth()+1).toString())+'/'+now.getFullYear().toString())
      try {
          let item =await AsyncStorage.getItem('lessons')
          console.log(item);
      } catch (error) {
        // Error saving data
      }
    };
    // getdata()

    const Schedule = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wedn', 'Thurs', 'Fri', 'Sat'];
      
        return (
          <View style={styles.Schedule}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={{width:'13%',height: '100%', flexDirection: 'column',alignItems:'center',backgroundColor:'#262e3b'}}>
                <View style={{backgroundColor:'#199',height: '10%',width:'90%',alignItems:'center',borderRadius:5}}>
                    <Text>{day}</Text>
                </View>
                
                <Schedulelessons index={index}/>

              </View>
            ))}
          </View>
        );
      };

      const Schedulelessons = ({index}) => {
        return (
            <View style={{flexDirection: 'column',backgroundColor:'#4545',width:'90%',height: '89%',alignItems:'center',borderRadius:5}}>
              {Array(parseInt(9)).fill().map((_, i) => (
                <View key={i} style={{height: '10%',width:"80%",margin:1,alignItems:'center'}}>
                {lessons[index].length-1>i?
                    <TouchableOpacity
                     key={i} style={{backgroundColor:lessons[index].length-1>i?'#159459':'#4545',height: '100%',width:"100%",margin:1,alignItems:'center',borderRadius:5}}>
                        <Text>{i+1}</Text>
                    </TouchableOpacity>
                :
                <View key={i} style={{backgroundColor:'#4545',height: '100%',width:"100%",margin:1,alignItems:'center',borderRadius:5}}/>
                }
                </View>
              ))}
            </View>
          );
        };

    return (
        <View style={{flex:1,backgroundColor:'#839bc1',alignItems:'center'}}>
            <View style={styles.Box}>
                <TheButton buttonName={'x'}
                    buttonStyle={{flexGrow: 1,alignItems: 'flex-end',}}
                    buttonNameStyle={{fontSize:16,}}
                    onPress={()=>setModalVisible(false)}
                />

                <TheButton 
                 buttonName={(number!=''&& day=='shose day')?'for all the week':day}
                 buttonStyle={styles.memberContainer}
                 buttonNameStyle={{color:'black'}}
                 onPress={()=>setDayChoice(true)}
                 />
                
                <View style={styles.memberContainer}>
                    <TextInput
                        style={{flexGrow:1,}}
                        onChangeText={(num)=>((num>0&&num<10||num==''))?setNumber(num):NumConditions()}
                        value={number}
                        placeholder="num of lessons"
                        keyboardType="numeric"
                    />
                    <TheButton buttonName={'save'}
                    buttonStyle={styles.saveAddingButton}
                    buttonNameStyle={{fontSize:16,}}
                    onPress={()=>saveLessonsNum()}
                    />
                </View>
                <View style={{flexGrow:1,flexDirection: 'row-reverse', justifyContent:'space-between'}}>
                    <TheButton buttonName={'done'}
                        buttonStyle={styles.doneAddingButton}
                        buttonNameStyle={{fontSize:16,}}
                        onPress={()=>onDoneAdding()}/>
                </View>
            </View>

            <TheModal setModalVisible={dauyChoices}>
                <Pressable style={{width: globalHW.windowWidth,alignItems:'center',padding:60}}
                onPress={()=>setDayChoice(false)}>
                    <View style={{width: globalHW.windowWidth*0.583,backgroundColor:'#fff',borderRadius:20}}>
                        <TheButton buttonName={'^'}
                        buttonStyle={{margin:10, backgroundColor: '#262e3b', borderRadius:20}}
                        buttonNameStyle={{fontSize:20,}}
                        onPress={()=>setDayChoice(false)}
                        />

                        <View style = {{flexDirection:'row'}}>
                            <TouchableOpacity style={{margin:10, backgroundColor: '#454545', borderRadius:20}}
                                onPress={()=>[setday('for all the week'),setDayChoice(false)]}>
                                <Text style={{color:'#fff', fontSize:20, padding:5}}>{'all the week'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{margin:10, backgroundColor: '#454545', borderRadius:20}}
                                onPress={()=>[setday('sun - thur'),setDayChoice(false)]}>
                                <Text style={{color:'#fff', fontSize:20, padding:5}}>{'sun - thur'}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        {weekDays.map((item)=>(
                            <TouchableOpacity key={item} style={{margin:10, backgroundColor: '#262e3b', borderRadius:20, alignItems:'center'}}
                            onPress={()=>[setday(item),setDayChoice(false)]}>
                            <Text key={item} style={{color:'#fff', fontSize:20, padding:5}}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </TheModal>

            <Schedule/>

            {lessons.map((item)=>(
                <Text key={item[0]}>{item[0]} lessons: {item.length>1?(item.length-1):'no lesson'}</Text>
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    Box:{
    //  flex:1,
    width: globalHW.windowWidth*0.8,
     backgroundColor:'#262e3b',
     padding:25,
     paddingHorizontal:40,
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
    doneAddingButton:{backgroundColor:'green',padding:2,borderRadius:100},
    saveAddingButton:{backgroundColor:'#259',padding:2,borderRadius:100},
    numContainer:{paddingHorizontal:10,backgroundColor:'black'},

    Schedule:{
        flexDirection: 'row',
        flexWrap:'wrap',
        backgroundColor:'#262e3b',
        width:globalHW.windowWidth*0.9,
        height:globalHW.windowWidth*0.6,
        justifyContent:'space-around',
        borderRadius:10,
        padding:1
    }
})

export default AddLessons;
