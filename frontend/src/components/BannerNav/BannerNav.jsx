export default function BannerNav({ navOptions, setTab, tab}) {

    
    return (
        <div className="form-nav">
            <div className="form-nav-left">
                {navOptions.map((o, ix) => {
                    console.log(tab, "tab!");
                    console.log(o, "option!");
                    return (
                        <div key={ix} className={tab === o ? "form-nav-selected" : ""} onClick={() => { setTab(o) }}>
                            {o}
                        </div>
                    )
                })}
            </div>
            {/* <div className="form-nav-left">
                <div className={tab === FORMS ? "form-nav-selected" : ""} onClick={() => { setTab(FORMS) }}>
                    Forms
                </div>
                <div className={tab === CONTACTS ? "form-nav-selected" : ""} onClick={() => { setTab(CONTACTS) }}>
                    Contacts
                </div>
            </div> */}
            <div className="form-nav-right">
                {/* <Link to="/form" className="form-button"><button>Create New Form</button></Link> */}
            </div>
        </div>
    )

    // return (
    //     <div className="form-nav">
    //         <div className="form-nav-left">
    //             <div className={tab === FORMS ? "form-nav-selected" : ""} onClick={() => { setTab(FORMS) }}>
    //                 Forms
    //             </div>
    //             <div className={tab === CONTACTS ? "form-nav-selected" : ""} onClick={() => { setTab(CONTACTS) }}>
    //                 Contacts
    //             </div>
    //         </div>
    //         <div className="form-nav-right">
    //             <Link to="/form" className="form-button"><button>Create New Form</button></Link>
    //         </div>
    //     </div>
    // )
}