import React from 'react';

import RestaurantRow from '../Components/RestaurantRow';

export default function DetailsScreen(props) {
  return (
    <RestaurantRow
      details
      navigation={props.navigation}
      Restaurant={props.route.params}
    />
  );
}
