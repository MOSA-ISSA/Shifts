import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HalfCircleWithButtons = () => {
  return (
    <View style={{flex:1, backgroundColor: '#303030'}}>

    <View style={styles.top}></View>

    <View style={styles.container}>
        <View style={styles.button}></View>
        <View style={styles.halfCircle}></View>
        <View style={styles.button}></View>
    </View>

   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // position: 'relative',
  },
  halfCircle: {
    width: '70%',
    height: 20,
    backgroundColor: '#199199',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    // borderEndWidth:50,
    // borderStartWidth:50,
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 5,
    borderRadius:100,
  },
  top:{
    // borderEndWidth:50,
    // borderStartWidth:50,
    width:'100%',
    height:100,
    backgroundColor:'#199199',
    borderBottomEndRadius:50,
    borderBottomStartRadius:50,
  },
  Right: {
    // right: 0,
    zIndex: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
  },
});

export default HalfCircleWithButtons;
