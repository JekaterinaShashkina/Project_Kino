const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report', {
    reportid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reportdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ticketcount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    revenue: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'report',
    schema: 'kino',
    timestamps: false,
    indexes: [
      {
        name: "report_pkey",
        unique: true,
        fields: [
          { name: "reportid" },
        ]
      },
    ]
  });
};
