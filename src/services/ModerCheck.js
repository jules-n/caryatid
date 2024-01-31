import React, { useState, useEffect } from 'react';
import {HttpService} from './HttpService';
import Verum from '../img/kavyarnya-prykoliv.gif';

const ModerCheck = ({ ComponentToDisplay }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsAdmin(false);
      try {
        const jwtToken = sessionStorage.getItem('token');
        if (jwtToken !== null || jwtToken !== undefined) {
          HttpService.setJwt(jwtToken);
          const response = await HttpService.get('/users/role');
          if (response.data === "MODERATOR") {
            setIsAdmin(true);
          }   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  });

  if (isLoading) {
    return <div><img src={Verum} alt="Loading" /></div>;
  }

  return isAdmin ? <ComponentToDisplay /> : null;
};

export default ModerCheck;
