import "../style/css/Sidebar.css";

import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

import {Button} from "primereact/button";

export default function Sidebar() {
    const { isAuthenticated } = useAuth0();
    const location = useLocation();
    const [pathname, setPathname] = useState( location.pathname );

    useEffect(() => {
        setPathname(location.pathname);
    }, [location.pathname]);

    return (
        <aside>
            <ul>
                <li><Link to="/"><Button label="Home" icon="pi pi-home" className={pathname !== "/" && "p-button-text"}/></Link></li>
                <li><Link to="/profile"><Button label="Profile" icon="pi pi-user" className={pathname !== "/profile" && "p-button-text"}/></Link></li>
                <li><Link to="/dashboard"><Button label="Dashboard" icon="pi pi-chart-bar" className={pathname !== "/dashboard" && "p-button-text"}/></Link></li>
                <li><Link to="/map"><Button label="Map" icon="pi pi-map" className={pathname !== "/map" && "p-button-text"}/></Link></li>
            </ul>

            {isAuthenticated ? <LogoutButton/> : <LoginButton/>}

        </aside>
    );
}