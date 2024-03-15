const { useState } = React


import { NotePreview } from "./NotePreview.jsx"

import { EditNoteModal } from "./EditNoteModal.jsx"
import NoteActions from "./NoteActions.jsx"

export function NoteList({ notes, onUpdateNote, setNotes }) {
  const [selectedNote, setSelectedNote] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)


  if (!notes.length) return <div className="empty-notes-msg flex justify-center align-center">No notes here, make some!</div>

  const handleEditNote = (note) => {
    setSelectedNote(note)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

  const handleUpdateNote = (updatedNote) => {
    console.log('Updated note:', updatedNote)
    onUpdateNote(updatedNote)
    setShowEditModal(false)
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id} className="note-item" style={{
          backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white'
        }}>
          <NotePreview note={note} />
          <NoteActions note={note}
            onUpdateNote={onUpdateNote}
            setNotes={setNotes}
            notes={notes} />
        </li>
      ))}
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
