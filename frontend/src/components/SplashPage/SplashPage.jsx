import { Link } from 'react-router-dom'
import './SplashPage.css'
import demoVideo from '../../videos/demo_video.mp4'
import { useEffect, useRef } from 'react';
import logos from '../../images/logo-wall.png'

export function SplashPage (props) {

    const {img} = props;
    const vidRef = useRef(null)

    useEffect(() => {
        vidRef.current.play();
    },[])

    return (
        <div className="splash-wrapper">
            <div className="splash-pane hero-pane">
                <div className="hero-text">Elite event management software for all. No contract required.</div>
                <Link to="/signup"><button>Get started for free</button></Link>
            </div>
            <div className="vid-pane splash-pane">
                <video ref={vidRef} className='video' autoPlay loop src={demoVideo}/>
            </div>
            <div className="logo-pane splash-pane">
                <span>Trusted by thousands of the world's leading companies and organizations.</span>
                <img className='logos' src= {logos}/>
            </div>
        </div>
    )
}


// https://rsvpify.com/wp-content/uploads/2023/02/Kate-RSVPify-website-option-1-video-converter.com_.mp4