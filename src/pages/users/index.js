import React, { useRef, useEffect, useState } from 'react';
import './style.css';
import Logo from './img/logo.svg';
import { HttpService } from '../../services/HttpService';
import UserWrap from './UserWrap';
import { useNavigate } from "react-router-dom";
import UserService from '../../services/UserService';

const UserListPage = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    const [initiatives, setInitiatives] = useState([]);
    const searchbox = useRef();
    const [iniId, setIniId] = useState(null);
    const openProfile = () => {
        navigate('/profile');
    };

    const openInitiatives = () => {
        navigate('/initiatives');
    };

    const updateIniId = (newId) => {
        setIniId(newId);
    }

    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        fetchData(currentPage, pageSize);
        fetchInitiatives();
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchData = async (page, size) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.get(`users/list/?page=${page}&size=${size}`);
        setData(response.data.content);
    };

    const fetchInitiatives = async () => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response_inis = await HttpService.get('/initiatives/my/');
        
        if (JSON.stringify(response_inis.data) !== "[]") {
            setInitiatives(response_inis.data);
            setIniId(response_inis.data[0].id);
        } else {
            setIniId("");
        }
        
    };

    const search = async () => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.post(`/users/search?request=${searchbox.current.value}`);
        setData(response.data);
    }

    return (
        <div class="users-list-wrap">
            <div class="users-list-header-wrap">
            <img src={Logo}/>
        <div>
            <select class="ini-list-to-invite" value={iniId}>
                {
                    initiatives.map(item => {
                        return (<option value={item.id}>{item.name}</option>)
                    })
                }
            </select>
        </div>
    </div>
    
    <div class="all-users-list-wrap">
        {
            data.map(
                item => {return (<UserWrap iniId={iniId} user={item} />)}
            )
        }

    </div>
    
    <div class="users-list-managment-wrap">
        <div class="search-wrapper">
            <div class="search-section" onChange={(e) => updateIniId(e.target.value)}>
                <input type="text" ref={searchbox}/>
                <button onClick={search}>SEARCH</button>
            </div>
            <span>
                *пошук доступний за позиціями, раніше досліджуваними темами, описами профілю
            </span>
        </div>
        <div class="pagination">
                <button onClick={() => handlePageChange(0)}>1</button>
                <button onClick={() => handlePageChange(1)}>2</button>
                <button onClick={() => handlePageChange(currentPage + 1)}>next</button>
        </div>
    </div>
    
    <div class="users-list-footer-wrap">
        <button onClick={openProfile}>MY PROFILE</button>
        <button onClick={openInitiatives}>INITIATIVES</button>
        <button onClick={logout}>LOG OUT</button>
    </div>
</div>
    )
}

export default UserListPage;