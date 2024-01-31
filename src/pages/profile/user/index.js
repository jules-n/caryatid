import React, { useEffect, useState } from "react";
import Verum from '../../../img/kavyarnya-prykoliv.gif';
import { HttpService} from '../../../services/HttpService';
import ModerProfile from '../moder/index';
import UserProfile from "./user";

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwtToken = sessionStorage.getItem('token');
    HttpService.setJwt(jwtToken);
    HttpService.get('/users')
          .then(response => {
            setUser(response.data); // Зберігаємо отримані дані у стані
          })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

  }, []);

    return (
      user === null ? (
        <img src={Verum} alt="Loading" id="loading" style={{width : '30%', marginLeft : '35%', marginTop : '5%', height: '20%'}}/>
      ) : (
        user.role === "MODERATOR" ? (
          <ModerProfile
          email= {user.email}
          name={user.name}
          surname={user.surname}
          photolink={user.photoLink}
        />
        ) : (
          <UserProfile user={user}/>
        )
      )
    );
};

export default Profile;