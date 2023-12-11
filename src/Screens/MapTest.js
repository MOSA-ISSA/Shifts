import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, PermissionsAndroid, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
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

  const handleRequestLocation = () => {
    setLoading(true); // Set loading to true when requesting location
    checkLocationPermission();
  };

  const isLocationInCircle = (location, circleCenter, circleRadius) => {
    const { latitude: locationLat, longitude: locationLng } = location;
    const { latitude: circleLat, longitude: circleLng } = circleCenter;
  
    // Calculate the distance between the location and the circle center
    const distance = calculateDistance(locationLat, locationLng, circleLat, circleLng);
  
    // Check if the distance is within the circle radius
    return distance <= circleRadius;
  };
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
  
    return distance;
  };
  
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  
  // const locationToCheck = {
  //   latitude: 31.7749,
  //   longitude: 34.4194,
  // };
  
  // const circleCenter = {
  //   latitude: currentLocation.latitude,
  //   longitude: currentLocation.longitude,
  // };
  
  // const circleRadius = 100; // Adjust the radius as needed
  
  // const isInCircle = isLocationInCircle(locationToCheck, circleCenter, circleRadius);
  
  // if (isInCircle) {
  //   console.log('The location is within the circle.');
  // } else {
  //   console.log('The location is outside the circle.');
  // }
  

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="blue" />
      ) : (
        <MapView
          style={styles.map}
          zoomEnabled
          initialRegion={currentLocation 
          //   || {
          //   latitude: 0,
          //   longitude: 0,
          //   latitudeDelta: 0,
          //   longitudeDelta: 0,
          // }
          }>
          {currentLocation && (
          <>
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="You are here"
              description="Your current location"
            />
            <Circle
              center={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              radius={100}
              strokeColor="rgba(0, 0, 255, 0.5)" // Adjust the color and opacity of the outline
              fillColor="rgba(0, 0, 255, 0.1)" // Adjust the color and opacity of the fill
            />

          </>
            
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
