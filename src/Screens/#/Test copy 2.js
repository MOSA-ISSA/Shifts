import React, { useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';

const YourComponent = () => {
  const positionValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    console.log('TouchableWithoutFeedback pressed');

    // Start the animation when pressed
    Animated.timing(positionValue, {
      toValue: 100, // Set the target value or any other numeric value
      duration: 500, // Set the duration or use any animation configuration
      useNativeDriver: false, // `false` because `left` is not supported by the native driver
    }).start();

    // Additional logic you want to perform when pressed
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
      <Animated.View
        style={{
          left: positionValue, // Bind animated value to the left position
          position: 'absolute', // Required for the left property to work
          top: 100, // Set the top position or any other numeric value
          backgroundColor: 'blue',
          padding: 10,
        }}
      >
        <Text>Your Content Here</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default YourComponent;
