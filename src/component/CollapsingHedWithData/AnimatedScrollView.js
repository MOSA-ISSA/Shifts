import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AnimatedScrollView = ({
  scrollPosition,
  data,
  RenderItem,
}) => {
  return (
    <FlatList
        data={data||['a','b','c','a','b','c','a','b','c','a','b','c',]}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          RenderItem?<RenderItem/>:<View style={styles.item}/>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
          { useNativeDriver: false },
        )}
    />
  )
}

export default AnimatedScrollView

const styles = StyleSheet.create({
      item:{
        height: 200,
        width: 200,
        padding:10,
        margin:10,
        backgroundColor:"#252525",
        alignSelf:'center',
      }
})