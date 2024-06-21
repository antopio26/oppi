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
import AppContextProvider from "./providers/AppContext";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useRef} from "react";


function App() {
    const {getAccessTokenSilently} = useAuth0();
    const toastRef = useRef(null);

    useEffect(() => {
        axios.interceptors.request.use(async function (config) {
            config.headers.Authorization = "Bearer " + await getAccessTokenSilently();
            return config;
        });
        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: error.response.data.message
            });
            return Promise.reject(error);
        });
    }, []);
    return (
        <AppContextProvider additionalStates={{toastRef}}>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/*" element={<NotFound/>}/>

                <Route path="/callback/*" element={<CallbackPage/>}/>
                <Route path="/profile/*" element={<AuthenticationGuard component={Profile}/>}/>
                <Route path="/dashboard/*" element={<AuthenticationGuard component={Dashboard}/>}/>
                <Route path="/map/*" element={<AuthenticationGuard component={Map}/>}/>
            </Routes>
        </AppContextProvider>
    );
}

export default App;