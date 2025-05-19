const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('session', {
    sessionid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    starttime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hallid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hall',
        key: 'hallid'
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
    tableName: 'session',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "session_pkey",
        unique: true,
        fields: [
          { name: "sessionid" },
        ]
      },
    ]
  });
};
