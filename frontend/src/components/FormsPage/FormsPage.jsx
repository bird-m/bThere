import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, selectAllForms } from "../../store/formReducer";
import { FormSummary } from "../FormSummary/FormSummary";
import './FormsPage.css'

export default function FormsPage (props) {

    const dispatch = useDispatch();
    const forms = useSelector(selectAllForms);

    useEffect(() => {
        dispatch(fetchForms())
    },[dispatch])

    return (
        <div className="form-page-wrapper">
            <div className="form-grid">
                {forms.map((form) => {
                    return (
                        <div className="form-page-item">
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