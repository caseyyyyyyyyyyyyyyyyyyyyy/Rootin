import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PlantLocation.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PlantLocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [uniqueRoots, setUniqueRoots] = useState([]);
  const [selectedRoot, setSelectedRoot] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://rootin-api.hojun.link/v1/categories');
        setCategories(response.data.data);
        
        const roots = response.data.data.map(category => category.name.split('/')[0]);
        const uniqueRoots = [...new Set(roots)];
        setUniqueRoots(uniqueRoots);
      } catch (error) {
        console.error('카테고리 로딩 중 오류 발생:', error);
      }
    };

    fetchCategories();
  }, []);

  // 선택된 루트에 해당하는 하위 카테고리들을 찾는 함수
  const getSubCategories = (root) => {
    return categories
      .filter(category => category.name.startsWith(root + '/'))
      .map(category => {
        const parts = category.name.split('/');
        return {
          id: category.id,
          name: parts[1]
        };
      });
  };

  const handleSubCategorySelect = (subCategory) => {
    const fullLocation = {
      id: subCategory.id,
      name: `${selectedRoot}/${subCategory.name}`
    };
    navigate('/sensor', { 
      state: { 
        selectedPlant: location.state?.selectedPlant,
        selectedLocation: fullLocation
      } 
    });
  };

  if (selectedRoot) {
    const subCategories = getSubCategories(selectedRoot);
    
    return (
      <div className={styles.container}>
        <button 
          className={styles.closeButton}
          onClick={() => setSelectedRoot(null)}
        >
          ✕
        </button>

        <div className={styles.locationHeader}>
          <h2 className={styles.locationLabel}>Location</h2>
          <button className={styles.selectedRoot}>{selectedRoot}</button>
        </div>
        
        <h1 className={styles.title}>Choose area of the plant</h1>
        
        <div className={styles.locationGrid}>
          {subCategories.map((subCategory) => (
            <button 
              key={subCategory.id} 
              className={styles.locationCard}
              onClick={() => handleSubCategorySelect(subCategory)}
            >
              {subCategory.name}
            </button>
          ))}
        </div>

        <button className={styles.continueButton}>
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.closeButton}
        onClick={() => navigate(-1)}
      >
        ✕
      </button>
      
      <h1 className={styles.title}>Choose location of the plant</h1>
      
      <div className={styles.locationGrid}>
        {uniqueRoots.map((root) => (
          <button 
            key={root} 
            className={styles.locationCard}
            onClick={() => setSelectedRoot(root)}
          >
            {root}
          </button>
        ))}
      </div>

      <button className={styles.continueButton}>
        Continue
      </button>
    </div>
  );
} 