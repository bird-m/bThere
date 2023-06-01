import './ContactModifier.css'
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai'
import { deleteContact, deleteInvite, postInvite } from '../../store/contactReducer';
import TableRow from '../TableRow/TableRow';
import { useEffect, useState } from 'react';

export default function ContactModifier({ contact, form }) {

    const dispatch = useDispatch();
    let rowContent;


    if (form && form.restricted) {
        rowContent = [
            <input type="checkbox" checked={invited(contact)} onChange={handleInviteChange} />,
            contact.name,
            contact.email,
            <div className="contact-delete-icon" onClick={() => { dispatch(deleteContact(contact.id)) }}><AiFillDelete /></div>
        ]
    } else {
        rowContent = [
            contact.name,
            contact.email,
            <div className="contact-delete-icon" onClick={() => { dispatch(deleteContact(contact.id)) }}><AiFillDelete /></div>
        ]
    }


    function handleInviteChange(e) {

        if (e.target.checked) {
            const newInvite = {
                formId: form.id,
                contactId: contact.id
            }

            dispatch((postInvite(newInvite)))
        } else {
            dispatch(deleteInvite(contact))
        }
    }

    function invited(contact) {
        if (contact.formId) {
            return (contact.formId.toString() === form.id.toString())
        } else {
            return false
        }
    }

    return (
        <TableRow rowContent={rowContent} />
    )
}