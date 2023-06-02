import { useDispatch, useSelector } from 'react-redux'
import './FormGrid.css'
import { useEffect, useState } from 'react';
import { fetchForms, selectAllForms } from '../../store/formReducer';
import { FormSummary } from '../FormSummary/FormSummary';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from '../Modal/Modal';
import FormCreatePage from '../FormCreatePage/FormCreatePage';

export default function FormGrid() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [showFormCreate, setShowFormCreate] = useState(false);
    
    useEffect(() => {
        dispatch(fetchForms())
    }, [])

    function closeModal() {
        setShowFormCreate(false);
    }

    const forms = useSelector(selectAllForms);

    // return null;
    return (
        <>
        {showFormCreate && <Modal closeModal={closeModal} content={<FormCreatePage/>}/>}
            <div className="form-create-banner">
                <Link to="/form"><button className='form-create-button'>CREATE INVITE</button></Link>
                
            </div>
            <div className="form-grid">
                {forms.map((form) => {
                    return (
                        <div key={form.id} className="form-page-item">
                            <FormSummary form={form} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}