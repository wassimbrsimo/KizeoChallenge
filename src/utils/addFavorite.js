function addFavorite(array, payload) {
  let favoritesArray = array.concat(payload);
  return favoritesArray;
}

module.exports = addFavorite;
