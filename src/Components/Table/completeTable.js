import React, { useEffect, useState } from 'react';
import './style.css';
import headingGenerator from './headingGenerator';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function CompleteTable({data}) {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        setHeadings(headingGenerator(data))
    }, [data])

    return (
        <table className='tableContainer'>
            <thead className='tableHead'>
                <tr key="" className='headRow'>
                    {
                        headings.map((heading, indx) => (
                            <th key={heading + indx}>{heading}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((userObj, indx) => (
                        <tr key={indx}>
                            <td className='userInfo'>
                                <div>
                                    <p className='name'>{userObj.user.name}</p>
                                    <p className='mail'>{userObj.user.mail}</p>
                                </div>
                                <OpenInNewIcon className='linkIcon' />
                            </td>
                            <td>
                                <div
                                    className={
                                        `risk ${userObj.riskLevel === 'High' ? 'high' : userObj.riskLevel === 'Low' ? 'low' : 'medium'}`
                                    }
                                >
                                    <div></div>
                                    <p>{userObj.riskLevel}</p>
                                </div>
                            </td>
                            <td><p>{userObj.actionReason}</p></td>
                            <td><p>{userObj.timeToClose}</p></td>
                            <td><p className='date'>{userObj.dateAddedOn}</p></td>
                            <td>
                                <p>{userObj.actionTakenBy.name}</p>
                                <p className='smallerDate date'>{userObj.actionTakenBy.mail}</p>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CompleteTable