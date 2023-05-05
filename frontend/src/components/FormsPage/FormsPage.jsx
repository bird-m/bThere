import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, selectAllForms } from "../../store/formReducer";
import { FormSummary } from "../FormSummary/FormSummary";
import './FormsPage.css'
import { loggedInUser } from "../../store/session";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import checkLogo from '../../images/check-logo.png'
import { LoggedInBanner } from "../LoggedInBanner/LoggedInBanner";

export default function FormsPage (props) {

    const dispatch = useDispatch();
    const forms = useSelector(selectAllForms);

    useEffect(() => {
        dispatch(fetchForms())
    },[dispatch])

    // debugger;

    const sessionUser = useSelector(loggedInUser);
    if (!sessionUser) {
        // debugger;
        return (<Redirect to="/login" />);
    }

    return (
        <div className="form-page-wrapper">
            <div className="added-banner-wrap">
                <LoggedInBanner/>
            </div>
            <div className="form-nav">
                <Link to="/form" className="form-button"><button>Create Form</button></Link>
            </div>
            <div className="form-grid">
                {forms.map((form) => {
                    return (
                        <div key={form.id} className="form-page-item">
                            <FormSummary form={form}/>
                        </div>
                    )
                })}
            </div>
        </div>

    )

    // return (
    //     <>
    //         <div className="form-page-wrapper">
                // <div className="form-page-item">
                //     <FormSummary forms={forms}/>
                // </div>
    //         </div>
    //     </>
    // )

    // return (
    //     <>
    //         <div className="form-page-wrapper">
    //             Hello!!!
    //             <div className="form-page-item">
    //                 <FormSummary form={forms[0]}/>
    //             </div>
    //         </div>
    //     </>
    // )

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
}