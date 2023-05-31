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
import { fetchForm, fetchForms, selectAllForms, selectForm } from '../../store/formReducer';
import ContactsPage from '../ContactsPage/ContactsPage';
import BannerNav from '../BannerNav/BannerNav';
import { FormSummary } from '../FormSummary/FormSummary';

export default function FormConfigurator() {

    // get any relevant params
    const { formId } = useParams();

    // retrieve data from back end and load it in the store
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions(formId));
        dispatch(fetchForm(formId));
        dispatch(fetchForms())
    }, [dispatch])
    
    // retrieve necessary data from the store
    const questions = useSelector(selectQuestions(formId));
    const form = useSelector(selectForm(formId));
    const forms = useSelector(selectAllForms);

    // options on the topBar
    const RESPONSES = "Responses"
    const QUESTIONS = "Questions"
    const CONTACTS = "Invite List"
    const FORMS = "Back to Forms"

    const navOptions = [RESPONSES, QUESTIONS, CONTACTS, FORMS]

    const history = useHistory();

    // console.log("FormConfigurator");
    const location = useLocation();

    const [mode, setMode] = useState(startingPoint());


    function startingPoint() {
        if (location && location.state && location.state.dest && location.state.dest === "questions") {
            return QUESTIONS;
        } else {
            return RESPONSES;
        }
    }


    // console.log(formId, "FORM ID");
    // console.log(questions, "QUESTIONS");


    function paneMode() {
        switch (mode) {
            case RESPONSES:
                if (form) {
                    return <SubmissionList questions={questions} form={form} />
                } else {
                    return <h1>Loading</h1>
                }

            case QUESTIONS:
                return <QuestionList questions={questions} formId={formId} />
            case CONTACTS:
                return <ContactsPage formId={formId} />;
            case FORMS:
                return renderFormGrid();
            default:
                return <QuestionList questions={questions} formId={formId} />
            // return <ContactsPage/>;
        }
    }

    function renderFormGrid() {
        return (
            <>
                
                <div className="form-grid">
                    {forms.map((form) => {
                        return (
                            <div key={form.id} className="form-page-item">
                                <FormSummary form={form} />
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }

    return (
        <div className="fc-wrapper">
            <div className="fc-side-panel">
                <FormConfigSidePanel setMode={setMode} navOptions={navOptions} />
            </div>
            <div className="fc-sub-header">
                <div className="fc-banner">
                    <LoggedInBanner />
                </div>
                {/* <BannerNav setTab={setMode} tab={mode} navOptions={navOptions} /> */}

                <div className="fc-contents-wrapper">
                    <div className="fc-question-list">
                        {paneMode()}
                    </div>
                </div>
            </div>

        </div>)
}