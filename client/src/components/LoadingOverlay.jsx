import {ProgressSpinner} from "primereact/progressspinner";

import '../style/css/LoadingOverlay.css';
import {Button} from "primereact/button";

export default function LoadingOverlay({message = 'Loading...', showCancel = true, cancelString = 'Cancel', onCancel}) {
    return (
        <div className='loading-overlay'>
            <div className="center">
                <ProgressSpinner strokeWidth="4" />
                <p className='loading-overlay-message'>{message}</p>
            </div>

            {showCancel && <Button className='loading-overlay-cancel' onClick={onCancel} text rounded>{cancelString}</Button>}
        </div>
    )
}