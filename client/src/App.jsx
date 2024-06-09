import 'primeicons/primeicons.css';
import './style/css/font.css'
import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import {Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import CallbackPage from "./pages/CallbackPage";

import AuthenticationGuard from "./components/AuthenticationGuard";
import ThemeContextProvider from "./providers/AppContext";


function App() {
    return (
        <ThemeContextProvider>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/*" element={<NotFound/>}/>

                <Route path="/callback/*" element={<CallbackPage/>}/>
                <Route path="/profile/*" element={<AuthenticationGuard component={Profile}/>}/>
                <Route path="/dashboard/*" element={<AuthenticationGuard component={Dashboard}/>}/>
                <Route path="/map/*" element={<AuthenticationGuard component={Map}/>}/>
            </Routes>
            </ThemeContextProvider>
    );
}

export default App;