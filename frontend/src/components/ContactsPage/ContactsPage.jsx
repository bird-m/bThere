import { useEffect, useState } from 'react'
import './ContactsPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts, postContact, selectContacts } from '../../store/contactReducer';
import ContactPane from '../ContactPane/ContactPane';
import ContactModifier from '../ContactModifier/ContactModifier';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ContactEntry from '../ContactEntry/ContactEntry';
import Modal from '../Modal/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import TableRow from '../TableRow/TableRow';

export default function ContactsPage() {

    const { formId } = useParams();

    const [header, setHeader] = useState([])

    useEffect(() => {
        if (formId) {
            setHeader([
                "INVITED",
                "NAME",
                "EMAIL",
                "MODIFY"
            ])
        } else {
            setHeader([
                "NAME",
                "EMAIL",
                "MODIFY"
            ])
        }
    }, [formId])

    const dispatch = useDispatch();
    const [showContactModal, setShowContactModal] = useState(false);

    function closeContactModal() {
        setShowContactModal(false);
    }

    useEffect(() => {
        dispatch(fetchContacts(formId))
    }, [dispatch])

    const contacts = useSelector(selectContacts);


    return (
        <div className="contact-show">
            {showContactModal && <Modal closeModal={closeContactModal} content={<ContactEntry closeModal={closeContactModal} />} />}
            <div className="contacts-header">
                <div className="contacts-title">{formId ? "INVITES" : "CONTACTS"}</div>
                <button className='svg-button dark-grey' onClick={() => { setShowContactModal(true) }} ><AiOutlinePlusCircle /></button>
            </div>

            <TableRow rowContent={header} />

            {contacts.map((c) => {
                return (
                    <ContactModifier key={c.id} contact={c} formId={formId} />
                )
            })}
        </div>
    )
}