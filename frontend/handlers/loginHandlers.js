export const handleKakaoLogin = () => {
    window.location.href = `http://gr5home.iptime.org:300/auth/kakao`;
};

export const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://gr5home.iptime.org:300/auth/check', { 
        credentials: 'include' // 쿠키 정보 포함
      });
      const data = await response.json();
      return data.isLoggedIn;
    } catch (error) {
      console.error('Failed to check login status', error);
      return false;
    }
  }