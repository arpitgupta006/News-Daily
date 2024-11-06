import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Img from '../Components/educationp.jpg';
import NewsComponent from "../Components/NewsComponent";


const Homepage = () => {

  const [topNews, setTopNews] = useState([])

  const getNews = async () => {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=4bd47cc79f5146dfae3acfbc16c9b011');

    if (response.status === 200) {
        setTopNews(response.data.articles);
    } else {
        
    }
}
useEffect(() => {
  getNews()
}, []);
  return (
    <div className="App">
  
    <main>
     <NewsComponent/>
    </main>
  
  </div>
  )
}

export default Homepage