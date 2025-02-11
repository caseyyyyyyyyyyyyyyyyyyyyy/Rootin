import React from 'react';
import styles from './PlantSearch.module.css';

function PlantSearchSkeleton() {
  return (
    <div className={styles.plantList}>
      {[...Array(6)].map((_, index) => (
        <div key={index} className={`${styles.plantItem} skeleton`}>
          <div 
            className="skeleton-box"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px'
            }}
          />
          <div className={styles.plantInfo}>
            <div 
              className="skeleton-box"
              style={{
                width: '70%',
                height: '24px',
                marginBottom: '8px'
              }}
            />
            <div 
              className="skeleton-box"
              style={{
                width: '40%',
                height: '20px'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlantSearchSkeleton; 