import React from 'react';
import './style.css';
import SearchIcon from '@mui/icons-material/Search';

function Filters({ searched, setSearched, setTriggerFilter, setRiskFilter, triggerOptions, riskOptions }) {
    return (
        <div className='filters'>
            <div className='searchBox'>
                <SearchIcon className='searchIcon' />
                <input type="text" value={searched} placeholder='Search' onChange={(e) => { setSearched(e.target.value) }} />
            </div>
            <select
                defaultValue={""}
                onChange={(e) => { setTriggerFilter(e.target.value) }}
            >
                <option value="" key="reasons">{triggerOptions[0]}</option>
                {
                    triggerOptions.map((opt, indx)=>(
                        indx!==0&&
                        <option value={opt} key={'reasons'+indx}>{opt}</option>
                    ))
                }
            </select>
            <select
                defaultValue={""}
                onChange={(e) => { setRiskFilter(e.target.value) }}
            >
                <option value="" key="risks">{riskOptions[0]}</option>
                {
                    riskOptions.map((opt, indx)=>(
                        indx!==0&&
                        <option value={opt} key={'risk'+indx}>{opt}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Filters