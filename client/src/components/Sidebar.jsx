import "../style/css/Sidebar.css";

import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


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
            <div className="top">
                <LogoutButton iconOnly text/>
                <Link to="/" className={"logo"}>OppI</Link>
            </div>
            <ul>
                <li><Link to="/profile">
                    <Button tooltip="Profile" tooltipOptions={{position: "bottom"}} icon="pi pi-user" className={pathname !== "/profile" && "p-button-text"}/>
                </Link></li>
                <li><Link to="/dashboard"><Button tooltip="Dashboard" tooltipOptions={{position: "bottom"}} icon="pi pi-chart-bar" className={pathname !== "/dashboard" && "p-button-text"}/></Link></li>
                <li><Link to="/map"><Button tooltip="Map" tooltipOptions={{position: "bottom"}} icon="pi pi-map" className={pathname !== "/map" && "p-button-text"}/></Link></li>
            </ul>

        </aside>
    );
}