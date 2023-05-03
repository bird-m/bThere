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
import sample from '../../images/sample-form-img.png'
// import loadingImg from '../../images/loading.png'
// import {IoCloseSharp} from 'react-icons/io'


export default function FormCreatePage (props) {
    // console.log("IN CREATE");
    const {formId} = useParams();

    let cta;
    let tagline;
    let buttonText;
    let photoText;

    if(formId) {
        cta = "Update Your Form.";
        tagline = "It's quick and easy.";
        buttonText = "UPDATE FORM"
        photoText = "CHANGE PHOTO"
    } else {
        cta = "Create a New Form.";
        tagline = "It's quick and easy.";
        buttonText = "CREATE FORM"
        photoText = "ADD OPTIONAL PHOTO"
    }


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [customUrl, setCustomUrl] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [formPhoto, setFormPhoto] = useState(null);

    const editForm = useSelector(selectForm(formId));

    const dispatch = useDispatch();
    const history = useHistory();

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
            setFormPhoto(editForm.photo ? editForm.photo : sample)
        }
    }, [editForm])

    function handlePhotoTest() {
        // let form = {form: {
        //     title,
        //     description,
        //     customUrl
        // }}

        const formData = new FormData();

        formData.append('form[title]', title)
        formData.append('form[description]', description)
        formData.append('form[customUrl]', customUrl)

        if (photoFile) {
            formData.append('form[photo]', photoFile);
        }


        // debugger;
        // console.log(formId, "FORMID")
        dispatch(postForm(formData, formId || ""))
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

    function handleFile ({currentTarget}) {
        const file = currentTarget.files[0];
        setPhotoFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setFormPhoto(reader.result)
        };
        reader.readAsDataURL(file);
    }

    function injectImg() {
        if(formPhoto) {
            return <img className="fc-input-pane fc-img-pane" src={formPhoto}/>;
        } else if (formId && !formPhoto) {
            return <div className="fc-input-pane fc-img-pane">Loading...</div>;
        } else {
            // setFormPhoto(sample);
            return (<div className="fc-df-image-wrap">
                <img className="fc-img-pane" src={sample}/>
                <div className="fc-df-txt">Default Image <br/>(will exclude this text)</div>
            </div>);
        }
    }

    return (
        <div className="create-forms-page-wrapper">
                <div className="fc-banner-wrapper">
                    <LoggedInBanner/>
                </div>
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
                {injectImg()}
                <div className="fc-input-pane">
                    <label htmlFor="title">TITLE </label><br/>
                    <input id="title" type='text' value = {title} onChange={(e) => {setTitle(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="fc-description">DESCRIPTION </label><br/>

                    <textarea id="fc-description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="custom-url">CUSTOM URL </label><br/>
                    <input id="custom-url" type='text' value = {customUrl} onChange={(e) => {setCustomUrl(e.target.value)}}/>
                </div>
                <div className="fc-input-pane">
                    <label htmlFor="photo">{photoText}</label><br/>
                    <input id="photo" type="file" onChange={handleFile}/>
                </div>
                <div className="fc-input-pane">
                    <button onClick={handlePhotoTest}>{buttonText}</button>
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