import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomCollapsingHeader = () => {
  return (
    <View style={{flex:1,flexDirection:"row",}}>
        
        <View style={styles.sides} >
            <View style={styles.boxIcon}></View>
        </View>

        <View style={styles.inSideHeader}></View>

        <View style={styles.sides} >
            <View style={styles.boxIcon}></View>
        </View>
    
    </View>
  )
}

export default CustomCollapsingHeader

const styles = StyleSheet.create({
    inSideHeader:{
        width: '70%',
    },
    sides:{
        paddingTop:10,
        width:'15%',
        flexGrow:1,
    },
    boxIcon:{
        height:50,
        backgroundColor:'#454545',
        borderRadius:100,
    },
})