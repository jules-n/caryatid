import './style.css';
import { useNavigate} from "react-router-dom";
import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpService } from '../../services/HttpService';

const Application = ({ iniId, invitationId, member }) => {

    const navigate = useNavigate();

    const setDecision = async (decision) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post(`/initiatives/${iniId}/applications/${invitationId}?decision=${decision}`).then(response => {
            if (response.status === 204) {
                toast.dark("Дякую за ваше рішення", {position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Помилочка. Певно, знов ретроградний меркурій", {position: toast.POSITION.TOP_RIGHT});
            }
        }).catch(error => {
            console.log(error)
            toast.error("Помилочка. Певно, знов ретроградний меркурій", {position: toast.POSITION.TOP_RIGHT});
        });
    }

    return (
        <div className="users-applications">
            <span onClick={() => navigate(`/user/${member.email}`)}>{member.name + " " + member.fatherName + " " + member.surname}</span>
            <button  className="users-applications-accept-button" onClick={() => setDecision(true)}>ACCEPT</button>
            <button className="users-applications-decline-button" onClick={() => setDecision(false)}>DECLINE</button>
            <ToastContainer />
        </div>
    );
}

export default Application;

