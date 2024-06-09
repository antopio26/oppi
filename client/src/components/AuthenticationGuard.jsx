import React from "react";

import {withAuthenticationRequired} from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

export default function AuthenticationGuard({component}) {

    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <PageLoader/>
        )
    });

    return <Component/>;
}