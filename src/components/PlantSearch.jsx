import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import styles from './PlantSearch.module.css';
import { useNavigate } from 'react-router-dom';
import PlantSearchSkeleton from './PlantSearchSkeleton';

export default function PlantSearch() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 키워드가 있을 때의 디바운스된 검색
  const debouncedSearch = debounce(async (searchKeyword) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://rootin-api.hojun.link/v1/plant-types?keyword=${searchKeyword}`
      );
      setPlants(response.data.data);
    } catch (error) {
      console.error('식물 검색 중 오류 발생:', error);
    } finally {
      setLoading(false);
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
    setLoading(true);
    try {
      const response = await axios.get(
        'https://rootin-api.hojun.link/v1/plant-types?keyword='
      );
      setPlants(response.data.data);
    } catch (error) {
      console.error('식물 검색 중 오류 발생:', error);
    } finally {
      setLoading(false);
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
        onClick={() => navigate(-1)}
      >
        ✕
      </button>
      <h1 className={styles.title}>Add a Plant</h1>
      <p className={styles.subtitle}>Search your plant by name</p>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search plants..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {loading ? (
        <PlantSearchSkeleton />
      ) : (
        <div className={styles.plantList}>
          {plants.map(plant => (
            <div
              key={plant.id}
              className={styles.plantItem}
              onClick={() => handlePlantSelect(plant)}
            >
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className={styles.plantImage}
              />
              <div className={styles.plantInfo}>
                <h3 className={styles.plantName}>{plant.name}</h3>
                <p className={styles.plantSubname}>{plant.scientificName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 