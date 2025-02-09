import React from 'react';
import status_water from '../assets/images/overwater.svg';
import status_ideal from '../assets/images/ideal.svg';
import status_water_needed from '../assets/images/underwater.svg';
import status_no_sensor from '../assets/images/no_sensor.svg';

function PlantCard({ name, type, location, image, status }) {
    const getStatusIcon = (status) => {
        console.log(status);
        switch (status) {
            case 'overwater':
                return status_water;
            case 'ideal':
                return status_ideal;
            case 'water_needed':
                return status_water_needed;
            case 'no_sensor':
                return status_no_sensor;
            default:
                return status_ideal;
        }
    };

    return (
        <div className="plant-card">
            <div className="plant-image">
                <img src={image} alt={name} className="plant-img" />
                <div className="status-icon">
                    <img
                        src={getStatusIcon(status)}
                        alt="Plant status"
                    />
                </div>
            </div>
            <div className="plant-info">
                <h3>{name}</h3>
                <p className="plant-type">{type}</p>
                <p className="plant-location">{location}</p>
            </div>
        </div>
    );
}

export default PlantCard; 