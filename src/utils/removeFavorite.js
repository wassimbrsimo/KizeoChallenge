function removeFavorite(array, payload) {
  return array.filter(item => item.id != payload.id);
}

module.exports = removeFavorite;
