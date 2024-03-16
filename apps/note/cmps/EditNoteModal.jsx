import NoteCreateExpand from "./NoteCreateExpand.jsx"

const { useState } = React

export function EditNoteModal({ note, onClose, loadNotes, onUpdateNote, setNotes, isOpen }) {

  return (
    <dialog open={isOpen} className="edit-modal">

      <NoteCreateExpand
        noteType={note.type}
        loadNotes={loadNotes}
        onUpdateNote={onUpdateNote}
        setNotes={setNotes}
        note={note}
        handleClose={onClose}
      />
    </dialog>
  )
}