// import logos from '../../images/logo-wall.png'
import { useSelector } from 'react-redux';
import sample from '../../images/sample-form-img.png'
import { loggedInUser } from '../../store/session';
import FormDetail from '../FormDetails/FormDetail';
import './FormSummary.css'
import { Redirect } from 'react-router-dom';

export function FormSummary (props) {

    const {form} = props;

    const sessionUser = useSelector(loggedInUser);

    if(!sessionUser) {
        return <Redirect to="/login" />
    }

    

    // const 
    // debugger;
    
    // return (
    //     <div className="form-grid-wrapper">
    //         forms.map((form)=> {
    //             return (
    //                 <div className="form-summary-wrapper">
    //                     <img className='form-image' src={sample}/>
    //                     <FormDetail form={form}/>
    //                 </div>
    //             )
    //         })
    //     </div>
    //  );

    return (<div className="form-summary-wrapper">
        
        <img className='form-image' src={sample}/>
        <FormDetail form={form}/>
    </div> );
}