import React from 'react';
import './style.css';
import { HttpService } from '../../services/HttpService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Invitation ({invitation}) {

    const setDecision = async (decision) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post(`/initiatives/invitations/${invitation.id}?decision=${decision}`).then(response => {
            if (response.status === 204) {
                toast.dark("Дякую за ваше рішення", {position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Помилочка. Певно, знов ретроградний меркурій :(", {position: toast.POSITION.TOP_RIGHT});
            }
        }).catch(error => {
            console.log(error)
            toast.error("Помилочка. Певно, знов ретроградний меркурій :(", {position: toast.POSITION.TOP_RIGHT});
        });
    }

    return (
        <div class="invitations-item">
                <span>{invitation.initiativeName}</span>
                <button class="inv-accept-button" onClick={() => setDecision(true)}>Я В СПРАВІ</button>
                <button class="inv-decline-button" onClick={() => setDecision(false)}>ТА НУ НЄ</button>
                <ToastContainer />
        </div>
    );
}

export default Invitation;
