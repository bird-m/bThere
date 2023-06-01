import { useEffect, useState } from 'react';
import './TableRow.css'

export default function TableRow({ rowContent }) {

    return (
        <div className="sub-row-wrapper">
            {rowContent.map((content, ix) => {
                return (
                    <div key={ix} className="sl-cell" style={{ width: `${Math.floor((1/rowContent.length) * 100)}%` }}>
                        <div className="sl-inner-cell">
                            {content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}