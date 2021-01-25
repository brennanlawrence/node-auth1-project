const db = require("../../data/dbConfig");

module.exports = {
  findBy,
  insert,
};

function findBy(user_name) {
  let query = db("users");

  if (!user_name) {
    return query;
  } else {
    /*
    SELECT * FROM users
    WHERE user_name = "saorse";
    */

    return query.where("user_name", user_name);
  }
  
}

function insert(credentials) {
  //INSERT INTO users (user_name, password)
  //VALUES ("siobhán", "ofk3j3094");

  let query = db("users");

  return query.insert({
    user_name: credentials.user_name,
    password: credentials.password,
  });
}
