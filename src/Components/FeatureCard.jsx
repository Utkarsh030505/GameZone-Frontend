import React from 'react';

const FeatureCard = ({ className, style, title }) => {
  return (
    <div className="col">
    <div className={`featurecard ${className}`} style={{
  ...style,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center"
}}
>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
      </div>
    </div>
    </div>
  );
};

export default FeatureCard;
