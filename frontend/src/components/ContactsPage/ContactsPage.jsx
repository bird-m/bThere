import { useEffect, useState } from 'react'
import './ContactsPage.css'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts, postContact, selectContacts } from '../../store/contactReducer';
import ContactPane from '../CreationPane/ContactPane';
import ContactModifier from '../ContactModifier/ContactModifier';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function ContactsPage () {

    const {formId} = useParams();

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    useEffect(() => {
        dispatch(fetchContacts(formId))
    }, [dispatch])

    const contacts = useSelector(selectContacts);

    function handleContactCreate (e) {
        e.preventDefault();
        const newContact = {contact: {
            email
        }}

        dispatch(postContact(newContact));
        setEmail("");
    }

    // console.log()
    return (
        <div className="contact-show">
            <form className="contact-entry" onSubmit={(e) => {handleContactCreate(e)}}>
                <label htmlFor='contact-email'>Add new contact</label>
                <input placeholder='contact email' type="email" required htmlFor='contact-email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <button className='svg-button dark-grey'><AiOutlinePlusCircle/></button>
                
            </form>
            <div className="contacts-header">
                {contacts ? "CONTACTS" : ""}
            </div>
            {contacts.map((c) => {
                return (
                    <ContactModifier key={c.id} contact={c} formId={formId}/>

                )
            })}
        </div>
    )
}