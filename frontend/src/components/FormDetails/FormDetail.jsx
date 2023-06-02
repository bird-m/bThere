
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FormDetail.css'
import {AiFillDelete} from 'react-icons/ai'
import {MdModeEdit} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import {TbShare2} from 'react-icons/tb'
import { useState } from 'react';
import Modal from '../Modal/Modal'
import DeletFormConfirmation from '../DeleteFormConfirmation/DeleteFormConfirmation';
import ShareSheet from '../ShareSheet/ShareSheet';
import Switch from 'react-switch';

// MdModeEdit

export default function FormDetail ({form}) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    function closeModals() {
        showDeleteModal && setShowDeleteModal(false);
        showShareModal && setShowShareModal(false);
    }

    function openDeleteModal() {
        setShowDeleteModal(true);
    }

    function openShareModal() {
        setShowShareModal(true);
    }
    
    return (
        <div className="detail-wrapper">
            {showDeleteModal && <Modal closeModal={closeModals} content={<DeletFormConfirmation formId={form.id} closeModal={closeModals}/>}/>}
            {showShareModal && <Modal closeModal={closeModals} content={<ShareSheet form={form} closeModal={closeModals}/>}/>}
            <div className="detail-share-icon">
                <Link to="#" onClick={openShareModal}><TbShare2/></Link>
            </div>
            <div className="detail-title">
                <Link to={`/forms/${form.id}/responses`}>{form ? form.title : "loading..."}</Link>
            </div>
            <div className="detail-bar">
                    <span className='a-count'> <span className='attending'>{form.acceptCount}</span> <br/>ATTENDING</span>
                    <span className='a-count'><span className='maybe'>0</span> <br/>MAYBE</span>
                    <span className='a-count'><span className='declined'>{form.declineCount}</span> <br/>DECLINED</span>
            </div>
            <div className="form-status">
                <span>
                <Link to="#" onClick={openDeleteModal}>
                    <span className='form-delete-icon'>
                        <AiFillDelete/>
                    </span>
                    </Link>
                </span>
                <span className='privacy-toggle'>
                    {form.restricted ? "Invite Only Event" : "Open Event"}

                    {/* <Switch onChange={() => {}}/> */}
                </span>
                <span>
                <Link to={`/form/${form.id}`}>
                    <span className='form-edit-icon'>
                        <MdModeEdit/>
                    </span>
                    </Link>
                </span>
                
            </div>
        </div>
    )
}