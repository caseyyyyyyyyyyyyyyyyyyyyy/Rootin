import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import styles from './PlantSearch.module.css';
import { useNavigate } from 'react-router-dom';

export default function PlantSearch() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [plants, setPlants] = useState([]);

  // 키워드가 있을 때의 디바운스된 검색
  const debouncedSearch = debounce(async (searchKeyword) => {
    try {
      const response = await axios.get(
        `https://rootin-api.hojun.link/v1/plant-types?keyword=${searchKeyword}`
      );
      setPlants(response.data.data);
    } catch (error) {
      console.error('식물 검색 중 오류 발생:', error);
    }
  }, 300);

  // 키워드 변경 시 실행
  useEffect(() => {
    if (keyword) {
      debouncedSearch(keyword);
    } else {
      // 빈 문자열일 때는 즉시 검색
      fetchPlants();
    }
  }, [keyword]);

  // 초기 로딩과 빈 문자열일 때 실행할 함수
  const fetchPlants = async () => {
    try {
      const response = await axios.get(
        'https://rootin-api.hojun.link/v1/plant-types?keyword='
      );
      setPlants(response.data.data);
    } catch (error) {
      console.error('식물 검색 중 오류 발생:', error);
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchPlants();
  }, []);

  const handlePlantSelect = (plant) => {
    navigate('/location', { state: { selectedPlant: plant } });
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.closeButton} 
        onClick={() => navigate('/')}
      >
        ✕
      </button>
      <h1 className={styles.title}>Identify your plant</h1>
      <p className={styles.subtitle}>Search by plant name or use an image to identify.</p>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Which one to add?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.plantList}>
        {plants.map((plant) => (
          <div 
            key={plant.id} 
            className={styles.plantItem}
            onClick={() => handlePlantSelect(plant)}
          >
            <img src={plant.imageUrl} alt={plant.name} className={styles.plantImage} />
            <div className={styles.plantInfo}>
              <h3 className={styles.plantName}>{plant.name}</h3>
              <p className={styles.plantSubname}>{plant.subname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 