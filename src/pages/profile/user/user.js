import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import Logo from '../img/logo.svg';
import DefaultPhoto from '../img/default_photo.png';
import LinkedinLogo from '../img/linkedin.png';
import { HttpService } from '../../../services/HttpService';
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService';
import { ToastContainer, toast } from "react-toastify";

const UserProfile = ({ user }) => {

  const [imageUrl, setImageUrl] = useState(DefaultPhoto);
  const [about, setAbout] = useState("");
  const [tg, setTg] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [position, setPosition] = useState("");
  const aboutRef = useRef();
  const positionRef = useRef();
  const tgRef = useRef();
  const linkedinRef = useRef();

  const navigate = useNavigate();
    const openInitiatives = () => {
        navigate('/initiatives');
    };
    const openUsers = () => {
        navigate('/users');
    };
    const openInvitations = () => {
      navigate('/invitations');
    };
    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }

    const update = async () => {

      const jwtToken = sessionStorage.getItem('token');
      HttpService.setJwt(jwtToken);
      const socialData = {
        about: aboutRef.current.value,
        position: positionRef.current.value,
        contacts: {
            "tg": tgRef.current.value,
            "linkedin": linkedinRef.current.value
          }
      }

      HttpService.put('/users', socialData).then(response => {
        if (response.status === 204) {
          toast.dark("Дані збережено", {position: toast.POSITION.TOP_RIGHT});
        } else {
          toast.error("Помилка при збереженні", {position: toast.POSITION.TOP_RIGHT});
        }         
      })
      .catch(error => {
          toast.error('Error fetching data:' + error, {position: toast.POSITION.TOP_RIGHT,});
      });

  }

  useEffect(() => {
    if (user.photoLink === null || user.photoLink === undefined) {
      setImageUrl(DefaultPhoto)
    } else {
      setImageUrl(user.photoLink)
    }

    if (user.about !== null) {
      setAbout(user.about);
    }

    if (user.position !== null) {
      setPosition(user.position);
    }

    if (user.contacts !== null) {
      if (user.contacts.tg !== null) {
        setTg(user.contacts.tg);
      }
      if (user.contacts.linkedin !== null) {
        setLinkedin(user.contacts.linkedin)
      }
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
        setImageUrl(response.data);
    } catch (error) {
        console.error('Помилка при завантаженні зображення:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.post('users/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === '204') {
          toast.dark('Файл завантажено')
        }
    } catch (error) {
        console.error('Помилка при завантаженні зображення:', error);
    }
  };

  
  return (
    <div className="profile-user">
    <div className="profile-menu">
        <div className="profile-menu-buttons-wrapper">
            <img src={Logo} className="logo"/>
            <div className="profile-menu-buttons">
                <button onClick={openUsers}>OTHER USERS</button>
                <button onClick={openInitiatives}>INITIATIVES</button>
                <button onClick={openInvitations}>INVITATIONS</button>
                <button onClick={logout}>LOG OUT</button>
            </div>
        </div>
        <img 
        src={imageUrl} 
        onClick={() => document.getElementById('imageInput').click()}
        className="profile-photo"/>
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
                {user.name}
                <br/>
                {user.surname}
            </div>
            <div>
                {user.educations.map(item => {
                  if (item.type === 'CERTIFICATE') {
                    return (<p>{item.result}</p>)
                  }
                  if (item.type === 'DIPLOMA') {
                    return (<p>{item.university}<br/>ступінь вищої освіти {item.degree} спеціальність {item.major}</p>)
                  }
                  if (item.type === 'STUDENT_TICKET') {
                    return (<p>{item.university}</p>)
                  }
                })}
            </div>
            <div>
                e-mail: {user.email}
            </div>
        </div>
        <div className="editable-profile-data">
            <div className="wrap-profile-data">
                <label for="about-me">ПРО СЕБЕ:</label>
                <input type="text" id="about-me" defaultValue={about} ref={aboutRef}/>
            </div>
            <div className="wrap-profile-data">
                <label for="pref-position">БАЖАНА ПОЗИЦІЯ:</label>
                <input type="text" id="pref-position" defaultValue={position} ref={positionRef}/>
            </div>
            <div className="wrap-profile-contact">
                <label for="prof-tg">tg:</label>
                <input type="text" id="prof-tg" defaultValue={tg} ref={tgRef}/>
            </div>
            <div className="wrap-profile-contact">
                <img src={LinkedinLogo} id="prof-linkedin" />
                <input type="text" id="prof-in" defaultValue={linkedin} ref={linkedinRef}/>
            </div>
        </div>
        <div className="wrap-upload-file">
            <div>ЗАВАНТАЖТЕ ФАЙЛ КЛЮЧОВИХ МОМЕНТІВ ВАШИХ НАУКОВИХ РОБІТ\ВАШЕ cv</div>
            <button id="upload-file" type='file' onClick={() => document.getElementById('fileInput').click()}>UPLOAD FILE</button>
            <input 
                type="file" 
                id="fileInput" 
                hidden 
                onChange={handleFileUpload}
                accept=".doc,.docx,.pdf" 
          />
        </div>
        <button id="profile-save" onClick={update}>SAVE</button>
    </div>
    <ToastContainer />
</div>
  )

}

export default UserProfile;