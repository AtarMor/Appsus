const { useState } = React

export function EditNoteModal({ note, onClose, onUpdateNote }) {
    const [editedNote, setEditedNote] = useState(note)

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setEditedNote({
            ...editedNote,
            info: {
                ...editedNote.info,
                [name]: value,
            },
        })
    }

    const handleUpdateNote = () => {
        onUpdateNote(editedNote)
        onClose()
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Note</h2>
                <label>Title:</label>
                <input type="text" name="title" value={editedNote.info.title || ''} onChange={handleChange} />
                <label>Content:</label>
                <textarea name="txt" value={editedNote.info.txt || ''} onChange={handleChange}></textarea>
                <button onClick={handleUpdateNote}>Save</button>
            </div>
        </div>
    );
}