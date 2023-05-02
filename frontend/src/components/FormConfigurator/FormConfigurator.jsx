import { useDispatch, useSelector } from 'react-redux'
import './FormConfigurator.css'
import { useEffect } from 'react';
import { fetchQuestions, selectQuestions } from '../../store/questionReducer';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { QuestionList } from '../QuestionList/QuestionList';
import FormConfigSidePanel from '../FormConfigSidePanel/FormConfigSidePanel';
import { LoggedInBanner } from '../LoggedInBanner/LoggedInBanner';
import QuestionPane from '../QuestionPane/QuestionPane';
import { useState } from 'react';
import SubmissionList from '../SubmissionList/SubmissionList';
import { fetchForm, selectForm } from '../../store/formReducer';

export default function FormConfigurator () {

    const {formId} = useParams();
    // console.log("FormConfigurator");
    const dispatch = useDispatch();

    const [mode, setMode] = useState("questions")

    useEffect(() => {
        dispatch(fetchQuestions(formId));
        dispatch(fetchForm(formId));
    }, [dispatch])
    
    // console.log(formId, "FORM ID");
    const questions = useSelector(selectQuestions(formId));
    // console.log(questions, "QUESTIONS");

    const form = useSelector(selectForm(formId));

    function paneMode() {
        switch(mode) {
            case "responses":
                // debugger;
                return <SubmissionList questions={questions} form={form}/>
            case "questions":
                return <QuestionList questions={questions} formId={formId}/>
            default: 
                return <QuestionList questions={questions} formId={formId}/>
        }
    }

    return (
    <div className="fc-wrapper">
        <div className="fc-banner">
            <LoggedInBanner/>
        </div>
        <div className="fc-sub-header">
            <div className="fc-side-panel">
                <FormConfigSidePanel setMode={setMode}/>
            </div>
            <div className="fc-question-list">
                {paneMode()}
            </div>
        </div>
    </div>)
}

