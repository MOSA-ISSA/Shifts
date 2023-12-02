import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, PermissionsAndroid, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const MapTest = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the current location when the component mounts
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('test req', result);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else if (result === RESULTS.DENIED) {
        console.log("if", result);
        // Request permission using PermissionsAndroid
        const permissionsAndroidResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'My App',
            message: 'Allow App to access your location',
          }
        );

        console.log(permissionsAndroidResult);

        if (permissionsAndroidResult === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log(result, "agin");
          handlePermissionDenied();
        }
      }
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const handlePermissionDenied = () => {
    Alert.alert(
      'Location Permission Denied',
      'To show your location on the map, we need access to your device location. Please enable location permission in your device settings.',
      [
        {
          text: 'OK',
          onPress: () => {
            // You can navigate to the app settings here
            // or provide any other user guidance.
          },
        },
      ]
    );
  };

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
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleRequestLocation = () => {
    setLoading(true); // Set loading to true when requesting location
    checkLocationPermission();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="blue" />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={currentLocation 
          //   || {
          //   latitude: 0,
          //   longitude: 0,
          //   latitudeDelta: 0,
          //   longitudeDelta: 0,
          // }
          }>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="You are here"
              description="Your current location"
            />
          )}
        </MapView>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRequestLocation}>
        <Text style={styles.buttonText}>Request Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapTest;
