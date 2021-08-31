import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ConnectingStatus from '../Components/ConnectingStatus';
import RestaurantRow from '../Components/RestaurantRow';

export default function ListScreen(props) {
  const restaurants = useSelector(state => state.data.restaurants);
  return (
    <View style={Styles.container}>
      <ConnectingStatus />
      <Text style={Styles.title}>Restaurants</Text>
      <FlatList
        data={restaurants}
        contentContainerStyle={Styles.containerStyle}
        renderItem={({item, index}) => {
          return (
            <RestaurantRow
              navigation={props.navigation}
              key={index}
              Restaurant={item}
            />
          );
        }}
      />
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {flex: 1},
  containerStyle: {paddingBottom: 120},
  title: {fontSize: 30, margin: 20, fontWeight: 'bold'},
});
