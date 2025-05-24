const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie', {
    movieid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    releasedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    movielanguage: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "English"
    },
    categorynames: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movie',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "movie_pkey",
        unique: true,
        fields: [
          { name: "movieid" },
        ]
      },
    ]
  });
};
