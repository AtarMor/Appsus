
function SideButtonComponent({ onButtonClick }) {
    return (
        <div className="side-button-container">
            <button className="side-button" onClick={() => onButtonClick('button1')}>
                Button 1
            </button>
            <button className="side-button" onClick={() => onButtonClick('button2')}>
                Button 2
            </button>
            <button className="side-button" onClick={() => onButtonClick('button3')}>
                Button 3
            </button>
        </div>
    )
}
