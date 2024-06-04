import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CallbackPage () {
    const navigate = useNavigate();

    useEffect(() => {
        // Recover appState from callback URL, state is passed as a query parameter and it is base64 encoded
        const params = new URLSearchParams(window.location.search);
        const state = params.get('state');


        console.log("state: ", state);


        // navigate(returnTo);
    }, [navigate]);

    return null; // Render nothing or a loading spinner
};

