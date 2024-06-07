const { Station, Brand } = require('../models');
const { Op } = require("sequelize");

exports.SearchResult = async (req, res, next) => {
  try {
    const { query } = req.query;
    console.log('Received query:', query);
    const stations = await Station.findAll({
      where: {
        address: {
          [Op.like]: `%${query}%`
        }
      },
      attributes: ['id', 'name', 'address', 'premium_gasoline_price', 'gasoline_price', 'diesel_price', 'kerosene_price'],
      include: [{
        model: Brand,
        as: 'Brand',
        attributes: ['img']
      }],
      order: [
        ['gasoline_price', 'ASC']
      ],
      limit: 15
    });

    // 결과 반환
    res.json(stations);
  } catch (error) {
    console.error("Error fetching cheapest stations:", error);
    next(error);
  }
};
