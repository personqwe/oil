import MainComponent from '../components/main';

export default function Home() {
  return (
    <div>
      <MainComponent />
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;

  const res = await fetch('http://gr5home.iptime.org:300/auth/api/user', {
    headers: {
      cookie: cookie || '' // 쿠키가 있으면 헤더에 포함
    }
  });

  const data = await res.json();

  // 로그인하지 않은 경우 리디렉션
  if (!data.user) {
    return {
      redirect: {
        destination: '/', // 리디렉션할 경로
        permanent: false, // 영구적인 리디렉션은 아님
      },
    };
  }

  // 로그인한 사용자에게 필요한 데이터를 전달
  return { props: { user: data.user } };
}