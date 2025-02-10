import React from 'react';

const PlantDetailSkeleton = () => {
  return (
    <div className="plant-detail skeleton">
      {/* 헤더 섹션 스켈레톤 */}
      <header className="detail-header">
        <button className="back-button skeleton-box"></button>
      </header>

      <div className="detail-plant-info">
        <div className="skeleton-box" style={{width: '60%', height: '32px'}}></div>
        <div className="skeleton-box" style={{width: '40%', height: '24px', marginTop: '8px'}}></div>
        <div className="skeleton-box" style={{width: '30%', height: '24px', marginTop: '4px'}}></div>
      </div>

      {/* 이미지 스켈레톤 */}
      <div className="detail-plant-image skeleton-box"></div>

      {/* 액션 버튼 스켈레톤 */}
      <div className="action-buttons">
        <div className="skeleton-box" style={{width: '100px', height: '40px', borderRadius: '100px'}}></div>
        <div className="skeleton-box" style={{width: '200px', height: '40px', borderRadius: '100px'}}></div>
      </div>

      {/* Overall Tips 스켈레톤 */}
      <div className="overall-tips">
        <div className="skeleton-box" style={{width: '40%', height: '32px', marginBottom: '24px'}}></div>
        <div className="tip-boxes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="tip-box skeleton-box"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantDetailSkeleton; 