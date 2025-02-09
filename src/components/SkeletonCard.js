import React from 'react';

function SkeletonCard() {
  return (
    <div className="plant-card skeleton">
      <div className="plant-image skeleton-image">
        <div className="skeleton-status" />
      </div>
      <div className="plant-info">
        <div className="skeleton-title" />
        <div className="skeleton-text" />
        <div className="skeleton-text" />
      </div>
    </div>
  );
}

export default SkeletonCard; 