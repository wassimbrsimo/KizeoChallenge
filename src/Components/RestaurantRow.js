import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../Redux/actions/dataActions';
export default function RestaurantRow(props) {
  const {name, description, note, id, logo} = props.Restaurant;
  const favorites = useSelector(state => state.data.favorites);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log('Favorites updated', favorites);
    setIsFavorite(
      favorites.filter(restaurant => restaurant.id == id).length > 0,
    );
  }, [favorites]);

  return (
    <TouchableOpacity
      disabled={props.details}
      onPress={() => {
        props.navigation.navigate('Details', props.Restaurant);
      }}
      style={Styles.container}>
      {logo && (
        <Image style={Styles.image} source={{uri: logo}} resizeMode="contain" />
      )}
      {!logo && (
        <Image
          style={Styles.image}
          source={require('../Assets/restaurantPlaceholder.png')}
          resizeMode="contain"
        />
      )}
      <Text style={Styles.name}>{name}</Text>
      {props.details && (
        <Text style={Styles.description}>
          {description || 'No description'}
        </Text>
      )}
      <View style={Styles.row}>
        <View style={Styles.noteContainer}>
          <Ionicons name={'ios-star'} size={30} color={'tomato'} />
          <Text style={Styles.noteText}> {note ? note : 0}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (isFavorite) dispatch(removeFavorite(props.Restaurant));
            else dispatch(addFavorite(props.Restaurant));
          }}>
          {favorites && (
            <Ionicons
              name={isFavorite ? 'ios-heart' : 'ios-heart-outline'}
              size={50}
              color={'tomato'}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    elevation: 10,
    backgroundColor: '#2b2b2b',
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    margin: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  image: {alignSelf: 'center', borderRadius: 20, height: 100, width: 100},
  description: {alignSelf: 'center', color: 'gray', margin: 20},
  noteContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
  },
  noteText: {color: 'darkorange'},
});
