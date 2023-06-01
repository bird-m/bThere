import './TableRow.css'

export default function TableRow({ rowContent }) {

    return (
        <div className="sub-row-wrapper">
            {rowContent.map((content, ix) => {
                return (
                    <div key={ix} className="sl-cell sl-cell-narrow">
                        <div className="sl-inner-cell">
                            {content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}