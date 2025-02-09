import React from 'react';
import underwater from '../assets/images/underwater.svg';
import overwater from '../assets/images/overwater.svg';
import ideal from '../assets/images/ideal.svg';
import no_sensor from '../assets/images/no_sensor.svg';

function PlantCard({ name, type, location, image, status }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'water_needed':
                return underwater;
            case 'overwater':
                return overwater;
            case 'no_sensor':
                return no_sensor;
            case 'ideal':
            default:
                return ideal;
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