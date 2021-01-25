
exports.seed = function(knex) {
  return knex('foods').truncate()
    .then(function () {
      return knex('foods').insert([
        {food_name: 'rice'},
        {food_name: 'beef'},
        {food_name: 'avocado'}
      ]);
    });
};
