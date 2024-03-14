const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function ColorSelectionModal({ colors, onClose, onColorSelect, currentColor }) {
    const [selectedColor, setSelectedColor] = useState(null)

    const handleColorSelect = (color) => {
        setSelectedColor(color)
        onColorSelect(color)
        onClose()
    }

    return (
        <div className="color-selection-modal">
            <div className="color-options">
                {noteService.renderActionButton("empty-color", () => handleColorSelect('white'), "fa-solid fa-droplet-slash", { color: '#212121' })}
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="color-option"
                        // className={`color-option ${color === currentColor ? "current-color" : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                    ></div>
                ))}
            </div>
        </div>
    )
}