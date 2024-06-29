import App from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react';
import {useNavigate, BrowserRouter} from 'react-router-dom';
import AppContextProvider from "./providers/AppContext";

const Auth0ProviderWithRedirectCallback = ({children, ...props}) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState) => {
        navigate((appState && appState.returnTo) || (window.location.pathname !== "/callback" ? window.location.pathname : "/"));
    };

    return (
        <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
            {children}
        </Auth0Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithRedirectCallback
                domain={process.env.REACT_APP_AUTH0_DOMAIN}
                clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: `${window.location.origin}/callback`,
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE
                }}
            >
                <AppContextProvider>
                    <App/>
                </AppContextProvider>
            </Auth0ProviderWithRedirectCallback>
        </BrowserRouter>
    </React.StrictMode>
);
