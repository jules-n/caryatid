import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Logo from './img/logo.svg';
import { HttpService } from '../../services/HttpService';
import './style.css';
import Application from './Application';


const Applications = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchData = async (page, size) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.get(`/initiatives/${id}/applications?page=${page}&size=${size}`);
        setData(response.data.content);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="profile-user-read">
        <div className="profile-menu-read">
            <button id="arrow-back" onClick={() => navigate(-1)}></button>
            <img src={Logo}/>
        </div>
        <div className="wrap-applications">
            <div className="users-applications-list">
                {
                    data.map( item => {
                        return (<Application 
                            iniId = {id}
                            invitationId = {item.invitationId }
                            member = {item.member}
                        />)
                    })
                }
            </div>
            <div className="pagination-applications">
                <button onClick={() => handlePageChange(0)}>1</button>
                <button onClick={() => handlePageChange(1)}>2</button>
                <button onClick={() => handlePageChange(currentPage + 1)}>next</button>
            </div>
        </div>
    </div>
    )
}

export default Applications;
