const removeFavorite = require('./removeFavorite');

test('Retirer un restaurant de la liste des favoris', () => {
  expect(
    removeFavorite(
      [
        {id: 'ABC1', name: 'restaurantA', description: 'descriptionA'},
        {id: 'ABC2', name: 'restaurantB', description: 'descriptionB'},
        {id: 'ABC3', name: 'restaurantC', description: 'descriptionC'},
      ],
      {id: 'ABC3', name: 'restaurantC', description: 'descriptionC'},
    ),
  ).toStrictEqual([
    {id: 'ABC1', name: 'restaurantA', description: 'descriptionA'},
    {id: 'ABC2', name: 'restaurantB', description: 'descriptionB'},
  ]);
});
