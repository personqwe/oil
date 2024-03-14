const Sequelize = require('sequelize');

module.exports = class Region extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          region: {
            type: Sequelize.STRING(10),
            allowNull: false,
          }
        }, {
          sequelize,
          timestamps: false,
          underscored: false,
          modelName: 'Region',
          tableName: 'region',
          paranoid: true,
          charset: 'utf8',
          collate: 'utf8_general_ci',
        });
      }
};