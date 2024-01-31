import React, {useEffect, useState} from 'react';
import './style.css';
import { HttpService} from '../../../services/HttpService';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from './img/logo.svg';

const Initiative = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [data, setData] = useState([]);
   const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    const jwtToken = sessionStorage.getItem('token');
    HttpService.setJwt(jwtToken);
    const response = await HttpService.get(`\\initiatives/${id}`);
    setData(response.data);
    setMembers(response.data.members);
    };

    const updateStatus = async (newStatus) => {
        if (newStatus === data.status) return;
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const response = await HttpService.put(`\\initiatives/${id}?status=${newStatus}`);
        toast.dark('Вітаю з перехідом на новий рівень');
        fetchData();
    }

    const importFile = async (e) => {
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const jwtToken = sessionStorage.getItem('token');
            HttpService.setJwt(jwtToken);
            HttpService.post(`\\documents/import?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                if (response.status === 204) {
                    toast.dark('Файл завантажено');
                  }
            });
            
        } catch (error) {
            console.error('Помилка при завантаженні зображення:', error);
        }
    }

    const exportFile = async () => {
        const toSend = {
            id: id,
            name: data.name,
            members: data.members
        }
        const jwtToken = sessionStorage.getItem('token');
        HttpService.setJwt(jwtToken);
        HttpService.post('/documents/export', toSend).then(response => {
            const link = document.createElement('a');
            link.href = response.data;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(response.data);
        })

    }

   return (
        <div className="profile-user-read">
            <div className="profile-menu-read">
                <button id="arrow-back" onClick={() => navigate(-1)}></button>
                <select nameName="status" id="status" class="status" value={data.status} onChange={(e) => updateStatus(e.target.value)}>
                    <option value="JUST_CREATED">JUST_CREATED</option>
                    <option value="IN_SEARCH_OF_MEMBERS">IN_SEARCH_OF_MEMBERS</option>
                    <option value="IN_DEV">IN_DEV</option>
                    <option value="READY_TO_BE_A_STARTUP">READY_TO_BE_A_STARTUP</option>
                </select>
                <img src={Logo}/>
            </div>
            <div className="wrap-initiative-content-read">
                <div className="initiative-content-read">
                    <div className="initiative-content-read-description">
                        {data.description}
                       </div>
                <div className="initiative-main-content-read">
                    <div className="initiative-link-content-read">
                        <span className="initiative-content-header">
                            LINK TO CHAT: 
                        </span>
                        <a href={data.privateLink}>
                            {data.privateLink}
                        </a>
                    </div>
                
                {data.status === 'READY_TO_BE_A_STARTUP'? (
                    <div class="co-founder-agreement-manage-wrap">
                        <button className="co-founder-agreement-manage" onClick={exportFile}>export an unsigned co-founder agreement</button>
                        <button className="co-founder-agreement-manage" onClick={() => document.getElementById('aggrInput').click()}>import the signed co-founder agreement</button>
                        <input 
                            type="file" 
                            id="aggrInput" 
                            hidden 
                            onChange={importFile}
                        />
                </div>) : null}
                
                {data.status !== 'JUST_CREATED'?(
                    <span className="initiative-content-header">ВЖЕ В КОМАНДІ:</span>
                ):null}
                {data.status !== 'JUST_CREATED'? (
                    <div className="participants-list"> 
                    {
                        members.map(item => {
                            return (<button onClick={() => navigate(`/user/${item.email}`)}>{item.name+" "+item.surname}</button>)
                        })
                    }
                    </div>
                ): null}
                
            </div>
            {data.status !== 'JUST_CREATED'? (<button id="check-applications" onClick={() => navigate(`/applications/${id}`)}>...</button>):null}
            
            </div>
                <div className="initiative-name-read">
                    {data.name}
                </div>
            </div>
            <ToastContainer />
        </div>
   );

}

export default Initiative;