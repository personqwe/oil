const Sequelize = require('sequelize');

module.exports = class Station extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        code: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
          },
          name: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          address: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          premium_gasoline_price: {
            type: Sequelize.STRING(5),
            allowNull: false,
          },
          gasoline_price: {
            type: Sequelize.STRING(5),
            allowNull: false,
          },
          diesel_price: {
            type: Sequelize.STRING(5),
            allowNull: false,
          },
          kerosene_price: {
            type: Sequelize.STRING(5),
            allowNull: false,
          },
        }, {
          sequelize,
          timestamps: false,
          underscored: false,
          modelName: 'Station',
          tableName: 'station',
          paranoid: true,
          charset: 'utf8',
          collate: 'utf8_general_ci',
        });
      }

    static associate(models) {
        this.belongsTo(models.Region, { 
          foreignKey: 'region_id',
          allowNull: false, 
          targetKey: 'id',
          as: 'Region' 
        });
      }
  };
    