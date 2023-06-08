import { Link, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './ShareSheet.css'
import { MdOutlineCancel } from 'react-icons/md'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { shareLink } from '../../util/util';

export default function ShareSheet({ formId, closeModal }) {

    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [timer, setTimer] = useState();
    const [properFormId, setProperFormId] = useState();

    const paramsFormId = useParams().formId;

    useEffect(() => {
        setProperFormId(formId || paramsFormId);
    }, [formId, paramsFormId])

    async function handleCopyClick() {
        if (!showCopyMessage) {
            await navigator.clipboard.writeText(shareLink(properFormId));
            setShowCopyMessage((prev) => (!prev));
        }
    }

    function handleClose() {
        closeModal();
    }

    return <div className="dlc-wrapper">
        {closeModal &&
        <div className="closer-header">
            <span className='delete-cancel-icon' onClick={handleClose} ><MdOutlineCancel /></span>
        </div>}
        <div className="dlc-text">
            Copy and paste this link into your favorite messaging client, hit send, and let the responses roll in!
        </div>
        <div className="share-field">
            <div className="ss-share-link-wrapper">
                <div className="ss-share-link">
                    {showCopyMessage && <div className="copied-message">
                        Copied to clipboard!
                    </div>}
                    
                    <Link to={`/submit/${properFormId}`} target="_blank" rel="noopener noreferrer">
                    {shareLink(properFormId)}
                    </Link>
                </div>
                <div className="share-field-copy" onClick={handleCopyClick}>Copy</div>
            </div>
        </div>
    </div>;
}