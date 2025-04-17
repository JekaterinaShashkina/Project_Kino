const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket', {
    ticketid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'useraccount',
        key: 'userid'
      }
    },
    purchasetime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ticket',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "ticket_pkey",
        unique: true,
        fields: [
          { name: "ticketid" },
        ]
      },
    ]
  });
};
