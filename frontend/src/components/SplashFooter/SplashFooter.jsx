import './SplashFooter.css'
import LiLogo from "../../images/LI-In-Bug.png"
import ghLogo from "../../images/github-mark-white.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function SplashFooter (props) {


    return (
        <div className="s-foooter-wraper">
            <div className="footer-contents">
                <br/>
                    <div className='tagline'>Created with care by Michael Bird</div>
                <ul>
                    <li><a target="_blank" href="https://www.linkedin.com/in/mibird/"><img src={LiLogo}/></a></li>
                    <li><a target="_blank" href="https://github.com/apporator"><img src={ghLogo}/></a></li>
                </ul>
            </div>
        </div>
    );
}