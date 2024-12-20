import jwtDecode from 'jwt-decode';

export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getTokenData = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};