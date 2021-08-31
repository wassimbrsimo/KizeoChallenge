import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import RestaurantRow from '../Components/RestaurantRow';
import {addFavorite, removeFavorite} from '../Redux/actions/dataActions';
export default function DetailsScreen(props) {
  return (
    <RestaurantRow
      details
      navigation={props.navigation}
      Restaurant={props.route.params}
    />
  );
}
