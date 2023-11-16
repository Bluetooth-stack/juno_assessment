import React from 'react';
import './style.css';
import elon from '../../Assets/Elon-Musk.jpg'

function SideBar() {
    return (
        <>
            <div className='dummy'></div>
            <div className='sideBar'>
                <div className='linkContainer'>
                    <h1 className='logo'>LOGO HERE</h1>
                    <ul>
                        <li>Overview</li>
                        <li>Onboarding</li>
                        <li className='active'>Monitoring</li>
                        <li>Flagging</li>
                        <li>Source of Income</li>
                        <li>UAR</li>
                    </ul>
                </div>

                <div className='user'>
                    <img src={elon} alt="user" />
                    <div className='userNameContainer'>
                        <h4>Elon Musk</h4>
                        <p>elon@twitter.com</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar