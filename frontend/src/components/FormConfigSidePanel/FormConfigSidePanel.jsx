import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'
import checkLogo from '../../images/check-logo.png'
import { useEffect } from 'react';

export default function FormConfigSidePanel({ navOptions, form, setSubmitted }) {

    const history = useHistory();

    const location = useLocation();

    useEffect(() => {

        console.log(location.pathname, "PATHNAME");
    }, [location])


    function assignNavClass(pathname) {
        if(pathname === location.pathname) {
            return "sp-nav-div sp-nav-div-selected"
        } else {
            return "sp-nav-div"
        }
    }

    function handleClick(path) {
        setSubmitted && setSubmitted(false);
        history.push(path)
    }

    return (
        <>
            {form?.title && <div className="sp-nav-div sp-form-title">
                {form.title}
            </div>}
                
            {form?.title && <hr className='sp-divider' />}


            {form && Object.entries(navOptions).map(([viewableLink, path]) => {
                return (
                    <div key={viewableLink} onClick={() => {handleClick(path)}} className={assignNavClass(path)}>{viewableLink}</div>
                )
            })}
        </>
    );
}