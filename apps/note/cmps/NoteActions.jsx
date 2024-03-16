import { noteService } from "../services/note.service.js"
import { ColorSelectionModal } from "./ColorSelectionModal.jsx"
const { useState } = React

const COLORS = ['#d3bfdb', '#fff8b8', '#d4e4ed', '#f6e2dd', '#faafa8', '#f39f76', '#b4ddd3', '#e2f6d3', '#efeff1']

export default function NoteActions({ note, notes, onUpdateNote, setNotes, isNoteList }) {
  const [showColorModal, setShowColorModal] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [currentColor, setCurrentColor] = useState('#ff0000')

  function onRemoveNote(noteId) {
    noteService.remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
        console.log('note removed!')
      })
      .catch((err) => {
        console.log('could not remove note', err)
      })
  }

  function onPinNote(noteToUpdate) {
    const updatedNote = {
      ...noteToUpdate,
      isPinned: !noteToUpdate.isPinned,
    }
    onUpdateNote(updatedNote)
  }

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
    setCurrentColor(color)
  }

  const updateNoteColor = (noteId, color) => {
    console.log('notes:', notes, 'noteId:', noteId)
    const noteToUpdate = notes.find(note => note.id === noteId)
    if (noteToUpdate) {
      noteToUpdate.style.backgroundColor = color
      noteService.save(noteToUpdate)
        .then(() => {
          const updatedNotes = notes.map((note) => {
            if (note.id === noteId) {
              return { ...note, style: { backgroundColor: color } }
            } else {
              return note
            }
          })
          setNotes(updatedNotes)
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
    <React.Fragment>
      <div className={`note-actions ${isNoteList ? 'transparent' : ''}`}>
        {noteService.renderActionButton("archive-btn", () => onArchiveNote(note), "fa-solid fa-box-archive")}
        {isNoteList && noteService.renderActionButton("pin-btn", () => onPinNote(note), "fa-solid fa-thumbtack", note.isPinned ? { color: '#FFD43B' } : {})}
        {isNoteList && noteService.renderActionButton("remove-btn", () => onRemoveNote(note.id), "fa-solid fa-trash")}
        {noteService.renderActionButton("change-color", () => handleOpenColorModal(note.id), "fa-solid fa-palette")}
      </div>
      <div>
        {showColorModal && (
          <ColorSelectionModal
            colors={COLORS}
            onClose={handleCloseColorModal}
            onColorSelect={handleColorSelect}
            currentColor={currentColor}
          />
        )}
      </div>
    </React.Fragment>)
}
