import "./ToggleableBox.css"
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {useState} from "react";

function ToggleableBox({header, box_contents}) {

    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className={"toggleable-box-container"}>
            <div className={"toggleable-box-contents"}>
                <div className={"toggleable-box-header"} onClick={() => setIsHidden(!isHidden)}>
                    <h2>{header}</h2>
                    {isHidden ? <FaArrowDown/> : <FaArrowUp/>}
                </div>

                {!isHidden && (box_contents)}
        </div>
        </div>
    )
}

export default ToggleableBox;