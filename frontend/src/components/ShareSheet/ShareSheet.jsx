import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './ShareSheet.css'
import { MdOutlineCancel } from 'react-icons/md'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function ShareSheet({ form, closeModal }) {

    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [timer, setTimer] = useState();

    async function handleCopyClick() {
        if (!showCopyMessage) {
            await navigator.clipboard.writeText(window.location.origin + "/" + (form.customUrl ? form.customUrl : "hello"));
            setShowCopyMessage((prev) => (!prev));
        }
    }

    function handleClose() {
        closeModal();
    }

    return <div className="dlc-wrapper">
        <div className="closer-header">
            <span className='delete-cancel-icon' onClick={handleClose} ><MdOutlineCancel /></span>
        </div>
        <div className="dlc-text">
            Share this link with friends to have them fill out your form!
        </div>
        <div className="share-field">
            <div className="ss-share-link-wrapper">
                <div className="ss-share-link">
                    {showCopyMessage && <div className="copied-message">
                        Copied to clipboard!
                    </div>}
                    
                    <Link to={`/submit/${form?.id}`} target="_blank" rel="noopener noreferrer">
                    {window.location.origin + "/" + `submit/${form?.id}`}
                    </Link>
                </div>
                <div className="share-field-copy" onClick={handleCopyClick}>Copy</div>
            </div>
        </div>
    </div>;
}