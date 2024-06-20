import {Button} from "primereact/button";

export function ParametersList() {

    const handleResetParams = () => {
    }

    return (
        <div className="parameters section">
            <div className="section-top">
                <p className={"label"}>Parameters</p>
                <Button icon="pi pi-replay" className={"reset-button primary-text"} text rounded
                        onClick={handleResetParams}/>
            </div>
            <div className="section-content parameters-list">
                <div className="parameter">
                    <label htmlFor="parameter1">Step length</label>
                    <input type="number" id="parameter1"/>
                </div>
                <div className="parameter">
                    <label htmlFor="parameter2">Threshold</label>
                    <input type="number" id="parameter2"/>
                </div>
                <div className="parameter">
                    <label htmlFor="parameter3">Clearance</label>
                    <input type="number" id="parameter3"/>
                </div>
                <div className="parameter">
                    <label htmlFor="parameter4">Bias</label>
                    <input type="number" id="parameter4"/>
                </div>
                <div className="parameter">
                    <label htmlFor="parameter5">Optimization iterations</label>
                    <input type="number" id="parameter5"/>
                </div>
            </div>
        </div>
    )
}