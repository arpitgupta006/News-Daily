import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Header from '../Components/Header'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WorldNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useParams();

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
    const fetchWorldNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=general&language=en&pageSize=12&apiKey=4bd47cc79f5146dfae3acfbc16c9b011`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          throw new Error(data.message || "Something went wrong");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorldNews();
  }, []);

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
 <Container className="mt-4">
      <h1 className="text-center">World News</h1>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Row>
          {articles.map((article, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={article.urlToImage || "https://via.placeholder.com/150"}
                  alt={article.title}
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>
                    {article.description
                      ? article.description.substring(0, 100) + "..."
                      : "No description available."}
                  </Card.Text>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Read More
                  </a>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Published at: {new Date(article.publishedAt).toLocaleString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
    </div>
   
  );
};

export default WorldNews;
