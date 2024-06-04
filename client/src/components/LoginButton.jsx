import React from "react";

import { Button } from 'primereact/button';
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button onClick={() => loginWithRedirect()} label="Log In" />
    )
}
