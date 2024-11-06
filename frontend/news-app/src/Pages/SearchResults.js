// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './SearchResults.css';
import Header from '../Components/Header'

const SearchResults = () => {
  const { searchTerm } = useParams();
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      const API_KEY = '4bd47cc79f5146dfae3acfbc16c9b011'; // Replace with your actual NewsAPI key
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${API_KEY}`;

      try {
        const response = await axios.get(url);
        const filteredArticles = filterEmptyArticles(response.data.articles);
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const filterEmptyArticles = (articles) => {
    return articles.filter(
      (article) =>
        article.title && article.description && article.urlToImage
    );
  };

    const handleSearch = (searchTerm) => {
    fetchNews(searchTerm);
  };

  return (

    <div>
    <Header onSearch={handleSearch} />
    
 
    <Container className="searchNews-results-container">
      <h2>Search Results for "{searchTerm}"</h2>
      <Row>
        {articles.map((article, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card className="news-card" bg='dark'>
              <Card.Img variant="top" src={article.urlToImage} alt={article.title} />
              <Card.Body>
                <Card.Title className='text-light text-bold'>{article.title}</Card.Title>
                <Card.Text className='text-light'>
                  {article.description}
                </Card.Text>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Read More
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default SearchResults;
