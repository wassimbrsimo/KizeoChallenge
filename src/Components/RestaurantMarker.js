import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
export default function RestaurantMarker(props) {
  const {logo, description, name, id, note} = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = useSelector(state => state.data.favorites);

  useEffect(() => {
    console.log('Favorites updated', favorites);
    setIsFavorite(
      favorites.filter(restaurant => restaurant.id == id).length > 0,
    );
  }, [favorites]);
  return (
    <View style={Styles.container}>
      <View style={Styles.row}>
        {logo && (
          <Image
            style={Styles.image}
            source={{uri: logo}}
            resizeMode="contain"
          />
        )}
        {!logo && (
          <Image
            style={Styles.image}
            source={require('../Assets/restaurantPlaceholder.png')}
            resizeMode="contain"
          />
        )}
        <View>
          <Text numberOfLines={1} ellipsizeMode="head" style={Styles.name}>
            {name.length > 16 ? name.substring(0, 13) + '...' : name}
          </Text>
          <View style={Styles.noteContainer}>
            <Ionicons name={'ios-star'} size={20} color={'tomato'} />
            <Text style={Styles.noteText}> {note ? note : 0}</Text>
          </View>
        </View>
        <Ionicons
          name={isFavorite ? 'ios-heart' : 'ios-heart-outline'}
          size={30}
          color={'tomato'}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    height: 60,
    width: 180,
    backgroundColor: 'rgba(0,0,0,.8)',
    borderRadius: 10,
    elevation: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  name: {color: 'white', fontWeight: 'bold', fontSize: 12},
  image: {height: 50, width: 50, borderRadius: 20, marginRight: 5},
  noteContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  noteText: {color: 'darkorange'},
});
