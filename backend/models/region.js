const Sequelize = require('sequelize');

module.exports = class Region extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
          region: {
            type: Sequelize.STRING(10),
            primaryKey: true,
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