import React, { useRef } from 'react';
import './style.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpService } from '../../../services/HttpService';

function Diploma({ fullName, diplomaSeries, diplomaNumber, id, type }) {
    const universityRef = useRef(null);
    const degreeRef = useRef(null);
    const specialtyRef = useRef(null);

    const handleSave = () => {
        if (universityRef.current.value === "" ||
        degreeRef.current.value === "" ||
        specialtyRef.current.value === "") {
            toast.error("Введіть дані", {position: toast.POSITION.TOP_RIGHT});
        }
        const dataToSend = {
            id: id,
            type: type,
            university: universityRef.current.value,
            degree: degreeRef.current.value,
            major: specialtyRef.current.value,
        };

        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post('/educations/approve/diploma', dataToSend).then(response => {
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
        <div className="diploma-to-approve-managment-wrap">
            <div>
                <span>ПІБ: </span>
                <span>{fullName}</span>
            </div>

            <div>
                <span>СЕРІЯ ДИПЛОМУ: </span>
                <span>{diplomaSeries}</span>
            </div>

            <div>
                <span>НОМЕР ДИПЛОМУ: </span>
                <span>{diplomaNumber}</span>
            </div>

            <div className="to-approve-managment-wrap-input">
                <label htmlFor="uni">УНІВЕРСИТЕТ:</label>
                <input type="text" id="uni" ref={universityRef} className="to-approve-managment-input" />
            </div>

            <div className="to-approve-managment-wrap-input">
                <label htmlFor="major">СТУПІНЬ:</label>
                <input type="text" id="major" ref={degreeRef} className="to-approve-managment-input" />
            </div>

            <div className="to-approve-managment-wrap-input">
                <label htmlFor="spec">СПЕЦІАЛЬНІСТЬ:</label>
                <input type="text" id="spec" ref={specialtyRef} className="to-approve-managment-input" />
            </div>

            <div className="save-delete-buttons-wrap">
                <button className="save-button-to-approve-managment-wrap" onClick={handleSave}>ЗБЕРЕГТИ</button>
                <button className="delete-button-to-approve-managment-wrap" onClick={handleDelete}>ВИДАЛИТИ</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Diploma;