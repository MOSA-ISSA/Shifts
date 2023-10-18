import React, {useState,useContext} from 'react';
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity} from 'react-native';
import { globalHW } from '../../Storge/global';
import TheButton from './TheButton';
import TheContext from '../../Storge/thisContext';

const AddNewClassModal = ({onDoneAdding,setModalVisible,RandomColor}) => {

    const {Attendance,lessons} = useContext(TheContext)
    const [className, setclassName] = useState('class'+(Attendance.length+1));
    const [memberName, setmemmberName] = useState('');
    const [members, setMembers]=useState([]);
    const [reloud, setReloud]=useState(true);

    //console.log(RandomColor);
    // const getRandomColor=()=> {
    //     const red = Math.floor(Math.random() * 256);
    //     const green = Math.floor(Math.random() * 256);
    //     const blue = Math.floor(Math.random() * 256);
    //     return `rgb(${red}, ${green}, ${blue})`;
    // }

    const addMemberButton =()=>{
        setMembers([...members,
            {
                name:memberName,
                attendanceDate:[]
            }
        ])
        setmemmberName('')
    }

    const rendermemberName =(item)=>(
        <View style={styles.memberContainer}>
            <Text>{item}</Text>
            <TheButton buttonName={'x'} buttonNameStyle={{color:'#4545',fontSize: 15,}}
            onPress={()=>removeItem(item)}/>
        </View>
    )

    const removeItem = (item) => {
        let index = members.indexOf(item);
        let updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

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

        // if (lessons[index]) {
        //     console.log(lessons[index]);
        // }

        return (
            <View style={{flexDirection: 'column',backgroundColor:'#4545',width:'90%',height: '89%',alignItems:'center',borderRadius:5}}>
              {Array(parseInt(9)).fill().map((_, i) => (
                <View key={i} style={{height: '10%',width:"80%",margin:1,alignItems:'center'}}>
                {lessons[index].length-1>i?
                    <TouchableOpacity
                     key={i} style={{
                        backgroundColor:
                        lessons[index][i+1].length==3?lessons[index][i+1][2]:lessons[index][i+1].length>1?RandomColor:'#159459',
                        height: '100%',width:"100%",
                        margin:1,alignItems:'center',
                        borderRadius:5}}
                        onPress={()=>{console.log(lessons[index][i+1]);
                                if (lessons[index][i+1].length<2) {
                                    console.log(lessons[index][i+1]);
                                    lessons[index][i+1].push(className)
                                    lessons[index][i+1].push(RandomColor)
                                    setReloud(!reloud)
                                }
                            }}>
                        <Text>{i+1}</Text>
                    </TouchableOpacity>
                :
                <View key={i} style={{backgroundColor:'#4545',height: '100%',width:"100%",margin:1,alignItems:'center',borderRadius:5}}/>
                }
                </View>
              ))}
            </View>
          );
        }

    return (
        <View style={{flex:1,backgroundColor:'#839bc1'}}>
            <View style={[styles.centerContainer,{marginTop:60}]}>
                    <View style={styles.Box}>
                        <TheButton buttonName={'x'}
                            buttonStyle={{flexGrow: 1,alignItems: 'flex-end',}}
                            buttonNameStyle={{fontSize:16,}}
                            onPress={()=>setModalVisible(false)}
                        />
                        <View style={{flexGrow:1,flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style={{color:'white'}}>members: {members.length}</Text>
                            <TheButton buttonName={'done'}
                             buttonStyle={styles.doneAddingButton}
                             buttonNameStyle={{fontSize:16,}}
                             onPress={()=>onDoneAdding(className,members)}/>
                        </View>

                        <View style={[styles.classContainer,{backgroundColor:RandomColor,}]}>
                            <TextInput
                                style={{height: '100%',width: '100%',}}
                                onChangeText={setclassName}
                                value={className}
                                placeholder="class"
                                keyboardType="ascii-capable"
                            />
                        </View>
                        <View style={styles.memberContainer}>
                            <TextInput
                                style={{height: '100%',width: '80%',}}
                                onChangeText={setmemmberName}
                                // onEndEditing={addMemberButton}
                                value={memberName}
                                placeholder="add members"
                                keyboardType="ascii-capable"
                            />
                            <TheButton buttonName={"+"}
                             buttonNameStyle={{fontSize: 15,}}
                             buttonStyle={styles.addMemberButton}
                             onPress={addMemberButton}/>
                        </View>
                        <FlatList
                            data={members}
                            renderItem={({item}) => rendermemberName(item.name)} 
                        />
                    </View>

                    <Schedule/>
                    
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Box:{
    //  flex:1,
    width: globalHW.windowWidth*0.6,
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

export default AddNewClassModal;
