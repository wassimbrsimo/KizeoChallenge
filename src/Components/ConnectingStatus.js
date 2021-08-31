import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function ConnectingStatus(props) {
  const isOffline = useSelector(state => state.data.isOffline);
  return (
    <View style={Styles.container}>
      <View
        style={[
          Styles.coloredCircle,
          {backgroundColor: isOffline ? 'red' : 'lime'},
        ]}
      />
      <Text style={Styles.statusText}>{isOffline ? 'Offline' : 'Online'}</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    elevation: 10,
    bottom: 100,
    left: 20,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  coloredCircle: {
    borderRadius: 40,
    margin: 5,
    height: 10,
    width: 10,
  },
  statusText: {fontWeight: 'bold'},
});
