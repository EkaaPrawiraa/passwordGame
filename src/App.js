// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextBox from './pages/Homepage';
import GameResultPage from './pages/GameResultPage';
import './App.css';
export default function App() {
    return (
      <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<TextBox />} />
                <Route path="/result" element={<GameResultPage />} />
            </Routes>
        </Router>
        </div>
    );
}
