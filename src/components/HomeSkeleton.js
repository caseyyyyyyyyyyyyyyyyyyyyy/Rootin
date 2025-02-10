const HomeSkeleton = () => {
  return (
    <div className="home skeleton">
      {/* 헤더 섹션 스켈레톤 */}
      <header className="home-header">
        <div className="skeleton-box" style={{width: '120px', height: '32px'}}></div>
        <div className="skeleton-box" style={{width: '32px', height: '32px', borderRadius: '50%'}}></div>
      </header>

      {/* 식물 그리드 스켈레톤 */}
      <div className="plant-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="plant-card skeleton-box">
            <div className="plant-image skeleton-box"></div>
            <div className="plant-info">
              <div className="skeleton-box" style={{width: '60%', height: '24px', marginBottom: '4px'}}></div>
              <div className="skeleton-box" style={{width: '40%', height: '20px'}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton; 