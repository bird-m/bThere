import { useDispatch, useSelector } from 'react-redux'
import './FormGrid.css'
import { useEffect } from 'react';
import { fetchForms, selectAllForms } from '../../store/formReducer';
import { FormSummary } from '../FormSummary/FormSummary';

export default function FormGrid() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchForms())
    }, [])

    const forms = useSelector(selectAllForms);

    return (
        <>
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