import axios from 'axios';

export const fetchSearchResults = (query) => {
  return axios.get('https://gr5home.iptime.org:8443/search/api/searchresult', {
    params: { query },
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
};