import React,  { useEffect } from "react";
import './style.css';
import './styleguide.css';
import Spikes from './img/spikes.svg';
import Logo from './img/logo.svg';
import { useNavigate } from "react-router-dom";

 
const Home = () => {

    const navigate = useNavigate();
    const openProvidersPage = () => {
        navigate('/providers');
    };

    
    return (
            <div className="start-page">
                    <div className="overlap">
                        <div className="group">
                            <img className="rectangle" src={Logo} />
                        </div>
                        <p className="p">
                            <span className="text-wrapper">Маєш круті скіли?<br /> </span>
                            <span className="text-wrapper">Шукаєш нові можливості?</span>
                        </p>
                    </div>
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group">
                            <button className="text-wrapper-2" onClick={openProvidersPage}>START THE JOURNEY</button>
                        </div>
                    </div>
                    <img className="img" src={Spikes}/>
            </div>
    );
};
 
export default Home;