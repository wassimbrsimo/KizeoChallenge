// visitCar
export const setData = data => ({
  type: 'DATA',
  payload: data,
});
export const setLocation = data => ({
  type: 'LOCATION',
  payload: data,
});
export const addFavorite = data => ({
  type: 'FAVORITE',
  payload: data,
});
export const removeFavorite = data => ({
  type: 'REMOVE_FAVORITE',
  payload: data,
});
export const setOffline = isOffline => ({
  type: 'OFFLINE',
  payload: isOffline,
});
