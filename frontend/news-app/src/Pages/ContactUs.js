import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Header from '../Components/Header';
import axios from 'axios';

const ContactUs = () => {

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
  
    const filterEmptyArticles = (articles) => {
      return articles.filter(
        (article) =>
          article.title && article.description && article.urlToImage
      );
    };
    
    const handleSearch = (searchTerm) => {
      fetchNews(searchTerm);
    };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://your-api-endpoint/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Your message has been submitted successfully!");
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("There was an error submitting your message.");
      });
  };

  return (
    <div>
 <Header onSearch={handleSearch} />
    <Container className="mt-4">
      <h1 className="text-center">Contact Us</h1>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMessage" className="mt-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={5}
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
    </div>
   
  );
};

export default ContactUs;
