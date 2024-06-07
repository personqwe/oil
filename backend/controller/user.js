const User = require("../models/user");
const Station = require("../models/station"); // Station 모델도 필요합니다.

exports.AddFavorite = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const stationId = parseInt(req.body.stationId, 10); // POST 요청 본문에서 stationId 읽기

    // stationId가 유효한 숫자인지 검증
    if (isNaN(stationId)) {
      return res.status(400).send('Invalid station ID');
    }

    // 주유소가 존재하는지 확인
    const station = await Station.findOne({ where: { id: stationId } });
    if (!station) {
      return res.status(404).send('Station not found');
    }

    if (user) {
      await user.addFavoriteStation(station);
      res.send('success');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.RemoveFavorite = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const stationId = parseInt(req.body.stationId, 10); // POST 요청 본문에서 stationId 읽기
    // stationId가 유효한 숫자인지 검증
    if (isNaN(stationId)) {
      return res.status(400).send('Invalid station ID');
    }

    // 주유소가 존재하는지 확인
    const station = await Station.findOne({ where: { id: stationId } });
    if (!station) {
      return res.status(404).send('Station not found');
    }

    if (user) {
      await user.removeFavoriteStation(station);
      res.send('success');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.UserFavorite = async (req, res, next) => {
  try {
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

exports.UpdateNick = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      const newNick = req.body.newNick;
      if (!newNick) {
        return res.status(400).send('닉네임이 입력되지 않았습니다.');
      }
      user.nick = newNick;
      await user.save();
      res.send('success');
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
