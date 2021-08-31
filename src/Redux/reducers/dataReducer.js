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
      let favoritesArray = state.favorites.concat(payload);
      return {...state, favorites: favoritesArray};
    }
    case 'REMOVE_FAVORITE': {
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id != payload.id),
      };
    }
    default: {
      return initialState;
    }
  }
};
export default dataReducer;
