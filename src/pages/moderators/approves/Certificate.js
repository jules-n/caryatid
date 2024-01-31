import React, { useRef } from 'react';
import './style.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpService } from '../../../services/HttpService';

function Certificate({ fullName, courseCompany, verificationData, id, type }) {
    const courseRef = useRef(null);

    const handleSave = () => {
        if (courseRef.current.value === "") {
            toast.error("Введіть дані", {position: toast.POSITION.TOP_RIGHT});
        }
        const dataToSend = {
            id: id,
            type: type,
            result: courseRef.current.value,
        };

        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post('/educations/approve/certificate', dataToSend).then(response => {
            if (response.status === 204) {
                toast.dark("Дані збережено", {position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Помилка при збереженні", {position: toast.POSITION.TOP_RIGHT});
            }      
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const handleDelete = () => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.delete(`/educations?id=${id}`).then(response => {
            if (response.status === 204) {
                toast.dark("Дані видалено", {position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Помилка при видаленні", {position: toast.POSITION.TOP_RIGHT});
            }
        }).catch(error => {
            toast.error("Помилка при видаленні", {position: toast.POSITION.TOP_RIGHT});
        });
    };

    return (
        <div className="course-to-approve-managment-wrap">
            <div>
                <span>ПІБ: </span>
                <span>{fullName}</span>
            </div>

            <div>
                <span>КОМПАНІЯ КУРСІВ: </span>
                <span>{courseCompany}</span>
            </div>

            <div>
                <span>ДАНІ ДЛЯ ПЕРЕВІРКИ: </span>
                <span>{verificationData}</span>
            </div>

            <div className="to-approve-managment-wrap-input">
                <label htmlFor="course">СЕРТИФІКАТ:</label>
                <input type="text" id="course" ref={courseRef} className="to-approve-managment-input" />
            </div>

            <div className="save-delete-buttons-wrap">
                <button className="save-button-to-approve-managment-wrap" onClick={handleSave}>ЗБЕРЕГТИ</button>
                <button className="delete-button-to-approve-managment-wrap" onClick={handleDelete}>ВИДАЛИТИ</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Certificate;