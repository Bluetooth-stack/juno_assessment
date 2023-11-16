import React, { useEffect, useState } from 'react';
import './style.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import SearchIcon from '@mui/icons-material/Search';
import PendingTable from '../Table/pendingTable';
import CompleteTable from '../Table/completeTable';
import Filters from '../Filters';
import Modal from '../Modal';

let triggerOptions = [];
let riskOptions = [];

function Monitoring() {
    const [pendingTab, setPendingTab] = useState(true);
    const [searched, setSearched] = useState('');
    const [triggerFilter, setTriggerFilter] = useState('');
    const [riskFilter, setRiskFilter] = useState('')
    const [pendingData, setPendingData] = useState([]);
    const [completedData, setCompletedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    async function getPending() {
        try {
            const resp = await fetch('./pendingData.json');
            const data = await resp.json();
            setPendingData(data)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function getCompleted() {
        try {
            const resp = await fetch('./completeData.json');
            const data = await resp.json();
            setCompletedData(data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPending();
        getCompleted();
    }, [])

    useEffect(() => {
        if (pendingTab) {
            const tempTrigger = []
            const tempRisk = []
            tempTrigger.push('Trigger reason')
            tempRisk.push('Risk level')
            pendingData.map((dataObj) => (
                tempTrigger.push(dataObj.triggerReason)
            ))
            pendingData.map((dataObj) => (
                tempRisk.push(dataObj.riskLevel)
            ))
            triggerOptions = [...new Set(tempTrigger)];
            riskOptions = [...new Set(tempRisk)];
        }
        if (!pendingTab) {
            const tempTrigger = []
            const tempRisk = []
            tempTrigger.push('Action reason')
            tempRisk.push('Risk level')
            completedData.map((dataObj) => (
                tempTrigger.push(dataObj.actionReason)
            ))
            completedData.map((dataObj) => (
                tempRisk.push(dataObj.riskLevel)
            ))
            triggerOptions = [...new Set(tempTrigger)];
            riskOptions = [...new Set(tempRisk)];
        }
        return () => {
            triggerOptions = []
            riskOptions = []
        }
    }, [pendingTab, pendingData, completedData])

    useEffect(() => {
        if (pendingTab) {
            if (searched) {
                const filtered = pendingData.filter((dataObj) => (
                    dataObj.user.name.includes(searched) || dataObj.user.mail.includes(searched)
                ))
                setFilteredData(filtered);
            }
            if (riskFilter) {
                const filtered = pendingData.filter((dataObj) => (
                    dataObj.riskLevel.toLowerCase() === riskFilter.toLowerCase()
                ))
                setFilteredData(filtered)
            }
            if (triggerFilter) {
                const filtered = pendingData.filter((dataObj) => (
                    dataObj.triggerReason.toLowerCase() === triggerFilter.toLowerCase()
                ))
                setFilteredData(filtered)
            }
        }
        if (!pendingTab) {
            if (searched) {
                const filtered = completedData.filter((dataObj) => (
                    dataObj.user.name.includes(searched) || dataObj.user.mail.includes(searched)
                ))
                setFilteredData(filtered);
            }
            if (riskFilter) {
                const filtered = completedData.filter((dataObj) => (
                    dataObj.riskLevel.toLowerCase() === riskFilter.toLowerCase()
                ))
                setFilteredData(filtered)
            }
            if (triggerFilter) {
                const filtered = completedData.filter((dataObj) => (
                    dataObj.actionReason.toLowerCase() === triggerFilter.toLowerCase()
                ))
                setFilteredData(filtered)
            }
        }
        if (!searched && !riskFilter && !triggerFilter) {
            setFilteredData([]);
        }
    }, [pendingTab, searched, riskFilter, triggerFilter, pendingData, completedData])

    return (
        <div className="monitor">
            <h1>Monitoring</h1>

            <div className='tabsContainer'>
                <div className='tabs'>
                    <p className={pendingTab ? 'selected' : ''} onClick={() => { setPendingTab(true) }}>Pending</p>
                    <p className={!pendingTab ? 'selected' : ''} onClick={() => { setPendingTab(false) }}>Completed</p>
                </div>
                <div className='closeAccountButton' onClick={()=>{setShowModal(true)}}>
                    <HighlightOffIcon className='closeIcon' />
                    <p>Close account</p>
                </div>
            </div>

            <Filters
                searched={searched} setSearched={setSearched} setTriggerFilter={setTriggerFilter} setRiskFilter={setRiskFilter} triggerOptions={triggerOptions} riskOptions={riskOptions}
            />

            {
                pendingTab ?
                    pendingData.length && <PendingTable data={filteredData.length ? filteredData : pendingData} />
                    :
                    completedData.length && <CompleteTable data={filteredData.length ? filteredData : completedData} />
            }

            {
                showModal &&
                <Modal setShow={setShowModal} />
            }
        </div>
    )
}

export default Monitoring