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
import FormCreatePage from '../FormCreatePage/FormCreatePage';
import ShareSheet from '../ShareSheet/ShareSheet';

export default function FormConfigurator() {

    // get any relevant params
    // const { formId } = useParams();
    const params = useParams();

    // retrieve data from back end and load it in the store
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(fetchQuestions(formId));
        dispatch(fetchForms())
    }, [dispatch])

    const [formId, setFormId] = useState();
    const [newFormId, setNewFormId] = useState();
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if(params.formId) {
            setFormId(params.formId);
        } else if(newFormId) {
            setFormId(newFormId);
        }
        else {
            setFormId(null);
        }
    }, [formId, params, newFormId])

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
                "Invite List": `/forms/${formId}/invite-list`,
                "Settings": `/form/${formId}`,
                "Send": `/forms/${formId}/share`,
            })
        } else if (formId && form) {
            setSideNavOptions({
                "Responses": `/forms/${formId}/responses`,
                "Questions": `/forms/${formId}/questions`,
                "Settings": `/form/${formId}`,
                "Send": `/forms/${formId}/share`,
            })
        } else {
            setSideNavOptions({});
        }

    }, [formId, form])


    return (
        <div className="fc-wrapper">

            <LoggedInBanner navOptions={bannerOptions} />

            <div className="fc-sub-header" style={{height: (!formId && "100%")}}>
                
                {formId &&
                <div className="form-config-panel-wrapper">
                    <FormConfigSidePanel setSubmitted={setSubmitted} form={form} navOptions={sideNavOptions} />
                </div>}
                <div className={`fc-alternating-pane${formId ? "" : " fc-no-left-marg"}`} style={{width: (!formId && "100%")}}>
                {formId && <BannerNav setSubmitted={setSubmitted} form={form} navOptions={sideNavOptions}/>}
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
                        <Route path="/forms/:formId/share">
                            <ShareSheet />
                        </Route>
                        <Route path="/forms">
                            <FormGrid />
                        </Route>
                        <Route path="/form/:formId?">
                            <FormCreatePage submitted={submitted} setSubmitted={setSubmitted} newFormId={newFormId} setNewFormId={setNewFormId}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>)
}