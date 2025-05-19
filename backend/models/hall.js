const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hall', {
    hallid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hallname: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'hall',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "hall_pkey",
        unique: true,
        fields: [
          { name: "hallid" },
        ]
      },
    ]
  });
};
