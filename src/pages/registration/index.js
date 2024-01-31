import React, { useRef } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import { HttpService} from '../../services/HttpService';
import Logo from './img/logo.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {

    const navigate = useNavigate();

    const name = useRef();
    const surname = useRef();
    const fathername = useRef();
    const diiacode = useRef();

    const seriadiploma = useRef();
    const numberdiploma = useRef();
    const studentticket = useRef();
    const coursecompany = useRef();
    const coursedatatocheck = useRef();

    
    const tryToReg = async () => {
        const dataToSend = {
            name: name.current.value,
            surname: surname.current.value,
            fatherName: fathername.current.value,
            diiaCode: diiacode.current.value
        };
        if (name.current.value === "" || surname.current.value === "" || fathername.current.value === "" || diiacode.current.value === "") {
            toast.dark("Введіть ПІБ і штрих-код Дія", {position: toast.POSITION.TOP_RIGHT,});
            return;
        }
        try {
            const jwtToken = sessionStorage.getItem('token');
            HttpService.setJwt(jwtToken);
            HttpService.post('/users', dataToSend)
                .then(response => {
                    if (response.data === true) {
                        toast.dark("Вітаю з реєстрацією!", {position: toast.POSITION.TOP_RIGHT,});
                        toast.info("Введіть дані освіти або продовжіть", {position: toast.POSITION.TOP_RIGHT,});
                    }  else {
                        toast.error("Ідентифікаційна помилка", {position: toast.POSITION.TOP_RIGHT,});
                    }
            })
            .catch(error => {
                toast.error("Ідентифікаційна помилка", {position: toast.POSITION.TOP_RIGHT,});
                console.error('Error fetching data:', error);
            });
        } catch (error) {
          toast.error("Ідентифікаційна помилка", {position: toast.POSITION.TOP_RIGHT,});
          console.error('Error:', error);
        }
    };

    const sendEducation = async () => {
        const dataToSend = {
            diplomaNumber: numberdiploma.current.value,
            serialCode: seriadiploma.current.value,
            studentTicket: studentticket.current.value,
            certificateCompany: coursecompany.current.value,
            certificateVerifyData: coursedatatocheck.current.value
        };

        if (
            seriadiploma.current.value === "" && 
            numberdiploma.current.value === "" && 
            studentticket.current.value === "" && 
            coursecompany.current.value === "" &&
            coursedatatocheck.current.value === "") {
            navigate('/profile')
        }


        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post('/educations', dataToSend).then(response => {
            navigate('/profile')           
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    }

    return (
        <div className="container-reg">
        <div className="for-logo">
        <img src={Logo}/>
        </div> 
        <div className="main-reg">
            <div className="personal-data-reg">
                <div className="form-group">
                    <label htmlFor="name">*ІМ'Я</label>
                    <input type="text" id="name" ref={name}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname">*ПРІЗВИЩЕ</label>
                    <input type="text" id="surname" ref={surname}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fathername">*ПО БАТЬКОВІ</label>
                    <input type="text" id="fathername" ref={fathername}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="diiacode">*ШТРИХКОД ДІЯ</label>
                    <input type="text" id="diiacod" ref={diiacode}/>
                  </div>
                <button id="check-btn-reg" onClick={tryToReg}>ПEРЕВІРКА</button>
            </div>
            <div className="education-data-reg">
            <div className="diploma-data-reg">
                <div className="form-group-diploma">
                    <label htmlFor="diploma-serial">СЕРІЯ ДИПЛОМУ</label>
                    <input type="text" id="diploma-serial" ref={seriadiploma}/>
                </div>
                <div className="form-group-diploma">
                    <label htmlFor="diploma-number">НОМЕР ДИПЛОМУ</label>
                    <input type="text" id="diploma-number" ref={numberdiploma}/>
                </div>
            </div>
            <div className="form-group-studentticket">
                <label htmlFor="studentticket">НОМЕР СТУДЕНТСЬКОГО</label>
                <input type="text" id="studentticket" ref={studentticket}/>
            </div>
            <div className="form-group-course">
                <label htmlFor="coursecompany">КИМ ВИДАНИЙ СЕРТИФІКАТ ПРО ЗАВЕРШЕННЯ КУРСІВ</label>
                <input type="text" id="coursecompany" ref={coursecompany}/>
            </div>
            <div className="form-group-course">
                <label htmlFor="coursedata">ДАНІ ДЛЯ ПЕРЕВІРКИ СЕРТИФІКАТУ</label>
                <input type="text" id="coursedata" ref={coursedatatocheck}/>
            </div>
            </div>
        </div> 
        <ToastContainer />
        <div className="for-submit-reg">
            <button id="imageButton" onClick={sendEducation}></button>
        </div> 
        </div>
    );
};
 
export default Registration;