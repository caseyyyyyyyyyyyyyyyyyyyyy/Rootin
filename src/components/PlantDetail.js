import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/PlantDetail.css';
import PlantDetailSkeleton from './PlantDetailSkeleton';
import nav_home from '../assets/images/nav_home.svg';
import nav_watering from '../assets/images/nav_watering.svg';
import nav_profile from '../assets/images/nav_profile.svg';

function PlantDetail({ handleUnsupportedFeature }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching plant with ID:', id);
    setLoading(true);
    
    fetch('https://rootin-api.hojun.link/v1/plants')
      .then(response => response.json())
      .then(response => {
        const plantData = response.data.find(p => String(p.plantId) === id);
        console.log('Found plant data:', plantData);
        
        if (plantData) {
          setPlant(plantData);
        } else {
          console.log('Plant not found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plant details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <PlantDetailSkeleton />;
  }

  if (!plant) {
    return (
      <div className="plant-detail">
        <header className="detail-header">
          <button onClick={() => navigate(-1)} className="back-button">
            ✕
          </button>
        </header>
        <div className="error-message">
          <h2>Plant not found</h2>
          <p>Sorry, we couldn't find the plant you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-detail">
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ✕
        </button>
      </header>

      <div className="detail-plant-info">
        <h1>{plant.nickname || plant.plantTypeName}</h1>
        <p className="plant-type">{plant.plantTypeName}</p>
        <p className="plant-location">{plant.category}</p>
      </div>

      <div className="detail-plant-image">
        <img 
          src={plant.imageUrl}
          alt={plant.nickname || plant.plantTypeName}
          onError={(e) => console.error('Image loading error:', e)}
        />
      </div>

      <div className="action-buttons">
        <button className="care-tips">Care Tips</button>
        <button className="soil-moisture" onClick={handleUnsupportedFeature}>
          Real-time Soil Moisture
        </button>
      </div>

      <div className="chat-section">
        <h2>Ask about your plant</h2>
        <p>Get personalized care tips for your plant</p>
        <button className="chatbot-button" onClick={handleUnsupportedFeature}>
          Go to Chatbot
        </button>
      </div>

      <div className="divider"></div>

      <section className="overall-tips">
        <h2>Overall Tips</h2>
        <div className="tip-boxes">
          <div className="tip-box">
            <h3>Difficulty</h3>
            <p>{plant.info_difficulty || 'Easy'}</p>
          </div>
          <div className="tip-box">
            <h3>Watering</h3>
            <p>{plant.info_watering || '1-2 weeks'}</p>
          </div>
          <div className="tip-box">
            <h3>Sunlight</h3>
            <p>{plant.info_light || 'Direct'}</p>
          </div>
          <div className="tip-box">
            <h3>Soil Type</h3>
            <p>{plant.info_soil_type || 'Well-Drain'}</p>
          </div>
          <div className="tip-box">
            <h3>Repotting</h3>
            <p>{plant.info_repotting || '1 month'}</p>
          </div>
          <div className="tip-box">
            <h3>Toxicity</h3>
            <p>{plant.info_toxicity || 'Non-toxic'}</p>
          </div>
        </div>
      </section>

      <nav className="bottom-nav">
        <button onClick={() => navigate('/')}>
          <img src={nav_home} alt="Home" />
          
        </button>
        <button onClick={handleUnsupportedFeature}>
          <img src={nav_watering} alt="Watering" />
        </button>
        <button onClick={handleUnsupportedFeature}>
          <img src={nav_profile} alt="Profile" />
          
        </button>
      </nav>
    </div>
  );
}

export default PlantDetail;