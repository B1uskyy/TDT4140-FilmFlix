import "./ValueSelectorRangeTwovalued.css"
import ToggleableBox from "../toggleable_box/ToggleableBox";
import {useEffect, useState} from "react";



function ValueSelectorRangeTwovalued({stateChanger, filterName, min_max_array}) {

    const [minValue, setMinValue] = useState(min_max_array[0])
    const [maxValue, setMaxValue] = useState(min_max_array[1])

    const handleMinSliderEvent = (event) => {
        if (event.target.value > maxValue) {
            setMinValue(maxValue);
            event.preventDefault();
        }
        else{
            setMinValue(event.target.value)
        }
    }

    const handleMaxSliderEvent = (event) => {
        if (event.target.value < minValue) {
            setMaxValue(minValue);
            event.preventDefault();
        }
        else{
            setMaxValue(event.target.value)
        }
    }

    useEffect(() => {
        stateChanger([minValue, maxValue]);
    }, [minValue, maxValue]);

    const Filter_Logic = () => {
        return (
            <div class={"value-range-container"}>
                <div className={"value-range-input-container"}>
                    <div className={"value-range-input-header"}>Min</div>
                    <div className={"value-range-input-input"}>
                        <input
                            className={"value-range-input-number"}
                            type={"number"}
                            value={minValue}
                            onInput={handleMinSliderEvent} />
                        <input type="range"
                               className={"value-range-input-slidebar"}
                               min={min_max_array[0]}
                               max={min_max_array[1]}
                               value={minValue}
                               onInput={handleMinSliderEvent}/>
                    </div>
                </div>
                <div className={"value-range-input-container"}>
                    <div className={"value-range-input-header"}>Max</div>
                    <div className={"value-range-input-input"}>
                        <input
                            className={"value-range-input-number"}
                            type={"number"}
                            value={maxValue}
                            onChange={handleMaxSliderEvent} />
                        <input type="range"
                               className={"value-range-input-slidebar"}
                               min={min_max_array[0]}
                               max={min_max_array[1]}
                               value={maxValue}
                               onInput={handleMaxSliderEvent}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <ToggleableBox header={filterName} box_contents={Filter_Logic()}/>
    )
}

export default ValueSelectorRangeTwovalued;