import React, {useEffect, useState} from 'react';
import './style.css';
import { HttpService} from '../../../services/HttpService';
import { useNavigate, useParams } from "react-router-dom";
import Logo from '../img/logo.svg';
import DefaultPhoto from '../../users/img/user-photo.png';

const UserPage = () => {
   const { email } = useParams();
   const navigate = useNavigate();
   const [data, setData] = useState([]);
   const [imageUrl, setImageUrl] = useState(DefaultPhoto);
   const [educations, setEducations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    const jwtToken = sessionStorage.getItem('token');
    HttpService.setJwt(jwtToken);
    const response = await HttpService.get(`/users/${email}`);
    setData(response.data);
    if (response.data.photoLink === null || response.data.photoLink === undefined) {
        setImageUrl(DefaultPhoto)
    } else {
        setImageUrl(response.data.photoLink)
    }
    setEducations(response.data.educations);
    };

   return (
    <div className="profile-user-read">
        <div className="profile-menu-read">
            <button id="arrow-back" onClick={() => navigate(-1)}></button>
            <img src={Logo}/>
    </div>
    <div className="wrap-profile-user-content-read">
        <img src={imageUrl}/>
        <div className="profile-user-content-read">
            <div className="profile-user-bio-read">
                {data.name} <br/> {data.surname}
            </div>
            <div>
                {educations.map(item => {
                  if (item.type === 'CERTIFICATE') {
                    return (<p>{item.result}</p>)
                  }
                  if (item.type === 'DIPLOMA') {
                    return (<p>{item.university}<br/>ступінь вищої освіти {item.degree} спеціальність {item.major}</p>)
                  }
                  if (item.type === 'STUDENT_TICKET') {
                    return (<p>{item.university}</p>)
                  }
                })}
            </div>
            <div>
                <p>бажана позиція: {data.position}</p>
                <p>про себе: {data.about}</p>
            </div>
            <div>
                <p>linkedin: vasyl-charivnyk-6a2859331</p>
                <p>tg: @vasylchary</p>
                <p>e-mail: {email}</p>
            </div>
        </div>
    </div>
</div>
   );

}

export default UserPage;