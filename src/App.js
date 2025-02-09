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


function App() {
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
      </Routes>
    </Router>
  );
}

function Home() {
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
        <button className="add-plant-button">
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
            <p className="main-text">You have 1 plant<br />waiting to be watered</p>
            <p className="check-text">Check your watering →</p>
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

      <button className="ai-chat-button">
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
        <button>
          <img
            src={nav_watering}
            alt="Watering"
          />
        </button>
        <button>
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
