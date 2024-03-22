import MainComponent from '../components/main';
import axios from 'axios';

export default function Home({ user, stations, markers }) {
  return (
    <div>
      <MainComponent user={user} stations={stations} markers={markers}/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  let user = null;
  let stations = [];
  let markers = [];
  try {
    const userResponse = await axios.get('http://gr5home.iptime.org:300/auth/api/user', {
      headers: {
        Cookie: cookie || '',
      },
    });
    user = userResponse.data.user;

    const stationsResponse = await axios.get('http://gr5home.iptime.org:300/page/api/cheapest', {
      headers: { Cookie: cookie || '' },
    });
    stations = stationsResponse.data;

    const markerResponse = await axios.get('http://gr5home.iptime.org:300/page/api/marker', {
      headers: { Cookie: cookie || '' },
    });
    markers = markerResponse.data;
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

  return { props: { user, stations, markers} };
}