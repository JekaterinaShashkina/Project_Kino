const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    categoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    catname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "category_catname_key"
    }
  }, {
    sequelize,
    tableName: 'category',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "category_catname_key",
        unique: true,
        fields: [
          { name: "catname" },
        ]
      },
      {
        name: "category_pkey",
        unique: true,
        fields: [
          { name: "categoryid" },
        ]
      },
    ]
  });
};
