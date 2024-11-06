// src/components/Footer.js
import React, { useEffect, useState } from 'react';
import './styles.css'; // Create styles if needed
import { Container } from 'react-bootstrap';


const Footer = () => {



  return (

    <div>
    
    <footer className="footer bg-dark text-white">
    <Container className="text-center">
      <span>© 2024 NewsDaily | All rights reserved.</span>
    </Container>
  </footer>
  </div>
  );
};

export default Footer;
