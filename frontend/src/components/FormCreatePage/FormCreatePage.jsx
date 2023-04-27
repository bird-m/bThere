import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { postForm } from "../../store/formReducer";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './FormCreatePage.css'



export default function FormCreatePage (props) {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [customUrl, setCustomUrl] = useState('');


    const dispatch = useDispatch();
    const history = useHistory();
    // const [successfulSubmit, setSuccessfulSubmit] = useState(false);

    function handleSubmit() {
        let form = {form : {
            title,
            description,
            customUrl
        }}
        // debugger;
        // console.log("here!")
        dispatch(postForm(form))
            .then((res) => {
                history.push("/forms");
            })
            .catch((res) => {
                res.json().then((data) => {
                    debugger;
                    setErrors(data.errors);
                })
            })
    }

    // if (successfulSubmit) {
    //     return <Redirect to="/forms" />;
    // }

    return (
        <div className="create-forms-page-wrapper">

            <div className="create-pane-wrapper">
                <div className="fc-input-pane">
                    <span className="fc-large">Create A New Form.</span><br/>
                    <span className="fc-small">It's quick and easy.</span>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="title">TITLE </label><br/>
                    <input id="title" type='text' value = {title} onChange={(e) => {setTitle(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="description">DESCRIPTION </label><br/>
                    <input id="description" type='text' value = {description} onChange={(e) => {setDescription(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="custom-url">CUSTOM URL </label><br/>
                    <input id="custom-url" type='text' value = {customUrl} onChange={(e) => {setCustomUrl(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <button onClick={handleSubmit}>CREATE FORM</button>
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