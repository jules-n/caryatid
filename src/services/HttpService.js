import axios from 'axios';

const HttpService = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Функція для встановлення токену
HttpService.setJwt = function(jwt) {
  this.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
};

export { HttpService };