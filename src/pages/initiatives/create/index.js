import React, { useRef } from 'react';
import './style.css';
import Logo from './img/logo.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpService } from '../../../services/HttpService';
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService';

const InitiativeForm = () => {
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const linkRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (nameRef.current.value === "" || descriptionRef.current.value === "" || linkRef.current.value === "") {
            toast.error("Не вистачає даних. Майте бога в серці, введіть їх, будь ласка", {position: toast.POSITION.TOP_RIGHT});
        }
        const dataToSend = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            privateLink: linkRef.current.value,
        };
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post('/initiatives', dataToSend).then(response => {
            if (response.status === 204) {
                toast.dark("Вітаю зі створенням ініціативи", {position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Ой-йой, щось пішло не так" + response.status, {position: toast.POSITION.TOP_RIGHT});
            }      
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const openProfile = () => {
        navigate('/profile');
    };
    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }

    const openInitiatives = () => {
        navigate('/initiatives');
    };
    const openUsers = () => {
        navigate('/users');
    };


    return (
        <div className="container-moder">
            <div className="for-logo">
                <img src={Logo} alt="Logo"/>
                <ToastContainer/>
            </div> 
            <div className="ini-create-group">
                <label htmlFor="ini-name">*НАЗВА</label>
                <input type="text" id="ini-name" ref={nameRef}/>
            </div>
            <div className="ini-create-group">
                <label htmlFor="ini-description">*ОПИС</label>
                <input type="text" id="ini-description" ref={descriptionRef}/>
            </div>
            <div className="ini-create-group">
                <label htmlFor="ini-link">*ПОСИЛАННЯ НА ПРИВАТНИЙ ЧАТ (TG АБОЩО)</label>
                <input type="text" id="ini-link" ref={linkRef}/>
            </div>
            <div className="wrap-menu-ini-create">
                <button id="iniCreateButton" onClick={handleSubmit}>CREATE</button>
                <div className="initiative-create-menu">
                    <button onClick={openInitiatives}>INITIATIVES</button>
                    <button onClick={openProfile}>MY PROFILE</button>
                    <button onClick={openUsers}>USERS</button>
                    <button onClick={logout}>LOG OUT</button>
                </div>
            </div>
        </div>
    );
};

export default InitiativeForm;