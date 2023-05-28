
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FormDetail.css'
import {AiFillDelete} from 'react-icons/ai'
import {MdModeEdit} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import {TbShare2} from 'react-icons/tb'
import { useState } from 'react';
import Modal from '../Modal/Modal'
import DeletFormConfirmation from '../DeleteFormConfirmation/DeleteFormConfirmation';

// MdModeEdit

export default function FormDetail ({form}) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function closeModals() {
        showDeleteModal && setShowDeleteModal(false);
    }

    function openDeleteModal() {
        setShowDeleteModal(true);
    }
    
    return (
        <div className="detail-wrapper">
            {showDeleteModal && <Modal closeModal={closeModals} content={<DeletFormConfirmation formId={form.id} closeModal={closeModals}/>}/>}
            <div className="detail-share-icon">
                <Link to={`/submit/${form.id}`}><TbShare2/></Link>
            </div>
            <div className="detail-title">
                <Link to={`/form/configure/${form.id}`}>{form ? form.title : "loading..."}</Link>
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
                <span>
                    
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