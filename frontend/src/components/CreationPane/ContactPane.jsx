
/*
This component accepts a list of objects

Should make a new horizontal section for each item in the list

The item should have predetermined keys and values
keys include:
- label (if present create a label)
- content (if present render the content below)
- classname (what it will be, though shoud have default)
- title
*/
export default function ContactPane({mode}) {
    
    return(
        <form className="cp-wrapper">
            <div className="cp-row">
                <label htmlFor="">Name</label>
            </div>
        </form>
    )
}