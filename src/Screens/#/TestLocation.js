import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const LocationPermissionExample = () => {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      setLocationPermission(result);
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const handleRequestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      setLocationPermission(result);
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Card elevation={3} style={{ width: '80%' }}>
        <Card.Content>
          <Title>Location Permission</Title>
          <Paragraph>
            This example demonstrates how to check and request location permission on Android.
          </Paragraph>
          <View style={{ marginTop: 20 }}>
            <Text>Status: {locationPermission}</Text>
            {locationPermission === RESULTS.DENIED && (
              <Button
                mode="contained"
                onPress={handleRequestLocationPermission}
                style={{ marginTop: 10 }}
              >
                Request Location Permission
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LocationPermissionExample;
