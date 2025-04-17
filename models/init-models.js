var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _categorymovie = require("./categorymovie");
var _hall = require("./hall");
var _movie = require("./movie");
var _place = require("./place");
var _price = require("./price");
var _report = require("./report");
var _role = require("./role");
var _session = require("./session");
var _ticket = require("./ticket");
var _useraccount = require("./useraccount");
var _userrole = require("./userrole");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var categorymovie = _categorymovie(sequelize, DataTypes);
  var hall = _hall(sequelize, DataTypes);
  var movie = _movie(sequelize, DataTypes);
  var place = _place(sequelize, DataTypes);
  var price = _price(sequelize, DataTypes);
  var report = _report(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var useraccount = _useraccount(sequelize, DataTypes);
  var userrole = _userrole(sequelize, DataTypes);

  categorymovie.belongsTo(category, { as: "category", foreignKey: "categoryid"});
  category.hasMany(categorymovie, { as: "categorymovies", foreignKey: "categoryid"});
  place.belongsTo(hall, { as: "hall", foreignKey: "hallid"});
  hall.hasMany(place, { as: "places", foreignKey: "hallid"});
  session.belongsTo(hall, { as: "hall", foreignKey: "hallid"});
  hall.hasMany(session, { as: "sessions", foreignKey: "hallid"});
  categorymovie.belongsTo(movie, { as: "movie", foreignKey: "movieid"});
  movie.hasMany(categorymovie, { as: "categorymovies", foreignKey: "movieid"});
  session.belongsTo(movie, { as: "movie", foreignKey: "movieid"});
  movie.hasMany(session, { as: "sessions", foreignKey: "movieid"});
  price.belongsTo(place, { as: "place", foreignKey: "placeid"});
  place.hasMany(price, { as: "prices", foreignKey: "placeid"});
  ticket.belongsTo(place, { as: "place", foreignKey: "placeid"});
  place.hasMany(ticket, { as: "tickets", foreignKey: "placeid"});
  userrole.belongsTo(role, { as: "role", foreignKey: "roleid"});
  role.hasMany(userrole, { as: "userroles", foreignKey: "roleid"});
  price.belongsTo(session, { as: "session", foreignKey: "sessionid"});
  session.hasMany(price, { as: "prices", foreignKey: "sessionid"});
  ticket.belongsTo(session, { as: "session", foreignKey: "sessionid"});
  session.hasMany(ticket, { as: "tickets", foreignKey: "sessionid"});
  ticket.belongsTo(useraccount, { as: "user", foreignKey: "userid"});
  useraccount.hasMany(ticket, { as: "tickets", foreignKey: "userid"});
  userrole.belongsTo(useraccount, { as: "user", foreignKey: "userid"});
  useraccount.hasMany(userrole, { as: "userroles", foreignKey: "userid"});

  return {
    category,
    categorymovie,
    hall,
    movie,
    place,
    price,
    report,
    role,
    session,
    ticket,
    useraccount,
    userrole,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
