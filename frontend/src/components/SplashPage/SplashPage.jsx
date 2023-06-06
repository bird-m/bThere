import { Link } from 'react-router-dom'
import './SplashPage.css'
import demoVideo from '../../videos/demo_video.mp4'
import { useEffect, useRef, useState } from 'react';
import logos from '../../images/logo-wall.png'
import Modal from '../Modal/Modal';
import ModalMsg from '../ModalMsg/ModalMsg';

export function SplashPage (props) {

    const {img} = props;
    const vidRef = useRef(null)
    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // const userAgent = navigator.userAgent;

    useEffect(() => {
        vidRef.current.play();
    },[])

    useEffect(() => {
        setIsMobile(/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }, [navigator.userAgent, setIsMobile])

    useEffect(() => {
        isMobile && setShowModal(true);
    }, [isMobile, setShowModal])

    return (
        <div className="splash-wrapper">
            {showModal && <Modal closeModal={(() => {setShowModal(false)})} content={<ModalMsg closeModal={(() => {setShowModal(false)})}/>}/> }
            <div className="splash-pane hero-pane">
                <div className="hero-text">Elite event management software for all.<br/> No contract required.</div>
                <Link to="/signup"><button>GET STARTED</button></Link>
            </div>
            <div className="vid-pane splash-pane">
                <video ref={vidRef} className='video' autoPlay loop muted src={demoVideo}/>
            </div>
            <div className="logo-pane splash-pane">
                <span>Trusted by thousands of the world's leading companies and organizations.</span>
                <img className='logos' src= {logos}/>
            </div>
        </div>
    )
}


// https://rsvpify.com/wp-content/uploads/2023/02/Kate-RSVPify-website-option-1-video-converter.com_.mp4