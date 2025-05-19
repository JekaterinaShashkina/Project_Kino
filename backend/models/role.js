const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    roleid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rolename: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'role',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "role_pkey",
        unique: true,
        fields: [
          { name: "roleid" },
        ]
      },
    ]
  });
};
