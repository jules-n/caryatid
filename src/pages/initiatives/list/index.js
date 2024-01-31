import React, { useEffect, useState } from "react";
import { HttpService} from '../../../services/HttpService';
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService';
import StartupItem from './StartupItem';
import Logo from '../img/logo.svg';
import './style.css';

const Initiatives = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [owner, setOwner] = useState('all');
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleOwnerChange = (owner) => {
        setOwner(owner);
    };

    const fetchData = async (page, size, owner) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.get(`initiatives?page=${page}&size=${size}&owner=${owner}`);
        setData(response.data.content);
    };

    useEffect(() => {
        fetchData(currentPage, pageSize, owner);
    }, [currentPage, pageSize, owner]);

    const logout = () => {
        UserService.logout();
        sessionStorage.removeItem('token');
        navigate('/');
    }
    const create = () => {
        navigate('/initiatives/create');
    }

    return (
        <div className="ini-page-wrap">
        <div className="ini-menu-read">
            <img src={Logo}/>
            <div className="menu-buttons-wrap-ini">
                <button onClick={() => handleOwnerChange('all')}>ALL INITIATIVES</button>
                <button onClick={() => handleOwnerChange('my')}>MY INITIATIVES</button>
                <button onClick={create}>CREATE OWN</button>
                <button onClick={logout}>LOG OUT</button>
            </div>
        </div>
        <div className="wrap-ini-content">
            <div className="ini-list">
                {
                    data.map(item => {
                        return (
                            <StartupItem
                                id={item.id}
                                title={item.name}
                                description={item.description}
                                isMy={owner === 'my'}
                            />
                        )
                    })
                }
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(0)}>1</button>
                <button onClick={() => handlePageChange(1)}>2</button>
                <button onClick={() => handlePageChange(currentPage + 1)}>next</button>
            </div>
        </div>
    </div>
    )
}

export default Initiatives;