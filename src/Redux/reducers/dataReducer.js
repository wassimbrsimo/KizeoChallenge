import addFavorite from '../../utils/addFavorite';
import removeFavorite from '../../utils/removeFavorite';

const initialState = {
  Location: null,
  restaurants: [],
  isOffline: true,
  favorites: [],
};

const dataReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOCATION': {
      return {...state, Location: payload};
    }
    case 'DATA': {
      return {...state, restaurants: payload};
    }
    case 'OFFLINE': {
      return {...state, isOffline: payload};
    }
    case 'FAVORITE': {
      return {...state, favorites: addFavorite(state.favorites, payload)};
    }
    case 'REMOVE_FAVORITE': {
      return {
        ...state,
        favorites: removeFavorite(state.favorites, payload),
      };
    }
    default: {
      return initialState;
    }
  }
};
export default dataReducer;
