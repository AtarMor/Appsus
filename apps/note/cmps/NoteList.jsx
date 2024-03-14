const { Link } = ReactRouterDOM
const { useState } = React


import { NotePreview } from "./NotePreview.jsx"
import { ColorSelectionModal } from "./ColorSelectionModal.jsx"
import { noteService } from "../services/note.service.js"

export function NoteList({ notes, onRemoveNote, onPinNote, setNotes }) {
    const [showColorModal, setShowColorModal] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedNoteId, setSelectedNoteId] = useState(null)
    const colors = ['#ff0000', '#00ff00', '#0000ff']

    if (!notes.length) return <div className="empty-notes-msg flex justify-center align-center">No notes here, make some!</div>

    const handleOpenColorModal = (noteId) => {
        setSelectedNoteId(noteId)
        setShowColorModal(true)
    }

    const handleCloseColorModal = () => {
        setShowColorModal(false)
    }

    const handleColorSelect = (color) => {
        setSelectedColor(color)
        updateNoteColor(selectedNoteId, color)
        handleCloseColorModal()
    }

    const updateNoteColor = (noteId, color) => {
        const noteToUpdate = notes.find(note => note.id === noteId)
        if (noteToUpdate) {
            noteToUpdate.style.backgroundColor = color
            noteService.save(noteToUpdate)
                .then(() => {
                    console.log('Note color updated successfully!')
                })
                .catch(err => {
                    console.error('Failed to update note color:', err)
                })
        } else {
            console.error('Note not found with ID:', noteId)
        }
    }

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id} className="note-item" style={{
                    backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'whitesmoke'
                }}>
                    <Link to={`/note/${note.id}`} className="note-link">
                        <NotePreview note={note} />
                    </Link>
                    <div className="note-actions transparent">
                        <button className="archive-btn" onClick={() => onArchiveNote(note)}>archive</button>
                        <button className="pin-btn" onClick={() => onPinNote(note)}>
                            {note.isPinned ? 'unpin' : 'pin'}</button>
                        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
                        <button className="change-color" onClick={() => handleOpenColorModal(note.id)}>Change Color</button>
                        <Link to={`/note/edit/${note.id}`}><button>Edit note</button></Link>
                        {/* EDIT NEEDS TO BE WHEN WE CLICK ON A NOTE*/}
                    </div>
                </li>
            ))}
            {showColorModal && (
                <ColorSelectionModal
                    colors={colors}
                    onClose={handleCloseColorModal}
                    onColorSelect={handleColorSelect}
                />
            )}
        </ul>
    )
}
