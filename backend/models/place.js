const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('place', {
    placeid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rownumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seatnumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hallid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hall',
        key: 'hallid'
      }
    }
  }, {
    sequelize,
    tableName: 'place',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "place_pkey",
        unique: true,
        fields: [
          { name: "placeid" },
        ]
      },
    ]
  });
};
