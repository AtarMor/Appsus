const { useState } = React


import { NotePreview } from "./NotePreview.jsx"
import { utilService } from "../../../services/util.service.js"
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

  const handleUpdateTodo = (noteId, updatedTodos) => {
    const updatedNote = notes.find(note => note.id === noteId && note.type === 'NoteTodos')
    if (!updatedNote) {
      console.error('Note not found with ID:', noteId)
      return
    }
    updatedNote.info.todos = updatedTodos
    onUpdateNote(updatedNote)
  }

  const pinnedNotes = notes.filter(note => note.isPinned)
  const unpinnedNotes = notes.filter(note => !note.isPinned)

  return (
    <div className="note-list-container">
      <div className="pinned-notes">
        {pinnedNotes.length ? <h5>Pinned Notes</h5> : ''}
        <ul className="note-list">
          {pinnedNotes.map((note) => (
            <li key={note.id} className="note-item" style={{ backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white' }}>
              <NotePreview note={note} />
              <NoteActions
                note={note}
                onUpdateNote={onUpdateNote}
                setNotes={setNotes}
                isNoteList
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="unpinned-notes">
        {pinnedNotes.length && unpinnedNotes.length ? <h5>Others</h5> : ''}
        <ul className="note-list">
          {unpinnedNotes.map((note) => (
            <li key={note.id} className="note-item" style={{ backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white' }}>
              <NotePreview
                note={note}
                onUpdateTodo={handleUpdateTodo} />
              <NoteActions
                note={note}
                onUpdateNote={onUpdateNote}
                setNotes={setNotes}
                isNoteList
              />
            </li>
          ))}
        </ul>
      </div>
      {showEditModal && (
        <EditNoteModal
          note={selectedNote}
          onClose={handleCloseEditModal}
          onUpdateNote={handleUpdateNote}
        />
      )}
    </div>
  )
}