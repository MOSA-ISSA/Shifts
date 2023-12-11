import React, { useRef, useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { globalHW } from '../../Storge/global';
import TheContext from '../../Storge/thisContext';
import Geolocation from '@react-native-community/geolocation';

const StateNotifacation = () => {
  const { currentLocation, setCurrentLocation } = useContext(TheContext);
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false); // Set loading to false when the location is found
      },
      (error) => {
        console.log('Error getting location:', error);
        setLoading(false); // Set loading to false when an error occurs

        if (error.code === 1) {
          // PERMISSION_DENIED
          handlePermissionDenied();
        } else if (error.code === 2) {
          // POSITION_UNAVAILABLE
          console.log('Location information is unavailable.');
        } else if (error.code === 3) {
          // TIMEOUT
          console.log('Location request timed out.');
        } else {
          console.log('An unknown error occurred while getting location.');
        }
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 } // Increased timeout
    );
  };

  const animatableRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
    // Trigger the animation on mount
    animatableRef.current?.bounceIn(); // You can use any animation method you prefer
  }, [getCurrentLocation]);

  return (
    <Animatable.View
      ref={animatableRef}
      style={styles.note}
      animation="bounceIn"
      duration={3000} // Adjust the duration as needed
    >
      <Text style={styles.text}>test note</Text>
      {loading ? null : <ActivityIndicator style={styles.loadingIndicator} size="small" color="black" />}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    margin: 5,
    borderRadius: 50,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    margin: 5,
    marginHorizontal: 10,
  },
  loadingIndicator: {
    margin: 5,
  },
});

export default StateNotifacation;
