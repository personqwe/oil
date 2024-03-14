import axios from 'axios';

export const handleKakaoLogin = () => {
    window.location.href = `http://gr5home.iptime.org:300/auth/kakao`;
};

export const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://gr5home.iptime.org:300/auth/api/check', { 
        credentials: 'include' // 쿠키 정보 포함
      });
      const data = await response.json();
      return data.isLoggedIn;
    } catch (error) {
      console.error('Failed to check login status', error);
      return false;
    }
  }

  export const loginSubmit = async (e, { email, password }) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://gr5home.iptime.org:300/auth/api/login', {
          email,
          password,
        });
    
        if (response.status === 200) {
            window.location.href = `http://gr5home.iptime.org:300/main`
          return alert('Successfully login!');
        } else {
          return alert('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
      }
}