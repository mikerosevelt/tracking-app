import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Context as TrackContext } from '../context/TrackContext';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(useContext);
  const id = navigation.getParam('_id');

  const track = state.find((t) => t._id === id);
  const initialCoords = track.locations[0];

  return (
    <>
      <Text>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          longtitudeDelta: 0.01,
          latituteDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;
