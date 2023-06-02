import './BannerNav.css'
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function BannerNav({ navOptions, form }) {

    const history = useHistory();
    const location = useLocation();
    const {formId} = useParams();

    function assignNavClass(pathname) {
        if(pathname === location.pathname) {
            return "form-nav-selected"
        } else {
            return "form-nav-item"
        }
    }

    // return (null);
    return (
        <div className="form-nav-wrapper">
        {formId && <div className="form-nav-title">
            {form && form.title}
            <hr className='form-nav-title-bar'/>
        </div>}
        <div className="form-nav">
            <div className="form-nav-left">
                {Object.entries(navOptions).map(([viewableLink, path]) => {
                    return (
                        <div key={viewableLink} className={assignNavClass(path)} onClick={() => { history.push(path) }}>
                            {viewableLink}
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    )
}