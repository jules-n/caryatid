import React from 'react';
import './style.css';
import { HttpService} from '../../../services/HttpService';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StartupItem = ({ id, title, description, isMy }) => {
    const navigate = useNavigate();
    const goTo = () => {
        navigate(`/initiative/${id}`);
    };

    const applyTo = async () => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post(`/initiatives/${id}/apply/`).then(response => {
            if (response.status === 204) {
              toast.dark("Ваша заявка надіслана", {position: toast.POSITION.TOP_RIGHT});
            } else {
              toast.error("Шось пішло не так", {position: toast.POSITION.TOP_RIGHT});
            }         
          })
          .catch(error => {
              toast.error('Error fetching data:' + error, {position: toast.POSITION.TOP_RIGHT,});
          });
    };

    return (
        <div className="ini-item">
            {isMy?<p onClick={goTo} style={{cursor: 'pointer', textDecorationLine: 'underline'}}>{title}</p>:<p>{title}</p>}
            <span>{description}</span>
            {!isMy?<button  className="ini-item-apply" onClick={applyTo}>ПОДАТИСЬ</button>:null}
            <ToastContainer />
        </div>
    );
};

export default StartupItem;