import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomCollapsingHeader = (props) => {
    console.log(props);
  return (
    <View style={{flex:1,flexDirection:"row",}}>
        
        <View style={styles.sides} >
            <View style={styles.boxIcon}>
                <Text>=</Text>
            </View>
        </View>

        <View style={styles.inSideHeader}>
            <Text>=</Text>
            <Text>=</Text>
            <Text>=</Text>
            <Text>=</Text>
        </View>

        <View style={styles.sides} >
            <View style={styles.boxIcon}>
                <Text>*</Text>
            </View>
        </View>
    
    </View>
  )
}

export default CustomCollapsingHeader

const styles = StyleSheet.create({
    inSideHeader:{
        width: '70%',
        alignItems:'center',
        justifyContent:'center'
    },
    sides:{
        paddingTop:10,
        width:'15%',
        flexGrow:1,  
    },
    boxIcon:{
        height:50,
        backgroundColor:'#fff',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
})