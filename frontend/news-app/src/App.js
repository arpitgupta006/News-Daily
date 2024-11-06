import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Footer from './Components/Footer';
import SearchResults from './Pages/SearchResults';
import ContactUs from './Pages/ContactUs';
import WorldNews from './Pages/WorldNews';
import TechNews from './Pages/TechNews';
import SportsNews from './Pages/SportsNews';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/world" element={<WorldNews />} />
        <Route path="/tech" element={<TechNews />} />
        <Route path="/sports" element={<SportsNews />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;

//4bd47cc79f5146dfae3acfbc16c9b011  