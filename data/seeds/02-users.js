exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {user_name: 'dave', password: "lkgjoiwhee"},
        {user_name: 'tim', password: "lkadjfoeq3"},
        {user_name: 'sally', password: "982hkjnf03;d"}
      ]);
    });
};

