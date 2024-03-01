import './ValueSelectorMultivalue.css';
import {useEffect, useState} from "react";
import {BsSearch} from "react-icons/bs";
import ToggleableBox from "../toggleable_box/ToggleableBox";
function ValueSelectorMultivalue({stateChanger, filterName, filterAlternatives}){

    const [selected, setSelected] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        console.log(searchTerm)
    }, [searchTerm]);

    const Filter_Logic = () => {
        return (
            <div>
                <div className={"filter-search-bar"}>
                    <BsSearch className={"filter-search-icon"}/>
                    <input className={"filter-search-input"} type="text" placeholder="Search..." onChange={(event) => setSearchTerm(event.target.value)}/>
                </div>
                <div className="filter-checkbox-container">
                    {filterAlternatives.map((filter, index) => (

                        <div key={index}
                             className={
                                 (selected === filter ? "filter-checkbox-selected " : "")
                                 + (searchTerm !== "" && !filter.toLowerCase().includes(searchTerm.toLowerCase()) ? "filter-checkbox-hidden " : "")
                                 + "filter-checkbox "}
                             onClick={
                                 () => {
                                     if (selected === filter){
                                         setSelected(null);
                                         stateChanger(null);
                                     }
                                     else {
                                         setSelected(filter);
                                         stateChanger(filter);
                                     }
                                 }
                             }>
                            {filter}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <ToggleableBox header={filterName} box_contents={Filter_Logic()}/>
    )
}
export default ValueSelectorMultivalue;