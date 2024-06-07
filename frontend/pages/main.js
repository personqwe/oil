import MainComponent from '../components/Main';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home({ user, stations, markers, favorites}) {
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (stations) {
      localStorage.setItem('stations', JSON.stringify(stations));
    }
  }, [user, stations]);

  return (
    <div>
      <MainComponent user={user} stations={stations} markers={markers} favorites={favorites}/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  let user = null;
  let stations = [];
  let markers = [];
  let favorites = [];
  try {
    const [userResponse, stationsResponse, markerResponse, favoritesResponse] = await Promise.all([
      axios.get('http://gr5home.iptime.org:300/auth/api/user', { headers: { Cookie: cookie || '' } }),
      axios.get('http://gr5home.iptime.org:300/page/api/cheapest', { headers: { Cookie: cookie || '' } }),
      axios.get('http://gr5home.iptime.org:300/page/api/marker', { headers: { Cookie: cookie || '' } }),
      axios.get('http://gr5home.iptime.org:300/user/api/favorite', { headers: { Cookie: cookie || '' }}),
    ]);
  
    user = userResponse.data.user;
    stations = stationsResponse.data;
    markers = markerResponse.data;
    favorites = favoritesResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return { props: { user, stations, markers, favorites} };
}
