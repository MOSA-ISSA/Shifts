import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing } from 'react-native';

const ScrollIcon = ({Icon}) => {
  const [iconAnimation] = useState(new Animated.Value(0));

  const handlePress = () => {
    // Define the animation configuration
    const animationConfig = {
      toValue: 1, // Value to animate to
      duration: 600, // Animation duration in milliseconds
      easing: Easing.linear, // Easing function (you can change this to create different effects)
      useNativeDriver: true, // Enable the native driver
    };

    // Start the animation
    Animated.timing(iconAnimation, animationConfig).start();

    // Reset the animation back to its original position after a delay
    setTimeout(() => {
      Animated.timing(iconAnimation, { toValue: 0, duration: 0, useNativeDriver: true }).start();
    }, animationConfig.duration);
  };

  // Use the iconAnimation value to apply a transform to the icon
  const iconStyle = {
    transform: [
      {
        rotate: iconAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.iconContainer]}>
        <Animated.Text style={[styles.icon,iconStyle]}>{Icon}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height:50,
    width: 50,
    alignSelf:'baseline',
    backgroundColor:'#fff',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
  },
  icon: {
    fontSize:25,
    fontWeight:'bold',
    color:'black',
  },
});

export default ScrollIcon;
