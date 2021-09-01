import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from '../reducers/rootReducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['data', 'user'], // choix des reducers qu'on veut utiliser en mode horsligne
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware());
let persistor = persistStore(store);

export {store, persistor};
