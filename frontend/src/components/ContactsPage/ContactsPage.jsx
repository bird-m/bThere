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
import { fetchForm, selectForm } from '../../store/formReducer';

export default function ContactsPage() {

    const { formId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if(formId) {
            dispatch(fetchForm(formId))
        }

        dispatch(fetchContacts(formId))

    }, [dispatch, formId])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const form = useSelector(selectForm(formId));
    const contacts = useSelector(selectContacts);

    const [header, setHeader] = useState([])

    useEffect(() => {
        if (form && form.restricted) {
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
    }, [form])

    const [showContactModal, setShowContactModal] = useState(false);

    function closeContactModal() {
        setShowContactModal(false);
    }

    if((formId && !form) || !contacts) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="contact-show" style={{paddingTop: !formId && "50px"}}>
            {showContactModal && <Modal closeModal={closeContactModal} content={<ContactEntry closeModal={closeContactModal} />} />}
            <div className="contacts-header">
                <div className="contacts-title">{formId ? "INVITES" : "CONTACTS"}</div>
                <button className='svg-button dark-grey' onClick={() => { setShowContactModal(true) }} ><AiOutlinePlusCircle /></button>
            </div>

            <TableRow rowContent={header} />

            {contacts.map((c) => {
                return (
                    <ContactModifier key={c.id} contact={c} form={form} />
                )
            })}
        </div>
    )
}