// src/components/Header.js
import React , { useState }  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Create styles if needed

const Header = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm.trim()}`); // Navigate to search results page
    }
  };

  return (
    <header className="header">
      <h1 className="logo">NewsDaily</h1>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/world">World</a>
        <a href="/tech">Tech</a>
        <a href="/sports">Sports</a>
        <a href="/contactus">Contact</a>
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search"
          />
          <Button type="submit" className="search-button" variant="outline-success">Search</Button>
        </Form>
      </nav>
    </header>
  );
};

export default Header;
