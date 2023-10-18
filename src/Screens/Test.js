import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 70;

const CollapsingHeader = () => {
  const scrollPosition = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 500],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });



  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Text style={styles.title}>Collapsing Header</Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
          { useNativeDriver: false },
        )}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>

        {['a','b','c','a','b','c','a','b','c','a','b','c',].map((item,i)=>(
            <View key={i} style={styles.V}>

            </View>
        ))}
      </Animated.ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6a5acd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  V:{
    height: 200,
    width: 200,
    padding:10,
    margin:10,
    backgroundColor:"#252525"
  }
});

export default CollapsingHeader;
