// src/components/NewsCard.js
import React from 'react';
import './styles.css'; // Create styles if needed

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
    <img src={article.urlToImage} alt={article.title} className="news-image" />
    <div className="overlay-caption">
      <h3 className="news-title">{article.title}</h3>
      <p className="news-description">{article.description}</p>
    </div>
  </div>
  );
};

export default NewsCard;
