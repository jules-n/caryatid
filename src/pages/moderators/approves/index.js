import React, {useEffect, useState} from 'react';
import { HttpService } from '../../../services/HttpService';
import './style.css';
import Logo from './img/logo.svg';
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService';
import Certificate from './Certificate';
import StudentTicket from './StudentTicket';
import Diploma from './Diploma';

const Approves = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const navigate = useNavigate();
    const openModers = () => {
        navigate('/moderators');
    };
    const openProfile = () => {
        navigate('/profile');
    };
    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }


    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchData = async (page, size) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.get(`educations?page=${page}&size=${size}`);
        setData(response.data.content);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="approves-list-wrap">
            <div className="approves-list-header-wrap">
                <img src={Logo}/>
                <div className="pagination">
                    <button onClick={() => handlePageChange(0)}>1</button>
                    <button onClick={() => handlePageChange(1)}>2</button>
                    <button onClick={() => handlePageChange(currentPage + 1)}>next</button>
                </div>
            </div>
        
            <div className="approves-list-managment-wrap">
                {data.map(item => {
                    if (item.type === 'STUDENT_TICKET') {
                        return (<StudentTicket 
                            fullName={`${item.person.firstName} ${item.person.middleName} ${item.person.lastName}`}
                            studentNumber={item.number}
                            id={item.id}
                            type={item.type}
                        />)
                    } else if (item.type === 'DIPLOMA') {
                        return (<Diploma 
                            fullName={`${item.person.firstName} ${item.person.middleName} ${item.person.lastName}`}
                            diplomaSeries = {item.serialCode}
                            diplomaNumber = {item.number}
                            id={item.id}
                            type={item.type}
                        />)
                    } else {
                        return (<Certificate 
                            fullName={`${item.person.firstName} ${item.person.middleName} ${item.person.lastName}`}
                            courseCompany = {item.resource}
                            verificationData = {item.dataToCheck}
                            id={item.id}
                            type={item.type}
                        />)
                    }
                }
                )}
            </div>
    
            <div className="approves-list-footer-wrap">
                <button onClick={openProfile}>MY PROFILE</button>
                <button onClick={openModers}>ADMINS</button>
                <button onClick={logout}>LOG OUT</button>
            </div>
        </div>
    );

}

export default Approves;