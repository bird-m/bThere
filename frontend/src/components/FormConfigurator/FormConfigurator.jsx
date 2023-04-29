import { useDispatch, useSelector } from 'react-redux'
import './FormConfigurator.css'
import { useEffect } from 'react';
import { fetchQuestions, selectQuestions } from '../../store/questionReducer';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { QuestionList } from '../QuestionList/QuestionList';
import FormConfigSidePanel from '../FormConfigSidePanel/FormConfigSidePanel';
import { LoggedInBanner } from '../LoggedInBanner/LoggedInBanner';

export default function FormConfigurator () {

    const {formId} = useParams();
    console.log("FormConfigurator");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions(formId))
    }, [dispatch])
    
    console.log(formId, "FORM ID");
    const questions = useSelector(selectQuestions(formId));
    console.log(questions, "QUESTIONS");

    return (
    <div className="fc-wrapper">
        <div className="fc-banner">
            <LoggedInBanner/>
        </div>
        <div className="fc-sub-header">
            <div className="fc-side-panel">
                <FormConfigSidePanel/>
            </div>
            <div className="fc-question-list">
                <QuestionList questions={questions}/>    
            </div>
        </div>
    </div>)
}

