import { useState } from 'react';
import './ContactEntry.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { postContact } from '../../store/contactReducer';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function ContactEntry({closeModal}) {

    const { formId } = useParams();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [invited, setInvited] = useState(false);

    const dispatch = useDispatch();

    function handleContactCreate(e) {
        e.preventDefault();
        const newContact = {
            contact: {
                email
            }
        }

        dispatch(postContact(newContact)).then(() => {
            closeModal && closeModal();
        });
        setEmail("");
    }

    function handleInvite(e) {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            setInvited(e.target.checked);
        }
    }


    return (
        <div className="contact-entry">
            <form className='contact-form' onSubmit={(e) => { handleContactCreate(e) }}>
                <div className="contact-field">
                    <label htmlFor=''>NAME</label>
                    <input required value={name} onChange={(e) => { setName(e.target.value) }} />

                </div>

                <div className="contact-field">
                    <label htmlFor='contact-email'>EMAIL</label>
                    <input type="email" required htmlFor='contact-email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                {formId &&
                    <div className="invited-check-wrapper">
                        <input htmlFor="ce-invited" type='checkbox' checked={invited} onChange={(e) => { handleInvite(e) }} />
                        <label>INVITED</label>
                    </div>}

                <button>ADD CONTACT</button>
            </form>
        </div>
    );
}