import './ContactModifier.css'
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai'
import { deleteContact, deleteInvite, postInvite } from '../../store/contactReducer';

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

    return (
        <div key={contact.id} className="contact-list-entry">
            {formId && <input type="checkbox" checked={invited(contact)} onChange={handleInviteChange} />}
            <span>{contact.email}</span>
            <div onClick={() => { dispatch(deleteContact(contact.id)) }}>
                <AiFillDelete />
            </div>
        </div>
    )
}