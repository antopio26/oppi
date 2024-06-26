import {Button} from "primereact/button";



export default function MapsList() {
    const handleResetMapFilter = () => {
        document.querySelectorAll("input[name='map']:checked").forEach((input) => {
            input.checked = false;
        });
    }

    return (
        <div className={"section"}>
            <div className="section-top">
                <p className={"label"}>Maps</p>
            <Button icon="pi pi-undo" className={"reset-button"} text rounded
                    onClick={handleResetMapFilter}/>
            </div>
            <div className="section-content">
                <ul>
                    {
                        [1, 2, 3, 4].map((map, i) => (
                            <li key={i}>
                                <label htmlFor={"id" + i}>
                                    Map {i}
                                </label>
                                <input type="checkbox" name={"map"} value={"id" + i} hidden id={"id" + i}/>
                            </li>
                        ))
                    }

                </ul>
            </div>

        </div>
    )
}