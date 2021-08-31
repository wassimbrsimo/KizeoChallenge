const addFavorite = require('./addFavorite');

test('Ajouter un restaurant a la liste des favoris', () => {
  expect(addFavorite(['restoA', 'restoB'], 'restoC')).toStrictEqual([
    'restoA',
    'restoB',
    'restoC',
  ]);
});
