import React, {useEffect} from "react";
import './style.css';
import Logo from './img/logo.svg';
import GLogo from './img/glogo.svg';
import UserService from '../../services/UserService';
import { useNavigate } from "react-router-dom";
import { HttpService} from '../../services/HttpService';

const Providers = () => {

    const navigate = useNavigate();
    const fetchToken = async () => {
      try {
        const jwtToken = await UserService.getToken();
        sessionStorage.setItem('token', jwtToken);
      } catch (error) {
        console.error('Помилка при отриманні токена:', error);
      }
    };

      const handleLogin = async () => {
          await UserService.login();
          await fetchToken();
          const jwtToken = sessionStorage.getItem('token');
          HttpService.setJwt(jwtToken);
          HttpService.get('/users/isRegistered')
            .then(response => {
              if (response.data) {
                navigate('/profile')
              } else {
                navigate('/register')
              }
            })
          .catch(error => {
            console.error('Error fetching data:', error);
          });  
      };

    return (
            <div className="wrap">
                <div className="div">
                    <img loading="lazy" src={Logo} className="img"/>
                <button className="div-2" onClick={handleLogin}>
                    <img loading="lazy" src={GLogo} className="img-2" />
                    <div className="div-3">USE GOOGLE</div>
                </button>
                <button className="div-5">OTHER PROVIDERS ARE STILL IN DEVELOPMENT</button>
                </div>
                <div className="for-img"></div>
            </div>
    );
};
 
export default Providers;