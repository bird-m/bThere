import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, selectAllForms } from "../../store/formReducer";
import { FormSummary } from "../FormSummary/FormSummary";
import './FormsPage.css'
import { loggedInUser } from "../../store/session";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import checkLogo from '../../images/check-logo.png'
import { LoggedInBanner } from "../LoggedInBanner/LoggedInBanner";
import ContactsPage from "../ContactsPage/ContactsPage";
import BannerNav from "../BannerNav/BannerNav";

export default function FormsPage(props) {

    const FORMS = "Forms";
    const CONTACTS = "Contacts";

    const dispatch = useDispatch();
    const forms = useSelector(selectAllForms);
    const [tab, setTab] = useState(FORMS);
    const sessionUser = useSelector(loggedInUser);

    useEffect(() => {
        dispatch(fetchForms())
    }, [dispatch])

    if (!sessionUser) {
        return (<Redirect to="/login" />);
    }

    if(tab === "contacts") {
        return <ContactsPage/>
    }


    return (
        <div className="form-page-wrapper">
            <div className="added-banner-wrap">
                <LoggedInBanner />
            </div>
            <BannerNav navOptions={[FORMS, CONTACTS]} setTab={setTab} tab={tab}/>
            {tab === FORMS && renderFormGrid()}
            {tab === CONTACTS && <ContactsPage/>}
        </div>

    )

    function renderFormGrid() {
        return (
            <div className="form-grid">
                {forms.map((form) => {
                    return (
                        <div key={form.id} className="form-page-item">
                            <FormSummary form={form} />
                        </div>
                    )
                })}
            </div>
        )
    }
}