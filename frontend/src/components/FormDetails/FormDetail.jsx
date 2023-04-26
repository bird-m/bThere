
import './FormDetail.css'

export default function FormDetail (props) {

    const {form} = props;
    console.log(form);

    return (
        <div className="detail-wrapper">
            <div className="detail-title">
                {form ? form.title : "loading..."}
            </div>
            <div className="detail-bar">
                    <span className='a-count'> <span className='attending'>15</span> <br/>ATTENDING</span>
                    <span className='a-count'><span className='maybe'>15</span> <br/>MAYBE</span>
                    <span className='a-count'><span className='declined'>15</span> <br/>DECLINED</span>
            </div>
            <div className="form-status">
                RSVP open
            </div>
        </div>
    )
}