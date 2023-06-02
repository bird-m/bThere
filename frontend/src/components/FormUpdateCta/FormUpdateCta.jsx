import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './FormUpdateCta.css';

export default function FormUpdateCta({ icon, linkText, afterLink, path, handleClick }) {

    function linkTo() {
        return (handleClick ? "#" : path)
    }

    function clickTo() {
        handleClick && handleClick();
    }

    return (
        <div className="fcp-cta-wrapper">
            <Link to={linkTo()} onClick={clickTo} >
                <div className="fcp-icon">
                    {icon()}
                </div>
            </Link>

            <div className="fcp-cta">
                <Link to={linkTo()} onClick={clickTo} ><div className="fcp-link-span"> {linkText}</div></Link>{afterLink}
            </div>
        </div>
    )
}