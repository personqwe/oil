const Brand = require("../models/brand");
const Station = require("../models/station");
const User = require("../models/user");

exports.CheapestStation = async (req, res, next) => {
  try {
    const stations = await Station.findAll({
      attributes: ['id', 'name', 'address', 'premium_gasoline_price', 'gasoline_price', 'diesel_price', 'kerosene_price'],
      include: [{
        model: Brand,
        as: 'Brand',
        attributes: ['img']
      }],
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

exports.MarkerStation = async (req, res, next) => {
  try {
    const markers = await Station.findAll({
      attributes: ['id', 'name', 'region', 'brand', 'address', 'premium_gasoline_price', 'gasoline_price', 'diesel_price', 'kerosene_price','x_coordinate', 'y_coordinate'],
      include: [{
        model: Brand,
        as: 'Brand',
        attributes: ['marker_img']
      }],
    });
    res.json(markers);
  } catch (error) {
    console.error("Error fetching marker station:", error);
    next(error);
  }
}
