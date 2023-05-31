// import logos from '../../images/logo-wall.png'
import { useSelector } from 'react-redux';
import sample from '../../images/sample-form-img.png'
import { loggedInUser } from '../../store/session';
import FormDetail from '../FormDetails/FormDetail';
import './FormSummary.css'
import { Redirect } from 'react-router-dom';

export function FormSummary ({form, setFormId}) {

    return (<div className="form-summary-wrapper">
        
        <img className='form-image' src={form.photo ? form.photo : sample}/>
        <FormDetail form={form} setFormId={setFormId}/>
    </div> );
}