import React, { useEffect, useState } from 'react';
import './style.css';
import { HttpService } from '../../services/HttpService';
import { useNavigate } from "react-router-dom";
import UserService from '../../services/UserService';
import Invitation from './Invitation';

const Invitations = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchData = async (page, size) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.get(`initiatives/invitations/?page=${page}&size=${size}`);
        setData(response.data.content);
    };

    const openProfile = () => {
        navigate('/profile');
    };

    const openUsers = () => {
        navigate('/users');
    };

    const openInitiatives = () => {
        navigate('/initiatives');
    };

    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return (
    <div class="user-invitations">
        <div class="inv-menu-read">
            <button onClick={openProfile}>MY PROFILE</button>
            <button onClick={openUsers}>OTHER USERS</button>
            <button onClick={openInitiatives}>INITIATIVES</button>
            <button onClick={logout}>LOG OUT</button>
        </div>
        <div class="content-invitations">
            <div class="pagination">
                <button onClick={() => handlePageChange(0)}>1</button>
                <button onClick={() => handlePageChange(1)}>2</button>
                <button onClick={() => handlePageChange(currentPage + 1)}>next</button>
            </div>
            <div class="invitations-list">
                {
                    data.map(
                        item => {
                            return (<Invitation invitation = {item}/>)
                        }
                    )
                }
            </div>
        </div>
    </div>
)

}

export default Invitations;