import './FilterBlock.css';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import {BsSearch} from "react-icons/bs";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
function FilterBlock({stateChanger, filterName, filterAlternatives}){

    const [selected, setSelected] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        console.log(searchTerm)
    }, [searchTerm]);

    return (
        <div className="filter-container">
            <div className={"filter-selector-container"}>
                <div className={"filter-selector-header"} onClick={() => setIsHidden(!isHidden)}>
                    <h2>{filterName}</h2>
                    {isHidden ? <FaArrowDown/> : <FaArrowUp/>}
                </div>

                {!isHidden && (
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
                )}
            </div>
        </div>
    )
}
export default FilterBlock;