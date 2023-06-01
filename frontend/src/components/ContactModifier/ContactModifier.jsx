import './ContactModifier.css'
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai'
import { deleteContact, deleteInvite, postInvite } from '../../store/contactReducer';
import TableRow from '../TableRow/TableRow';

export default function ContactModifier({ contact, formId }) {

    const dispatch = useDispatch();

    function handleInviteChange(e) {

        if (e.target.checked) {
            const newInvite = {
                formId,
                contactId: contact.id
            }

            dispatch((postInvite(newInvite)))
        } else {
            dispatch(deleteInvite(contact))
        }
    }

    function invited(contact) {
        if (contact.formId) {
            return (contact.formId.toString() === formId.toString())
        } else {
            return false
        }
    }

    // <div onClick={() => { dispatch(deleteContact(contact.id)) }}><AiFillDelete /></div>
    // ,

    return (
        <TableRow rowContent={[
            <input type="checkbox" checked={invited(contact)} onChange={handleInviteChange} />,
            "name",
            contact.email,
            <div className="contact-delete-icon" onClick={() => { dispatch(deleteContact(contact.id)) }}><AiFillDelete /></div>
        ]}/>
    )
}