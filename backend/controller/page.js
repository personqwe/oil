const Brand = require("../models/brand");
const Station = require("../models/station");
const User = require("../models/user");

exports.cheapestStation = async (req, res, next) => {
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

exports.markerStation = async (req, res, next) => {
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

exports.userFavorite = async (req, res, next) => {
  try {
    console.log("관심 들어옴!");
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      const favoriteStations = await user.getFavoriteStations();
      res.json(favoriteStations);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};