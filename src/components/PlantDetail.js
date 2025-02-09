import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlantDetail.css';

function PlantDetail() {
  const navigate = useNavigate();

  return (
    <div className="plant-detail">
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <img src="/images/close.svg" alt="Back" />
        </button>
        <h1>Happy</h1>
        <h2>Pink Quil</h2>
        <h3>In Livingroom</h3>
      </header>

      <div className="detail-tabs">
        <button className="tab active">Care tips</button>
        <button className="tab">Real-time Soil Moisture</button>
      </div>

      <div className="ai-chat-section">
        <h2>Chat with our AI diagnosing!</h2>
        <p>Ask our Chatbot and resolve your curiosities.</p>
        <button className="chatbot-button">Go to Chatbot</button>
      </div>

      <section className="overall-tips">
        <h2>Overall Tips</h2>
        <div className="tips-grid">
          <div className="tip-item">
            <span className="tip-label">Difficulty</span>
            <span className="tip-value">Easy</span>
          </div>
          <div className="tip-item">
            <span className="tip-label">Watering</span>
            <span className="tip-value">1-2 weeks</span>
          </div>
          <div className="tip-item">
            <span className="tip-label">Sunlight</span>
            <span className="tip-value">Direct</span>
          </div>
          <div className="tip-item">
            <span className="tip-label">Soil Type</span>
            <span className="tip-value">Well-Drain</span>
          </div>
          <div className="tip-item">
            <span className="tip-label">Repotting</span>
            <span className="tip-value">1 month</span>
          </div>
          <div className="tip-item">
            <span className="tip-label">Toxicity</span>
            <span className="tip-value">Non-toxic</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlantDetail; 