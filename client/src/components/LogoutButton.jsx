import React from "react";

import { Button } from "primereact/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} label="Log Out" />
    );
};
