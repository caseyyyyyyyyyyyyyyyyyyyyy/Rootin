import './App.css';
import PlantCard from './components/PlantCard';
import SkeletonCard from './components/SkeletonCard';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlantDetail from './components/PlantDetail';
import logo_homepage from './assets/images/logo_homepage.svg';
import monstera_leaf from './assets/images/monstera-leaf.svg';
import add_plant from './assets/images/add_plant.svg';
import nav_home from './assets/images/nav_home.svg';
import nav_watering from './assets/images/nav_watering.svg';
import nav_profile from './assets/images/nav_profile.svg';
import AI from './assets/images/AI.svg';
import { useNavigate } from 'react-router-dom';
import PlantSearch from './components/PlantSearch';
import PlantLocation from './components/PlantLocation';
import PlantSensor from './components/PlantSensor';
import Modal from './components/Modal';


function App() {
  const [showModal, setShowModal] = useState(false);

  const handleUnsupportedFeature = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home handleUnsupportedFeature={handleUnsupportedFeature} />} />
        <Route path="/plant/:id" element={<PlantDetail handleUnsupportedFeature={handleUnsupportedFeature} />} />
        <Route path="/search" element={<PlantSearch />} />
        <Route path="/location" element={<PlantLocation />} />
        <Route path="/sensor" element={<PlantSensor />} />
      </Routes>

      <Modal 
        message="This feature is not supported in the prototype."
        isVisible={showModal}
      />
    </Router>
  );
}

function Home({ handleUnsupportedFeature }) {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://rootin-api.hojun.link/v1/plants')
      .then(response => response.json())
      .then(response => {
        console.log('API Response:', response);
        setPlants(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <img
          src={logo_homepage}
          alt="Rootin"
          className="rootin-logo"
        />
        <button 
          className="add-plant-button"
          onClick={() => navigate('/search')}
        >
          <img
            src={add_plant}
            alt="Add plant"
          />
        </button>
      </header>

      <section className="next-watering">
        <h2>Today's Watering</h2>
        <div className="watering-content">
          <div className="watering-text">
            <h3 className="main-text">You have 1 plant</h3>
            <h3 className="main-text">waiting to be watered</h3>
            <p className="check-text" onClick={handleUnsupportedFeature} style={{ cursor: 'pointer' }}>
              Check your watering <span>→</span>
            </p>
          </div>
          <img
            src={monstera_leaf}
            alt="Monstera leaf"
            className="leaf-image"
          />
        </div>
      </section>

      <section className="my-plants">
        <h2>My Plants</h2>
        <div className="plants-grid">
          {loading ? (
            [...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            plants.map(plant => (
              <PlantCard
                key={plant.plantId}
                plantId={plant.plantId}
                name={plant.nickname || plant.plantTypeName}
                type={plant.plantTypeName}
                location={plant.category}
                image={plant.imageUrl}
                status={plant.status.toLowerCase()}
              />
            ))
          )}
        </div>
      </section>

      <button className="ai-chat-button" onClick={handleUnsupportedFeature}>
        <img
          src={AI}
          alt="AI Chat"
        />
      </button>

      <nav className="bottom-nav">
        <button>
          <img
            src={nav_home}
            alt="Home"
          />
        </button>
        <button onClick={handleUnsupportedFeature}>
          <img
            src={nav_watering}
            alt="Watering"
          />
        </button>
        <button onClick={handleUnsupportedFeature}>
          <img
            src={nav_profile}
            alt="Profile"
          />
        </button>
      </nav>
    </div>
  );
}

export default App;
