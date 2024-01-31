import React, { useEffect, useState } from "react";
import './style.css';
import Photo from '../img/default_photo.png';
import Logo from '../img/logo.svg';
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService';
import { HttpService } from '../../../services/HttpService';

const ModerProfile = ({ email, name, surname, photolink }) => {
    const [imageUrl, setImageUrl] = useState(Photo);
    
    useEffect(() => {
      if (photolink === null || photolink === undefined) {
        setImageUrl(Photo)
      } else {
        setImageUrl(photolink)
      }
    }, []);

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) {
          return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
          const jwtToken = sessionStorage.getItem('token');
          HttpService.setJwt(jwtToken);
          const response = await HttpService.post('users/uploadPhoto', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          setImageUrl(response.data); // Припускаємо, що бекенд повертає URL у відповіді
      } catch (error) {
          console.error('Помилка при завантаженні зображення:', error);
      }
  };

    const navigate = useNavigate();
    const openApproves = () => {
        navigate('/approves');
    };
    const openModers = () => {
        navigate('/moderators');
    };
    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }

  return (
    <div className="profile-user">
      <div className="profile-menu">
        <div className="profile-menu-buttons-wrapper">
          <img src={Logo} className="logo" alt="Logo" />
          <div className="profile-menu-buttons">
            <button onClick={openModers}>MODERATORS</button>
            <button onClick={openApproves}>APPROVES</button>
            <button onClick={logout}>LOG OUT</button>
          </div>
        </div>
        <img 
        src={imageUrl} 
        onClick={() => document.getElementById('imageInput').click()}
        className="profile-photo" alt="Profile" />
         <input 
                type="file" 
                id="imageInput" 
                hidden 
                onChange={handleImageUpload}
                accept="image/*" 
          />
      </div>
      <div className="profile-user-content">
        <div className="non-editable-profile-data">
          <div className="name-surname">
            {name}
            <br />
            {surname}
          </div>
          <div>
            e-mail: {email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModerProfile;
