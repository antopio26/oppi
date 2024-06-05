import React from "react";

import {Button} from 'primereact/button';
import {useAuth0} from "@auth0/auth0-react";

export default function LoginButton({iconOnly = false, text = false, rounded = false})
{
    const {loginWithRedirect} = useAuth0();

    return (
        <Button onClick={() => loginWithRedirect()} label={!iconOnly && "Log In"} text={text} rounded={rounded} className={"login-button"}/>
    )
}
