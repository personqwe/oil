import axios from 'axios';

export const handleKakaoLogin = () => {
  window.location.href = `https://gr5home.iptime.org:8443/auth/kakao`;
};

export const checkLoginStatus = async () => {
  try {
    const response = await fetch('https://gr5home.iptime.org:8443/auth/api/check', { 
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
      const response = await axios.post('https://gr5home.iptime.org:8443/auth/api/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
          window.location.href = `https://gr5home.iptime.org:8443/main`
          return alert('Successfully login!');
      } else {
          return alert('Login failed');
      }
  } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
  }
}

export const Logout = async () => {
  console.log('Logout function called');
  try {
    const response = await axios.get('https://gr5home.iptime.org:8443/auth/api/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    console.log('Logout response:', response);
    window.location.href = 'https://gr5home.iptime.org:8443/';
  } catch (error) {
    console.error('Error during logout:', error);
  }
};