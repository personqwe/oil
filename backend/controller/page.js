const Station = require("../models/station");

exports.cheapestStation = async (req, res, next) => {
  try {
    const stations = await Station.findAll({
      attributes: ['name', 'address', 'premium_gasoline_price', 'gasoline_price', 'diesel_price', 'kerosene_price'],
      order: [
        ['gasoline_price', 'ASC']
      ],
      limit: 5
    });

    // 결과 반환
    res.json(stations);
  } catch (error) {
    console.error("Error fetching cheapest stations:", error);
    next(error);
  }
};