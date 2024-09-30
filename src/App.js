import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
//import { Route, Routes, Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
