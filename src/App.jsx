import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PlantDetail from './components/PlantDetail';
import PlantSearch from './components/PlantSearch';
import PlantCard from './components/PlantCard';
import logo from './assets/images/logo_homepage.svg';
import plus from './assets/images/add_plant.svg';
import monsteraLeaf from './assets/images/monstera-leaf.svg';
import nav_home from './assets/images/nav_home.svg';
import nav_watering from './assets/images/nav_watering.svg';
import nav_profile from './assets/images/nav_profile.svg';
import Home from './components/Home';

function HomeScreen() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://rootin-api.hojun.link/v1/plants')
      .then(response => response.json())
      .then(response => {
        setPlants(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
        setLoading(false);
      });
  }, []);

  const plantsNeedingWater = plants.filter(plant => 
    plant.status === 'WATER_NEEDED'
  );

  const getWateringMessage = (count) => {
    if (count === 0) {
      return "All plants healthy!";
    }
    return `${count} plants need water`;
  };

  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} alt="Logo" className="rootin-logo" />
        <button 
          className="add-plant-button"
          onClick={() => navigate('/search')}
        >
          <img src={plus} alt="Add plant" />
        </button>
      </header>

      <section className="next-watering">
        <h2>Today's Watering</h2>
        <div className="watering-content">
          <div className="watering-status">
            <div className="watering-text">
              <h3>{getWateringMessage(plantsNeedingWater.length)}</h3>
              <p className="check-watering">
                Check your watering <span>→</span>
              </p>
            </div>
            <img 
              src={monsteraLeaf} 
              alt="Monstera leaf" 
              className="monstera-leaf"
            />
          </div>
        </div>
      </section>

      <section className="my-plants">
        <h2>My Plants</h2>
        <div className="plants-grid">
          {loading ? (
            <div>Loading...</div>
          ) : (
            plants.map(plant => (
              <PlantCard
                key={plant.plantId}
                plantId={plant.plantId}
                name={plant.nickname || plant.plantTypeName}
                type={plant.plantTypeName}
                location={plant.category}
                image={plant.imageUrl}
                status={plant.status}
              />
            ))
          )}
        </div>
      </section>

      <nav className="bottom-nav">
        <button>
          <img src={nav_home} alt="Home" />
        </button>
        <button>
          <img src={nav_watering} alt="Watering" />
        </button>
        <button>
          <img src={nav_profile} alt="Profile" />
        </button>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="/search" element={<PlantSearch />} />
      </Routes>
    </Router>
  );
}

export default App; 