import {Button} from "primereact/button";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../providers/AppContext";
import useProjectManager from "../hooks/ProjectManager";
import useRemotePlanner from "../hooks/RemotePlanner";


export function ParametersList() {
    const [parameters, setParameters] = useState({});

    const {selectedProject} = useContext(AppContext);

    const {updateParameters} = useProjectManager();
    const {sendParameters} = useRemotePlanner();

    const formRef = useRef(null);

    useEffect(() => {
        if (selectedProject?.parameters) {
            setParameters(selectedProject.parameters);
        }
    }, [selectedProject]);

    const handleResetParams = () => {
        if (selectedProject?.parameters) {
            setParameters(selectedProject.parameters);
        }
    }

    const handleSaveParams = () => {
        const form = Array.from(formRef.current.elements)
            .filter(inputEl => inputEl.tagName === "INPUT" && inputEl.type === "number")
            .reduce((acc, inputEl) => {
                if (inputEl.name) {
                    acc[inputEl.name] = parseFloat(inputEl.value) || 0;
                }
                return acc;
            }, {});

        console.log(form)

        updateParameters(selectedProject._id, form).then((project) => {
            sendParameters(project.parameters);
        });
    }

    const handleInputChange = (e) => {
        setParameters({...parameters, [e.target.name]: e.target.value});
    }

    return (
        <div className="parameters section">
            <div className="section-top">
                <p className={"label"}>Parameters</p>
                <Button icon="pi pi-replay" className={"reset-button primary-text"} text rounded
                        disabled={JSON.stringify(parameters) === JSON.stringify(selectedProject?.parameters)}
                        onClick={handleResetParams}/>
                <Button icon={"pi pi-save"} className={"save-button primary-text"} text rounded
                        onClick={handleSaveParams}/>
            </div>
            <form ref={formRef} className="section-content parameters-list">
                <div className="parameter">
                    <label htmlFor="stepLength">Step length</label>
                    <input type="number" id="stepLength" name="stepLength"
                           value={parameters?.stepLength}
                           onChange={handleInputChange}
                    />
                </div>
                <div className="parameter">
                    <label htmlFor="threshold">Threshold</label>
                    <input type="number" id="threshold" name="threshold"
                           value={parameters?.threshold}
                           onChange={handleInputChange}
                    />
                </div>
                <div className="parameter">
                    <label htmlFor="stayAway">Clearance</label>
                    <input type="number" id="stayAway" name="stayAway"
                           value={parameters?.stayAway}
                           onChange={handleInputChange}/>
                </div>
                <div className="parameter">
                    <label htmlFor="bias">Bias</label>
                    <input type="number" id="bias" name="bias"
                           value={parameters?.bias}
                           onChange={handleInputChange}/>
                </div>
                <div className="parameter">
                    <label htmlFor="MAX_OPTIMIZING_ITERATIONS">Optimization iterations</label>
                    <input type="number" id="MAX_OPTIMIZING_ITERATIONS" name="MAX_OPTIMIZING_ITERATIONS"
                           value={parameters?.MAX_OPTIMIZING_ITERATIONS}
                           onChange={handleInputChange}/>
                </div>
            </form>
        </div>
    )
}
