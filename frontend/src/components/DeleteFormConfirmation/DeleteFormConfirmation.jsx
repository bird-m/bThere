import { useDispatch } from 'react-redux'
import './DeleteFormConfirmation.css'
import { deleteForm } from '../../store/formReducer'

export default function DeletFormConfirmation({closeModal, formId}) {

    const dispatch = useDispatch();
    
    function handleDelete() {
        dispatch(deleteForm(formId)).then((res) => {
            closeModal();
        })
    }

    function handleClick() {
        // debugger;
        closeModal()
    }

    return (
        <div className="dlc-wrapper">
            <div className="dlc-text">
                Are you sure you want to delete the form? This action is irreversible and will also delete its responses and questions.
            </div>
            <div className="dlc-buttons">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleClick}>Cancel</button>
            </div>
        </div>
    )
}