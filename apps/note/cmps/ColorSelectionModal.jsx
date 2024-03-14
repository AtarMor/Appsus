const { useState, useEffect } = React

export function ColorSelectionModal({ colors, onClose, onColorSelect }) {
    const [selectedColor, setSelectedColor] = useState(null)

    const handleColorSelect = (color) => {
        setSelectedColor(color)
        onColorSelect(color)
        onClose()
    }

    return (
        <div className="color-selection-modal">
            <div className="color-options">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="color-option"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                    ></div>
                ))}
            </div>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}