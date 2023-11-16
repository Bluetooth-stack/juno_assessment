import React, { useEffect, useState } from 'react';
import './style.css';
import CloseIcon from '@mui/icons-material/Close';

function Modal({ setShow }) {
    const [filled, setFilled] = useState(false);
    const [mail, setMail] = useState('')
    const [UAR, setUAR] = useState('')
    const [reason, setReason] = useState('')
    const [note, setNote] = useState('')
    const [closureFee, setClosureFee] = useState('')

    useEffect(() => {
        if (mail && UAR && reason && note && closureFee) {
            setFilled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UAR, closureFee])

    return (
        <div className='modalHolder' onClick={(e) => { e.stopPropagation(); setShow(false) }}>
            <div className='modal' onClick={(e) => { e.stopPropagation() }}>
                <h4>Close account</h4>

                <CloseIcon className='modalCloseIcon' onClick={() => { setShow(false) }} />

                <label htmlFor='mail'>Email*</label>
                <input type="email" id='mail' onChange={(e) => { setMail(e.target.value) }} />

                <div className='radioBtnHolder'>
                    <p>Want to file UAR*</p>
                    <div>
                        <input type="radio" name='UAR' value='yes' id='yes' onChange={(e) => { setUAR(e.target.value) }} /><label htmlFor='yes'>Yes</label>
                        <input type="radio" name='UAR' value='no' id='no' onChange={(e) => { setUAR(e.target.value) }} /><label htmlFor='no'>No</label>
                    </div>
                </div>

                <label htmlFor='reason'>Reason*</label>
                <input type="text" id='reason' onChange={(e) => { setReason(e.target.value) }} />

                <label htmlFor='note'>Note*</label>
                <textarea cols="10" rows="3" id='note' onChange={(e) => { setNote(e.target.value) }}></textarea>

                <div className='bottomButton'>
                    <div>
                        <input type="radio" id='closureFee' value='yes' onChange={(e) => { setClosureFee(e.target.value) }} />
                        <label htmlFor='closureFee'>Charge closure fee</label>
                    </div>
                    <button disabled={!filled} className={!filled ? 'disabled' : ''} onClick={() => { setShow(false) }}>Close account</button>
                </div>
            </div>
        </div>
    )
}

export default Modal