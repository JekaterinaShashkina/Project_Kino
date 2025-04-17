const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('useraccount', {
    userid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    useremail: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    createdat: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'useraccount',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "useraccount_pkey",
        unique: true,
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
