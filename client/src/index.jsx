import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';

import "primereact/resources/themes/lara-light-cyan/theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
            redirect_uri: `${window.location.origin}/callback`,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE
        }}
        onRedirectCallback={() => {}}
    >
        <App />
    </Auth0Provider>
);
