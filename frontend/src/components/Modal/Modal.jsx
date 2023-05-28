import './Modal.css'

export default function Modal({contents, setShowModal}) {

    contents ||= (<div className="inner-modal">This is my modal</div>)

    function handleClick(e) {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    }


    return (
        <div className="modal-background" onClick={(e) => {handleClick(e)}}>
            {contents}
        </div>
    );
}