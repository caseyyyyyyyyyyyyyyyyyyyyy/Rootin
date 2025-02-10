import React from 'react';
import { useNavigate } from 'react-router-dom';
import idealIcon from '../assets/images/ideal.svg';
import overwaterIcon from '../assets/images/overwater.svg';
import underwaterIcon from '../assets/images/underwater.svg';
import noSensorIcon from '../assets/images/no_sensor.svg';

function PlantCard({ plantId, name, type, location, image, status }) {
    const navigate = useNavigate();

    const getStatusIcon = (status) => {
        const statusLower = status?.toLowerCase();
        
        switch (statusLower) {
            case 'ideal':
                return idealIcon;
            case 'water_needed':
                return underwaterIcon;
            case 'overwater':
                return overwaterIcon;
            case 'no_sensor':
                return noSensorIcon;
            default:
                console.log('Unknown status:', status);
                return idealIcon;
        }
    };

    const formatLocation = (location) => {
        if (!location) return '';
        const parts = location.split('/');
        return `In ${parts[parts.length - 1]}`;
    };

    return (
        <div className="plant-card" onClick={() => navigate(`/plant/${plantId}`)}>
            <div className="plant-image">
                <img src={image} alt={name} />
                <div className={`status-indicator ${status?.toLowerCase()}`}>
                    <img src={getStatusIcon(status)} alt={status?.toLowerCase()} />
                </div>
            </div>
            <div className="plant-info">
                <h3>{name}</h3>
                <p>{type}</p>
                <p>{formatLocation(location)}</p>
            </div>
        </div>
    );
}

export default PlantCard; 