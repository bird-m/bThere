import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './ShareSheet.css'
import { MdOutlineCancel } from 'react-icons/md'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { shareLink } from '../../util/util';

export default function ShareSheet({ formId, closeModal }) {

    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [timer, setTimer] = useState();

    async function handleCopyClick() {
        if (!showCopyMessage) {
            await navigator.clipboard.writeText(shareLink(formId));
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
            Share your invitation link with friends and let the responses roll in!
        </div>
        <div className="share-field">
            <div className="ss-share-link-wrapper">
                <div className="ss-share-link">
                    {showCopyMessage && <div className="copied-message">
                        Copied to clipboard!
                    </div>}
                    
                    <Link to={`/submit/${formId}`} target="_blank" rel="noopener noreferrer">
                    {shareLink(formId)}
                    </Link>
                </div>
                <div className="share-field-copy" onClick={handleCopyClick}>Copy</div>
            </div>
        </div>
    </div>;
}