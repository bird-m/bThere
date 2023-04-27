import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { postForm } from "../../store/formReducer";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function FormCreatePage (props) {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();
    // const [successfulSubmit, setSuccessfulSubmit] = useState(false);

    function handleSubmit() {
        let form = {form : {
            title,
            description
        }}
        // debugger;
        // console.log("here!")
        dispatch(postForm(form))
            .then((res) => {
                history.push("/forms");
            })
            .catch((res) => {
                res.json().then((data) => {
                    setErrors(data.errors);
                })
            })
    }

    // if (successfulSubmit) {
    //     return <Redirect to="/forms" />;
    // }

    return (
        <div className="create-page-wrapper">
            <label htmlFor="title">Title: </label>
            <input id="title" type='text' value = {title} onChange={(e) => {setTitle(e.target.value)}}/>
            <label htmlFor="description">Description: </label>
            <input id="description" type='text' value = {description} onChange={(e) => {setDescription(e.target.value)}}/>
            <button onClick={handleSubmit}>Create Form</button>
            <div className="form-create-errors">
                {errors.map((e, ix) => {
                    return (<><span key={ix}>{e}</span><br/></>)
                })}
            </div>
        </div>
    )
}