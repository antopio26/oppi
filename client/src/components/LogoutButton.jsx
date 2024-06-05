import React from "react";

import { Button } from "primereact/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton({ iconOnly = false, text}) {
    const { logout } = useAuth0();

    return (
        <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} label={!iconOnly && "Log Out"} icon="pi pi-sign-out" severity={"danger"} text className={"logout-button"} />
    );
};
