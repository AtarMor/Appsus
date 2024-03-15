const { Link } = ReactRouterDOM
const { useState } = React


import { NotePreview } from "./NotePreview.jsx"
import { ColorSelectionModal } from "./ColorSelectionModal.jsx"

import { noteService } from "../services/note.service.js"
import { EditNoteModal } from "./EditNoteModal.jsx"

export function NoteList({ notes, onRemoveNote, onPinNote, onUpdateNote }) {
    const [showColorModal, setShowColorModal] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedNoteId, setSelectedNoteId] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentColor, setCurrentColor] = useState('#ff0000')

    const colors = ['#d3bfdb', '#fff8b8', '#d4e4ed', '#f6e2dd', '#faafa8', '#f39f76', '#b4ddd3', '#e2f6d3', '#efeff1']

    if (!notes.length) return <div className="empty-notes-msg flex justify-center align-center">No notes here, make some!</div>

    const handleEditNote = (note) => {
        setSelectedNote(note)
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }

    const handleOpenColorModal = (noteId) => {
        setSelectedNoteId(noteId)
        setShowColorModal(true)
    }

    const handleCloseColorModal = () => {
        setShowColorModal(false)
    }

    const handleUpdateNote = (updatedNote) => {
        console.log('Updated note:', updatedNote)
        onUpdateNote(updatedNote)
        setShowEditModal(false)
    }

    const handleColorSelect = (color) => {
        setSelectedColor(color)
        updateNoteColor(selectedNoteId, color)
        handleCloseColorModal()
        setCurrentColor(color)
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
                    backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white'
                }}>
                    <Link to={`/note/${note.id}`} className="note-link">
                        <NotePreview note={note} />
                    </Link>
                    <div className="note-actions transparent">
                        {noteService.renderActionButton("archive-btn", () => onArchiveNote(note), "fa-solid fa-box-archive")}
                        {noteService.renderActionButton("pin-btn", () => onPinNote(note), "fa-solid fa-thumbtack", note.isPinned ? { color: '#FFD43B' } : {})}
                        {noteService.renderActionButton("remove-btn", () => onRemoveNote(note.id), "fa-solid fa-trash")}
                        {noteService.renderActionButton("change-color", () => handleOpenColorModal(note.id), "fa-solid fa-palette")}
                        {noteService.renderActionButton("edit-btn", () => handleEditNote(note), "fa-solid fa-pen-to-square")}
                        {/* EDIT NEEDS TO BE WHEN WE CLICK ON A NOTE*/}
                        {/* NEED TO ADD TOOLTIPS */}
                        {/* NEED TO ADD MODAL TO BE A CHILD OF THE ELEMENT SO IT APPEARS BELOW IT!!!*/}
                    </div>
                </li>
            ))}
            {showColorModal && (
                <ColorSelectionModal
                    colors={colors}
                    onClose={handleCloseColorModal}
                    onColorSelect={handleColorSelect}
                    currentColor={currentColor}
                />
            )}
            {showEditModal && (
                <EditNoteModal
                    note={selectedNote}
                    onClose={handleCloseEditModal}
                    onUpdateNote={handleUpdateNote}
                />
            )}
        </ul>
    )
}
