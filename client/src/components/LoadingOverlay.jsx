import {ProgressSpinner} from "primereact/progressspinner";

export default function LoadingOverlay() {
    return (
        <div className='loading-overlay'>
            <ProgressSpinner fill="var(--primary)" />
        </div>
    )
}