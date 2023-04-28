import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchForm, postForm, selectForm } from "../../store/formReducer";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './FormCreatePage.css'
import { useParams } from "react-router-dom";
import { LoggedInBanner } from "../LoggedInBanner/LoggedInBanner";
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import {IoCloseSharp} from 'react-icons/io'


export default function FormCreatePage (props) {
    // console.log("IN CREATE");
    const {formId} = useParams();

    let cta;
    let tagline;
    let buttonText;

    if(formId) {
        cta = "Update Your Form.";
        tagline = "It's quick and easy.";
        buttonText = "UPDATE FORM"
    } else {
        cta = "Create a New Form.";
        tagline = "It's quick and easy.";
        buttonText = "CREATE FORM"
    }


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [customUrl, setCustomUrl] = useState('');

    // console.log(formId, "FORMID");
    const editForm = useSelector(selectForm(formId));

    const dispatch = useDispatch();
    const history = useHistory();

    // console.log(editForm);

    useEffect(() => {
        if(formId) {
            dispatch(fetchForm(formId));
        }
    }, [dispatch])

    useEffect(() => {
        if(editForm) {
            setTitle(editForm.title);
            setDescription(editForm.description);
            setCustomUrl(editForm.customUrl);
        }
    }, [editForm])

    // console.log(params);
    // debugger
    // console.log(formId, "Params");

    
    // const [successfulSubmit, setSuccessfulSubmit] = useState(false);

    function handleSubmit() {
        let form = {form: {
            title,
            description,
            customUrl
        }}

        // debugger;
        console.log(formId, "FORMID")
        dispatch(postForm(form, formId || ""))
            .then((res) => {
                history.push("/forms");
            })
            .catch((res) => {
                res.json().then((data) => {
                    // debugger;
                    setErrors(data.errors);
                })
            })
    }

    // if (successfulSubmit) {
    //     return <Redirect to="/forms" />;
    // }

    return (
        <div className="create-forms-page-wrapper">
                <LoggedInBanner/>
                <div className="fc-x">
                    <Link to="/forms">
                        <AiOutlineClose/>
                    </Link>
                </div>
            <div className="create-pane-wrapper">
                <div className="fc-input-pane">
                    <span className="fc-large">{cta}</span><br/>
                    <span className="fc-small">{tagline}</span>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="title">TITLE </label><br/>
                    <input id="title" type='text' value = {title} onChange={(e) => {setTitle(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="description">DESCRIPTION </label><br/>

                    <textarea id="description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="custom-url">CUSTOM URL </label><br/>
                    <input id="custom-url" type='text' value = {customUrl} onChange={(e) => {setCustomUrl(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <button onClick={handleSubmit}>{buttonText}</button>
                </div>
                <div className="fc-input-pane">
                    <div className="form-create-errors">
                        {errors.map((e, ix) => {
                            return (<><span key={ix}>{e}</span><br/></>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}