import axios from 'axios';

export const AddFavoriteStation = (stationId) => {
  return axios.post('https://gr5home.iptime.org:8443/user/api/addfavorite', { stationId }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
};

export const RemoveFavoriteStation = (stationId) => {
  return axios.post('https://gr5home.iptime.org:8443/user/api/removefavorite', { stationId }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
};

export const FavoriteStation = async () => {
  return axios.get('https://gr5home.iptime.org:8443/user/api/favorite', {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
};

export const updateNick = (newNick) => { // Nick에서 newNick으로 변경
  return axios.post('https://gr5home.iptime.org:8443/user/api/updateNick', { newNick }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
};