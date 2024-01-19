import MainComponent from '../components/main';
import axios from 'axios';

export default function Home() {
  return (
    <div>
      <MainComponent />
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;

  try {
    const response = await axios.get('http://gr5home.iptime.org:300/auth/api/user', {
      headers: {
        Cookie: cookie || '',
      },
    });

    const data = response.data;

    // 로그인하지 않은 경우 리디렉션
    if (!data.user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return { props: { user: data.user } };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}