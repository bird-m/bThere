import { useEffect, useState } from 'react'
import './ContactsPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts, postContact, selectContacts } from '../../store/contactReducer';
import ContactPane from '../CreationPane/ContactPane';
import ContactModifier from '../ContactModifier/ContactModifier';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ContactEntry from '../ContactEntry/ContactEntry';
import Modal from '../Modal/Modal';

export default function ContactsPage () {

    const {formId} = useParams();

    const dispatch = useDispatch();
    const [showContactModal, setShowContactModal] = useState(true);

    function closeContactModal() {
        setShowContactModal(false);
    }

    useEffect(() => {
        dispatch(fetchContacts(formId))
    }, [dispatch])

    const contacts = useSelector(selectContacts);

    
    return (
        <div className="contact-show">            
            {showContactModal && <Modal closeModal={closeContactModal} content={<ContactEntry closeModal={closeContactModal}/>}/>}
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