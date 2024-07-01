import 'primeicons/primeicons.css';
import './style/css/font.css'
import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import {Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Paths from './pages/Paths';
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import CallbackPage from "./pages/CallbackPage";

import AuthenticationGuard from "./components/AuthenticationGuard";
import AppContextProvider, {AppContext} from "./providers/AppContext";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {useContext, useEffect, useRef} from "react";
import useMapManager from "./hooks/MapManager";
import useProjectManager from "./hooks/ProjectManager";
import FetchingLayer from "./components/FetchingLayer";
import ProjectContextProvider from "./providers/ProjectContext";


function App() {
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();
    const toastRef = useRef(null);
    // const {getMaps} = useMapManager();
    // const {getProjects} = useProjectManager();

    useEffect(() => {
        axios.interceptors.request.use(async function (config) {
            config.headers.Authorization = "Bearer " + await getAccessTokenSilently();
            return config;
        });
        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (toastRef.current) {
                toastRef.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: error.response.data.message
                });
            }
            return Promise.reject(error);
        });
    }, []);

    return (
        <AppContextProvider additionalStates={{toastRef}}>
            <ProjectContextProvider>
                <FetchingLayer>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/*" element={<NotFound/>}/>

                        <Route path="/callback/*" element={<CallbackPage/>}/>
                        <Route path="/paths/*" element={<AuthenticationGuard component={Paths}/>}/>
                        <Route path="/dashboard/*" element={<AuthenticationGuard component={Dashboard}/>}/>
                        <Route path="/map/*" element={<AuthenticationGuard component={Map}/>}/>
                    </Routes>
                </FetchingLayer>
            </ProjectContextProvider>
        </AppContextProvider>
    );
}

export default App;