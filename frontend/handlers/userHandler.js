import axios from 'axios';

export const FavoriteStation = (stationId) => {
    axios.post('https://gr5home.iptime.org:8443/user/api/favorite', { stationId }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    .then(response => {
      console.log('Success:', response.data);
      // 성공적으로 추가되었을 때의 처리
    })
    .catch(error => {
      console.error('Error:', error);
      // 에러 처리
    });
  }