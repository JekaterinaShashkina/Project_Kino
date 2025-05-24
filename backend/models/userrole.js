const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userrole', {
    userroleid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'useraccount',
        key: 'userid'
      }
    },
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'roleid'
      }
    }
  }, {
    sequelize,
    tableName: 'userrole',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "userrole_pkey",
        unique: true,
        fields: [
          { name: "userroleid" },
        ]
      },
    ]
  });
};
