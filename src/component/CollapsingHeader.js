import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScrollIcon from './ScrollIcon';

const CustomCollapsingHeader = (props) => {
    // console.log(props);
    const {AnimatedStyle, AnimatedText, RangeMaxHeight, RangeMinHeight,inputRangeMin,inputRangeMax,iconSize,titleStyles,title}=props

    const Icon_Size = iconSize||50;
    const Range_MAX_HEIGHT = (RangeMaxHeight||200)-Icon_Size;
    const Range_MIN_HEIGHT = RangeMinHeight||0;
    const input_Range_Min= inputRangeMin||50;
    const input_Range_Max= (inputRangeMax||200)-Icon_Size;

    const pushRange = AnimatedStyle.height.interpolate({
        inputRange: [input_Range_Min, input_Range_Max],
        outputRange: [Range_MIN_HEIGHT, Range_MAX_HEIGHT],
        extrapolate: 'clamp',
    });

    // console.log('push',pushRange);

    const RenderSids =({text})=>(
        <View style={styles.sides} >
            <Animated.View style={{height: pushRange,}}/>
            <View style={styles.boxIcon}>
                <ScrollIcon Icon={text}/>
            </View>
        </View>
    )

  return (
    <View style={{flex:1,flexDirection:"row",}}>

        <RenderSids text={'☰'}/>

        <View style={styles.inSideHeader}>
            <Text style={[titleStyles||styles.title,]}>{title||"Collapsing Header"}</Text>
            {AnimatedText?.map((item,i)=>
                <Animated.Text key={i} style={[styles.text,{fontSize: AnimatedStyle.fontSize, marginBottom:AnimatedStyle.marginB, }]}>{item||''}</Animated.Text>
            )}
        </View>

        <RenderSids text={'⚙'}/>
    
    </View>
  )
}

export default CustomCollapsingHeader

const styles = StyleSheet.create({
    inSideHeader:{
        // width: '70%',
        // flex:1,
        flexGrow:1,  
        // alignSelf:'stretch',
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'blue',
    },
    sides:{
        // backgroundColor: 'red',
        // paddingTop:10,
        flexGrow:0.2,
    },
    boxIcon:{
        height:50,
        // backgroundColor:'#fff',
        // borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        backgroundColor:'#fff',
        borderRadius:5,
        width: '80%',
        textAlign:'center',
        color:"#000",
    },
    title: {
        fontSize: 25,
        color: '#fff',
    },
})