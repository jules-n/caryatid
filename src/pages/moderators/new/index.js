import React, {useRef} from 'react';
import './style.css'; 
import Logo from '../img/logo.svg';
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService';
import { ToastContainer, toast } from "react-toastify";
import { HttpService } from '../../../services/HttpService';

const ModeratorPanel = () => {
    const newmodermail = useRef();
    const navigate = useNavigate();
    const openApproves = () => {
        navigate('/approves');
    };
    const openProfile = () => {
        navigate('/profile');
    };
    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }

    const addNewModerator = async () => {
        if (
            newmodermail.current.value === "") {
            toast.error("Ви забули ввести е-mail", {position: toast.POSITION.TOP_RIGHT,})
        }
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);

        HttpService.post('/moderator/addModerator', newmodermail.current.value).then(response => {
            toast.dark("Не забудьте привітати нового модератора в нашій дурці ♥", {position: toast.POSITION.TOP_RIGHT,})          
        })
        .catch(error => {
            toast.error('Error fetching data:' + error, {position: toast.POSITION.TOP_RIGHT,});
        });

    }

    return (
        <div className="container-moder">
            <div className="for-logo">
                <img src={Logo} alt="Logo"/>
            </div> 
            <div className="moder-email-group">
                <label htmlFor="moderemail">EMAIL МАЙБУТНЬОГО МОДЕРАТОРА</label>
                <input type="text" id="moderemail" ref={newmodermail}/>
            </div>
            <div className="wrap-menu-submit">
            <ToastContainer />
                <button id="emailModerButton" onClick={addNewModerator}></button>
                <div className="moder-menu">
                    <button onClick={openProfile}>MY PROFILE</button>
                    <button onClick={openApproves}>APPROVES</button>
                    <button onClick={logout}>LOG OUT</button>
                </div>
            </div>
        </div>
    );
};

export default ModeratorPanel;