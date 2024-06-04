import React from 'react';

import { Route, Routes, Link } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import CallbackPage from "./pages/CallbackPage";

import AuthenticationGuard from "./components/AuthenticationGuard";

import Sidebar from "./components/Sidebar";

import './App.css';


function App() {

    return (
        <>
            <Sidebar visible={true} onHide={()=>{}}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/map">Map</Link></li>
                </ul>
            </Sidebar>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/*" element={<NotFound/>}/>

                <Route path="/callback" element={<CallbackPage/>}/>
                <Route path="/profile" element={<AuthenticationGuard component={Profile}/>}/>
                <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard}/>}/>
                <Route path="/map" element={<AuthenticationGuard component={Map}/>}/>
            </Routes>
        </>
    );
}

export default App;