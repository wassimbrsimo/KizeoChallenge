import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import ConnectingStatus from '../Components/ConnectingStatus';
import RestaurantMarker from '../Components/RestaurantMarker';
export default function MapScreen(props) {
  const restaurants = useSelector(state => state.data.restaurants);
  const location = useSelector(state => state.data.Location);
  const [trackViewChanges, setTrackViewChanges] = useState(true);

  return (
    <View style={Styles.container}>
      <ConnectingStatus />
      <MapView
        style={{top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'}}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.12,
          longitudeDelta: 0.11,
        }}
        showsUserLocation={true}
        onMapReady={() =>
          setTimeout(() => {
            setTrackViewChanges(false);
          }, 200)
        }>
        {restaurants &&
          restaurants.map((marker, index) => {
            return (
              <Marker
                key={index}
                tooltip={false}
                tracksViewChanges={trackViewChanges}
                coordinate={{latitude: marker.lat, longitude: marker.long}}
                onPress={() => {
                  props.navigation.navigate('Details', {...marker});
                }}>
                <RestaurantMarker {...marker} />
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {flex: 1},
});
