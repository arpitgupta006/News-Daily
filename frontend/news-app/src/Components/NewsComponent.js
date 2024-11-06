// src/components/NewsComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap'; 
import NewsCard from './NewsCard';
import './styles.css'; // Include your styles if needed
import Header from './Header';

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);

  const fetchNews = async (searchTerm = '') => {
    const API_KEY = '4bd47cc79f5146dfae3acfbc16c9b011'; // Replace with your actual NewsAPI key
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    if (searchTerm) {
      // Update URL for search query
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        searchTerm
      )}&apiKey=${API_KEY}`;
    }

    try {
      const response = await axios.get(url);
      const filteredArticles = filterEmptyArticles(response.data.articles); // Filter articles
      setArticles(filteredArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // Helper function to filter out empty articles
  const filterEmptyArticles = (articles) => {
    return articles.filter(
      (article) =>
        article.title && // Ensure there is a title
        article.description && // Ensure there is a description
        article.urlToImage // Ensure there is an image URL
    );
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (searchTerm) => {
    fetchNews(searchTerm);
  };

  return (
    <div className="news-carousel-container"> 
    <Header onSearch={handleSearch} />
      <Carousel controls={true} indicators={true} className="news-carousel">
        {articles.map((article, index) => (
          <Carousel.Item key={index} className="carousel-item-fullwidth">
            <NewsCard article={article} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default NewsComponent;
