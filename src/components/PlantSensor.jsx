import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styles from './PlantSensor.module.css';
import Modal from './Modal';

export default function PlantSensor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlant, selectedLocation } = location.state || {};
  const [showModal, setShowModal] = useState(false);

  const handleConnect = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleSkip = async () => {
    try {
      const response = await axios.post('https://rootin-api.hojun.link/v1/plants', {
        plantTypeId: selectedPlant.id,
        categoryId: selectedLocation.id,
        imageUrl: selectedPlant.imageUrl,
        nickname: selectedPlant.name
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error('식물 등록 중 오류 발생:', error);
      // 에러가 발생해도 일단 홈으로 이동
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.closeButton}
        onClick={() => navigate(-1)}
      >
        ✕
      </button>

      <h1 className={styles.title}>Ready to connect the sensor?</h1>
      <p className={styles.subtitle}>
        Feel free to skip for now—you can easily add later in the plant's detail settings.
      </p>

      <div className={styles.plantPreview}>
        <img 
          src={selectedPlant?.imageUrl} 
          alt={selectedPlant?.name} 
          className={styles.plantImage}
        />
        <h2 className={styles.plantName}>{selectedPlant?.name}</h2>
        <p className={styles.plantLocation}>In {selectedLocation?.name}</p>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          className={styles.connectButton}
          onClick={handleConnect}
        >
          Yes, let's connect it!
        </button>
        <button 
          className={styles.skipButton}
          onClick={handleSkip}
        >
          Maybe later
        </button>
      </div>

      <Modal 
        message="This feature is not supported in the prototype."
        isVisible={showModal}
      />
    </div>
  );
} 