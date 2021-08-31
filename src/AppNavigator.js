import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import DetailsScreen from './Screens/DetailsScreen';
import MapScreen from './Screens/MapScreen';
import ListScreen from './Screens/ListScreen';
import FavoriteScreen from './Screens/FavoriteScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {setData, setLocation, setOffline} from './Redux/actions/dataActions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {getData} from './utils/API';
export default function AppNavigator(props) {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const location = useSelector(state => state.data.Location);
  const restaurants = useSelector(state => state.data.restaurants);
  const [LoadingStatus, setLoadingStatus] = useState('');
  const LoadingStatusTexts = {
    '': 'Loading',
    INIT: 'Enabling Location',
    GPS: 'retrieving GPS coordinates',
    REQUEST: 'Requesting Data',
    DONE: 'Loaded Successfully',
    PERMISSION: 'Please enable location permission',
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
  const enableGPS = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(async data => {
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
        setLoadingStatus('GPS');
      })
      .catch(err => {
        if (restaurants.length > 0) setLoadingStatus('DONE');
        else setLoadingStatus('');
      });
  };
  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      if (restaurants.length > 0) setLoadingStatus('DONE');
      else setLoadingStatus('PERMISSION');
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        dispatch(setLocation(position));
        setLoadingStatus('REQUEST');
      },
      error => {
        console.error(`Code ${error.code}`, error.message);
        dispatch(setLocation(null));
        setLoadingStatus('INIT');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const requestAPIData = () => {
    getData(location, (success, payload) => {
      if (success) {
        console.log('DONE ', payload.data.restaurants);
        dispatch(setData(payload.data.restaurants));
        dispatch(setOffline(false));
        setLoadingStatus('DONE');
      } else {
        dispatch(setOffline(true));
        setLoadingStatus('DONE');
      }
    });
  };
  useEffect(() => {
    switch (LoadingStatus) {
      case '': //etat pre-initial
        setLoadingStatus('INIT');
        break;
      case 'INIT': //cette etape active le gps au cas ou il est desactiver
        enableGPS();
        break;
      case 'GPS': //cette etape prend la position de l'utilisateur
        getLocation();
        break;
      case 'REQUEST': // une fois la localisation obtenue, On fait la requete d'API
        requestAPIData();
        break;
    }
  }, [LoadingStatus]);

  function TabsView() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            margin: 20,
            height: 60,
            borderRadius: 20,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = focused ? 'ios-map' : 'ios-map-outline';
            } else if (route.name === 'List') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Map"
          options={{headerShown: false}}
          component={MapScreen}
        />
        <Tab.Screen
          name="List"
          options={{headerShown: false}}
          component={ListScreen}
        />
        <Tab.Screen
          name="Favorite"
          options={{headerShown: false}}
          component={FavoriteScreen}
        />
      </Tab.Navigator>
    );
  }
  function AppView() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabsView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{
            presentation: 'card',
            animation: 'slide_from_bottom',
          }}
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    );
  }
  function LoadingScreen() {
    return (
      <View style={Styles.LoadingScreen}>
        <ActivityIndicator size={50} color="tomato" />
        <Text style={Styles.LoadingText}>
          {LoadingStatusTexts[LoadingStatus]}
        </Text>
      </View>
    );
  }
  if (LoadingStatus == 'DONE') {
    return <AppView />;
  } else {
    return <LoadingScreen />;
  }
}

const Styles = StyleSheet.create({
  LoadingScreen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoadingText: {fontWeight: 'bold', fontSize: 16},
});
