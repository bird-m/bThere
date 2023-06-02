import { useDispatch, useSelector } from 'react-redux'
import './FormGrid.css'
import { useEffect } from 'react';
import { fetchForms, selectAllForms } from '../../store/formReducer';
import { FormSummary } from '../FormSummary/FormSummary';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function FormGrid() {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchForms())
    }, [])

    const forms = useSelector(selectAllForms);

    // return null;
    return (
        <>
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