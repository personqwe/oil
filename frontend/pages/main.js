import MainComponent from '../components/main';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home({ user, stations, markers, favorites}) {
  // 컴포넌트가 마운트될 때 로컬 스토리지에 user 데이터 저장
  useEffect(() => {
    // 서버 사이드에서 받아온 user 데이터가 있다면 로컬 스토리지에 저장
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]); // user 데이터가 변경될 때마다 실행

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
      axios.get('http://gr5home.iptime.org:300/page/api/favorite', { headers: { Cookie: cookie || '' }}),
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