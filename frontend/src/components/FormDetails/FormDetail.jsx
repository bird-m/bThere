
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FormDetail.css'
import {AiFillDelete} from 'react-icons/ai'
import {MdModeEdit} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { deleteForm } from '../../store/formReducer';
import {TbShare2} from 'react-icons/tb'

// MdModeEdit

export default function FormDetail (props) {

    const {form} = props;
    const history = useHistory();
    const dispatch = useDispatch();
    // console.log(form);

    function handleShare () {

    }

    return (
        <div className="detail-wrapper">
            <div className="detail-share-icon" onClick={(e)=> {window.open(`/submit/${form.id}`)}}><TbShare2/></div>
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
                <Link to="#" onClick={() => {dispatch(deleteForm(form.id))}}>
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