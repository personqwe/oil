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