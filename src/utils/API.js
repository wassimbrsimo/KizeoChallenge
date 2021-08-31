import axios from 'axios';
export const getData = (location, callback) => {
  console.log('AXIOS GETTING DATA ', location);
  const {latitude, longitude} = location.coords;
  axios
    .get(
      'https://xlmd94l53b.execute-api.eu-west-2.amazonaws.com/api?lat=' +
        latitude +
        '&long=' +
        longitude,
    )
    .then(function (response) {
      callback(true, response);
    })
    .catch(function (error) {
      // handle error
      callback(false, error);
    });
};
