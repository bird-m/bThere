import { useDispatch, useSelector } from 'react-redux'
import './FormConfigurator.css'
import { useEffect } from 'react';
import { fetchQuestions, selectQuestions } from '../../store/questionReducer';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { QuestionList } from '../QuestionList/QuestionList';
import FormConfigSidePanel from '../FormConfigSidePanel/FormConfigSidePanel';
import { LoggedInBanner } from '../LoggedInBanner/LoggedInBanner';
import QuestionPane from '../QuestionPane/QuestionPane';
import { useState } from 'react';
import SubmissionList from '../SubmissionList/SubmissionList';
import { fetchForm, selectForm } from '../../store/formReducer';
import ContactsPage from '../ContactsPage/ContactsPage';
import BannerNav from '../BannerNav/BannerNav';

export default function FormConfigurator () {

    // options on the topBar
    const RESPONSES = "Responses"
    const QUESTIONS = "Questions"
    const CONTACTS = "Invite List"
    const FORMS = "Back to Forms"

    const navOptions = [RESPONSES, QUESTIONS, CONTACTS, FORMS]

    const history = useHistory();

    const {formId} = useParams();
    // console.log("FormConfigurator");
    const dispatch = useDispatch();
    const location = useLocation();

    const [mode, setMode] = useState(startingPoint());


    function startingPoint() {
        if (location && location.state && location.state.dest && location.state.dest === "questions") {
            return QUESTIONS;
        } else {
            return RESPONSES;
        }
    }

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
            case RESPONSES:
                if(form) {
                    return <SubmissionList questions={questions} form={form}/>
                } else {
                    return <h1>Loading</h1>
                }
                
            case QUESTIONS:
                return <QuestionList questions={questions} formId={formId}/>
            case CONTACTS:
                return <ContactsPage/>;
            case FORMS:
                history.push("/forms")
            default: 
                return <QuestionList questions={questions} formId={formId}/>
                // return <ContactsPage/>;
        }
    }

    return (
    <div className="fc-wrapper">
        <div className="fc-banner">
            <LoggedInBanner/>
        </div>
        <BannerNav setTab={setMode} tab={mode} navOptions={navOptions}/>
        <div className="fc-sub-header">
            <div className="fc-side-panel">
                <FormConfigSidePanel setMode={setMode} navOptions={navOptions}/>
            </div>
            <div className="fc-question-list">
                {paneMode()}
            </div>
        </div>
    </div>)
}