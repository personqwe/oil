const Sequelize = require('sequelize');

module.exports = class Brand extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
          brand: {
            type: Sequelize.STRING(10),
            primaryKey: true,
          },
          img: {
            type: Sequelize.STRING(200),
            defaultValue: '/station.png',
          },
          marker_img: {
            type: Sequelize.STRING(200),
            defaultValue: '/station.png',
          }
        }, {
          sequelize,
          timestamps: false,
          underscored: false,
          modelName: 'Brand',
          tableName: 'brand',
          paranoid: true,
          charset: 'utf8',
          collate: 'utf8_general_ci',
        });
      }
};