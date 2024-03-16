const { useState } = React


import { NotePreview } from "./NotePreview.jsx"
import { utilService } from "../../../services/util.service.js"
import { EditNoteModal } from "./EditNoteModal.jsx"
import NoteActions from "./NoteActions.jsx"

const EMPTY_NOTE = {
  id: '',
  createdAt: 0,
  type: '',
  isPinned: false,
  style: {
    backgroundColor: 'white',
  },
  info: '',
}

export function NoteList({ notes, onUpdateNote, setNotes, loadNotes }) {
  const [selectedNote, setSelectedNote] = useState(EMPTY_NOTE)
  const [showEditModal, setShowEditModal] = useState(false)


  if (!notes.length) return <div className="empty-notes-msg flex justify-center align-center">No notes here, make some!</div>

  const handleEditNote = (note, ev) => {
    console.log('ev:', ev.target.tagName)
    console.log('parentNode', ev.target.parentElement.type)
    if (ev.target.tagName !== 'IMG') {
      if (ev.target.type === 'checkbox' || ev.target.parentElement.type === 'submit' || ev.target.parentElement.type === undefined) return
    }
    setSelectedNote(note)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedNote(EMPTY_NOTE)
    setTimeout(() => {
      console.log(showEditModal)
    },
      0)
  }

  const handleUpdateNote = (updatedNote) => {
    console.log('Updated note:', updatedNote)
    onUpdateNote(updatedNote)
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
            <li key={note.id} onClick={(ev) => handleEditNote(note, ev)} className="note-item" style={{ backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white' }}>
              <NotePreview
                note={note}
                onUpdateTodo={handleUpdateTodo} />
              <NoteActions
                note={note}
                onUpdateNote={onUpdateNote}
                setNotes={setNotes}
                isNoteList
                notes={notes}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="unpinned-notes">
        {pinnedNotes.length && unpinnedNotes.length ? <h5>Others</h5> : ''}
        <ul className="note-list">
          {unpinnedNotes.map((note) => (
            <li key={note.id} onClick={(ev) => handleEditNote(note, ev)} className="note-item" style={{ backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white' }}>
              <NotePreview
                note={note}
                onUpdateTodo={handleUpdateTodo} />
              <NoteActions
                note={note}
                onUpdateNote={onUpdateNote}
                setNotes={setNotes}
                isNoteList
                notes={notes}
              />
            </li>
          ))}
        </ul>
      </div>
      {showEditModal && <EditNoteModal
        note={selectedNote}
        onClose={handleCloseEditModal}
        onUpdateNote={handleUpdateNote}
        isOpen={showEditModal}
        loadNotes={loadNotes}
      />}
    </div>
  )
}