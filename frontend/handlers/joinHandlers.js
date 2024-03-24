import axios from 'axios';

export const joinSubmit = async (e, { nick, email, password, confirmPassword }) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    console.log("Form Data:", e);
    alert('Password is not the same.');
    return;
  }
  
  try {
    console.log(nick, email, password, confirmPassword);
    const response = await axios.post('https://gr5home.iptime.org:8443/auth/api/join', {
      nick,
      email,
      password,
    });

    if (response.status === 201) {
        window.location.href = `https://gr5home.iptime.org:8443/`
      return alert('Successfully signed up!');
    } else {
      return alert('Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Signup failed');
  }
};