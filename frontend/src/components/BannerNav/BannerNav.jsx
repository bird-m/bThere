import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function BannerNav({ navOptions}) {

    const history = useHistory();

    // return (null);
    return (
        <div className="form-nav">
            <div className="form-nav-left">
                {Object.entries(navOptions).map(([viewableLink, path]) => {
                    return (
                        <div key={viewableLink} className="form-nav-selected" onClick={() => { history.push(path) }}>
                            {viewableLink}
                        </div>
                    )
                })}
            </div>
            <div className="form-nav-right">
                {/* <Link to="/form" className="form-button"><button>Create New Form</button></Link> */}
            </div>
        </div>
    )
}