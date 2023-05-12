import { useEffect, useState } from 'react'
import './ContactsPage.css'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts, postContact, selectContacts } from '../../store/contactReducer';
import {AiFillDelete} from 'react-icons/ai'

export default function ContactsPage () {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    const contacts = useSelector(selectContacts);

    function handleContactCreate () {
        const newContact = {contact: {
            email
        }}

        dispatch(postContact(newContact));
        setEmail("");
    }

    function handleContactDelete(contactId) {
        dispatch(deleteContact(contactId));
    }

    // console.log()
    return (
        <div className="contact-show">
            <div className="contact-entry">
                <label htmlFor='contact-email'>Add new contact</label>
                <input placeholder='contact email' type="text" htmlFor='contact-email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <div onClick={handleContactCreate}><AiOutlinePlusCircle/></div>
                
            </div>
            <div className="contacts-header">
                {contacts ? "CONTACTS" : ""}
            </div>
            {contacts.map((c) => {
                return (
                    <div key={c.id} className="contact-list-entry">
                        <div data-contact-id={c.id} onClick={() => {handleContactDelete(c.id)}}>
                            <AiFillDelete/>
                        </div>
                        <span>{c.email}</span>
                    </div>
                )
            })}
        </div>
    )
}