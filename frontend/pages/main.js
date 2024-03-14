import MainComponent from '../components/main';
import axios from 'axios';

export default function Home({ user, stations }) {
  return (
    <div>
      <MainComponent user={user} stations={stations} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  let user = null;
  let stations = [];

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

  } catch (error) {
    console.error('Error fetching data:', error);
  }

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { user, stations } };
}