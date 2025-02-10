import React from 'react';
import { useNavigate } from 'react-router-dom';
import idealIcon from '../assets/images/ideal.svg';
import overwaterIcon from '../assets/images/overwater.svg';
import underwaterIcon from '../assets/images/underwater.svg';
import noSensorIcon from '../assets/images/no_sensor.svg';

function PlantCard({ plantId, name, type, location, image, status }) {
    const navigate = useNavigate();

    const getStatusIcon = (status) => {
        switch (status) {
            case 'IDEAL':
                return idealIcon;
            case 'WATER_NEEDED':
                return underwaterIcon;
            case 'OVERWATER':
                return overwaterIcon;
            case 'NO_SENSOR':
                return noSensorIcon;
            default:
                return idealIcon;
        }
    };

    return (
        <div className="plant-card" onClick={() => navigate(`/plant/${plantId}`)}>
            <div className="plant-image">
                <img src={image} alt={name} />
                <div className="status-indicator">
                    <img src={getStatusIcon(status)} alt={status} />
                </div>
            </div>
            <div className="plant-info">
                <h3>{name}</h3>
                <p>{type}</p>
                <p>{location}</p>
            </div>
        </div>
    );
}

export default PlantCard; 