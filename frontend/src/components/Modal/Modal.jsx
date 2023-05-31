import { useEffect } from 'react';
import './Modal.css'

export default function Modal({content, closeModal}) {

    function handleClick(e) {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return (() => {document.body.style.overflow = '';})
    }, [])

    return (
        <div className="modal-background" onClick={(e) => {handleClick(e)}}>
            {content}
        </div>
    );
}