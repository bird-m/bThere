import { useDispatch, useSelector } from 'react-redux'
import './FormConfigurator.css'
import { useEffect } from 'react';
import { fetchQuestions, selectQuestions } from '../../store/questionReducer';
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
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
import FormGrid from '../FormGrid/FormGrid';

export default function FormConfigurator() {

    // get any relevant params
    const { formId } = useParams();
    const params = useParams();

    // retrieve data from back end and load it in the store
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(fetchQuestions(formId));
        dispatch(fetchForms())
    }, [dispatch])

    const form = useSelector(selectForm(formId));

    // retrieve necessary data from the store
    // const questions = useSelector(selectQuestions(formId));
    const forms = useSelector(selectAllForms);

    const [sideNavOptions, setSideNavOptions] = useState({});
    const [bannerOptions, setBannerOptions] = useState({
        "Home": "/forms",
        "Address Book": "/forms"
    })

    useEffect(() => {
        // console.log(formId, "setting nav options");
        if (formId && form && form.restricted) {
            setSideNavOptions({
                "Responses": `/forms/${formId}/responses`,
                "Questions": `/forms/${formId}/questions`,
                "Invite List": `/forms/${formId}/invite-list`
            })
        } else if (formId && form) {
            setSideNavOptions({
                "Responses": `/forms/${formId}/responses`,
                "Questions": `/forms/${formId}/questions`
            })
        } else {
            setSideNavOptions({});
        }

    }, [formId, form])


    return (
        <div className="fc-wrapper">

            <LoggedInBanner navOptions={bannerOptions} />

            <div className="fc-sub-header">
                <BannerNav />

                {/* <div className="fc-contents-wrapper"> */}
                {/* <div className="fc-question-list"> */}
                <div className="form-config-panel-wrapper">
                    <FormConfigSidePanel form={form} navOptions={sideNavOptions} />
                </div>
                <div className="fc-alternating-pane">
                    <Switch>
                        <Route exact path="/forms">
                            <FormGrid />
                        </Route>
                        <Route path="/address-book">
                            <ContactsPage />
                        </Route>
                        <Route path="/forms/:formId/questions">
                            <QuestionList />
                        </Route>
                        <Route path="/forms/:formId/responses">
                            <SubmissionList />
                        </Route>
                        <Route path="/forms/:formId/invite-list">
                            <ContactsPage />
                        </Route>
                        <Route path="/forms">
                            <FormGrid />
                        </Route>
                    </Switch>
                </div>
                {/* </div> */}
                {/* </div> */}
            </div>
            {/* <div className="fc-side-panel">
                
            </div> */}

        </div>)
}