const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categorymovie', {
    catmovieid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'categoryid'
      }
    },
    movieid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movie',
        key: 'movieid'
      }
    }
  }, {
    sequelize,
    tableName: 'categorymovie',
    schema: 'kino',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "categorymovie_pkey",
        unique: true,
        fields: [
          { name: "catmovieid" },
        ]
      },
    ]
  });
};
