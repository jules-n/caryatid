import React, { useRef } from 'react';
import './style.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpService } from '../../services/HttpService';
import DefPhoto from './img/user-photo.png';

function UserWrap({user, iniId}) {

    const invite = async () => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const id = iniId;
        if (id === "") {
            toast.warn('А куди власне запрошувати?');
        } else {
            HttpService.post(`initiatives/${id}/invite/?email=${user.email}`).then(response => {
                if (response.status === 204) {
                    toast.dark('Запрошення надіслано');
                }
            });
        }
    }

    return (
        <div class="users-item-wrap">
            <div class="users-item-bio">
                <img src={user.photoLink === null? DefPhoto : user.photoLink}/>
                <div class="users-item-bio-text-wrap">
                    <span class="users-item-bio-text-wrap-name">{user.name + " " + user.surname}</span>
                    {user.educations.map(item => {
                        if (item.type === 'CERTIFICATE') {
                            return (<span class="users-item-bio-text-wrap-education">{item.result}</span>)
                    }
                    if (item.type === 'DIPLOMA') {
                        return (<span class="users-item-bio-text-wrap-education">ступінь вищої освіти {item.degree} спеціальність {item.major}</span>)
                    }
                    if (item.type === 'STUDENT_TICKET') {
                        return (<span class="users-item-bio-text-wrap-education">{item.university}</span>)
                    }
                    })}
                    <span class="users-item-bio-text-wrap-about">{user.about}</span>
                    <span class="users-item-bio-text-wrap-position">{user.position}</span>
                </div>
            </div>
            <div class="users-item-contact-data-wrap">
                <div class="users-item-contact-data">
                    <span>e-mail: {user.email}</span>
                </div>
                <button class = "users-item-contact-data-wrap-button" onClick={invite}>INVITE</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserWrap;