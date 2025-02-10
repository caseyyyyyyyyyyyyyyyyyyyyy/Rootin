import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/PlantDetail.css';
import nav_home from '../assets/images/nav_home.svg';
import nav_watering from '../assets/images/nav_watering.svg';
import nav_profile from '../assets/images/nav_profile.svg';

function PlantDetail() {
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
    return <div>Loading...</div>;
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
        <button className="care-tips">Care tips</button>
        <button className="soil-moisture">Real-time Soil Moisture</button>
      </div>

      <div className="chat-section">
        <h2>Chat with our AI diagnosing!</h2>
        <p>Ask our Chatbot and resolve your curiosities.</p>
        <button className="chatbot-button">Go to Chatbot</button>
      </div>

      <div className="divider"></div>

      <section className="overall-tips">
        <h2>Overall Tips</h2>
        <div className="tips-grid">
          <div className="tip-item">
            <span>Difficulty</span>
            <strong>{plant.info_difficulty || 'Easy'}</strong>
          </div>
          <div className="tip-item">
            <span>Watering</span>
            <strong>{plant.info_watering || '1-2 weeks'}</strong>
          </div>
          <div className="tip-item">
            <span>Sunlight</span>
            <strong>{plant.info_light || 'Direct'}</strong>
          </div>
          <div className="tip-item">
            <span>Soil Type</span>
            <strong>{plant.info_soil_type || 'Well-Drain'}</strong>
          </div>
          <div className="tip-item">
            <span>Repotting</span>
            <strong>{plant.info_repotting || '1 month'}</strong>
          </div>
          <div className="tip-item">
            <span>Toxicity</span>
            <strong>{plant.info_toxicity || 'Non-toxic'}</strong>
          </div>
        </div>
      </section>

      <nav className="bottom-nav">
        <button onClick={() => navigate('/')}>
          <img src={nav_home} alt="Home" />
          <span>Home</span>
        </button>
        <button onClick={() => navigate('/watering')}>
          <img src={nav_watering} alt="Watering" />
          <span>Watering</span>
        </button>
        <button onClick={() => navigate('/profile')}>
          <img src={nav_profile} alt="Profile" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}

export default PlantDetail;