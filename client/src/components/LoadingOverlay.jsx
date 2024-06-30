import {ProgressSpinner} from "primereact/progressspinner";

import '../style/css/LoadingOverlay.css';

export default function LoadingOverlay() {
    return (
        <div className='loading-overlay'>
            <ProgressSpinner />
        </div>
    )
}