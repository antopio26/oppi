import React from "react";

import {withAuthenticationRequired, useAuth0} from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

export default function AuthenticationGuard({component}) {
    const {getAccessTokenSilently} = useAuth0();
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <PageLoader/>
    });

    return <Component/>;
}