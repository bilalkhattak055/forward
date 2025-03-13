import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import './stle.css';

const DefectPanelsCard = () => {
  const [activeCategory, setActiveCategory] = useState('Printing');
  
  const categories = [
    { name: 'Printing', value: '90' },
    { name: 'Material', value: '10' },
    { name: 'Touching', value: '00' },
    { name: 'Cutting', value: '02' }
  ];
  
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };
  
  return (
    <Card className="defect-card">
      <CardBody className="defect-card-body">
        <div className="defect-header">
          <div className="defect-title">
            <span className="defect-arrow">▸</span> Total Defected Panels
          </div>
          <div className="defect-icon-container">
            <div className="defect-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2Z" fill="#13A94E"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="defect-total">110</div>
        
        <div className="defect-categories">
          {categories.map((category, index) => (
            <div 
              key={category.name} 
              className="defect-category-row"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="defect-category-left">
                <div className={`defect-dot ${activeCategory === category.name ? 'active' : ''}`}></div>
                <div className={`defect-vertical-line ${index === categories.length - 1 ? 'last' : ''}`}></div>
                <div className={`defect-category-name ${activeCategory === category.name ? 'active' : ''}`}>
                  {category.name}
                </div>
              </div>
              <div className="defect-category-value">{category.value}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default DefectPanelsCard;