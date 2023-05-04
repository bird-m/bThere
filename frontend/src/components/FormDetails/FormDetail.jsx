
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './FormDetail.css'
import {AiFillDelete} from 'react-icons/ai'
import {MdModeEdit} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { deleteForm } from '../../store/formReducer';

// MdModeEdit

export default function FormDetail (props) {

    const {form} = props;
    const dispatch = useDispatch();
    // console.log(form);

    return (
        <div className="detail-wrapper">
            <div className="detail-banner-icons"><div>sldfkja</div></div>
            <div className="detail-title">
                <Link to={`/form/configure/${form.id}`}>{form ? form.title : "loading..."}</Link>
            </div>
            <div className="detail-bar">
                    <span className='a-count'> <span className='attending'>15</span> <br/>ATTENDING</span>
                    <span className='a-count'><span className='maybe'>15</span> <br/>MAYBE</span>
                    <span className='a-count'><span className='declined'>15</span> <br/>DECLINED</span>
            </div>
            <div className="form-status">
                <span>
                <Link to={`/form/${form.id}`}>
                    <span className='form-edit-icon'>
                        <MdModeEdit/>
                    </span>
                    </Link>
                </span>
                <span>
                    {form ? form.status : "loading..."}
                </span>
                <span>
                    <Link to="#" onClick={() => {dispatch(deleteForm(form.id))}}>
                    <span className='form-delete-icon'>
                        <AiFillDelete/>
                    </span>
                    </Link>
                </span>
                
            </div>
        </div>
    )
}