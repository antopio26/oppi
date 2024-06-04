import React from 'react';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/map">Map</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/map" element={<Map/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;