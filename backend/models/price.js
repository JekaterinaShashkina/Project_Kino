const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('price', {
    priceid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    sessionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'session',
        key: 'sessionid'
      }
    },
    placeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'place',
        key: 'placeid'
      }
    }
  }, {
    sequelize,
    tableName: 'price',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "price_pkey",
        unique: true,
        fields: [
          { name: "priceid" },
        ]
      },
    ]
  });
};
