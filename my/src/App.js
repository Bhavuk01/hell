import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Demo from './components/Demo'; // Import Demo component
import Beta from './components/Beta'; // Import Beta component
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/beta" element={<Beta />} />
            </Routes>
        </Router>
    );
};

export default App;
