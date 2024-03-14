
const { Link } = ReactRouterDOM
const { useState } = React

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onPinNote }) {

    if (!notes.length) return <div className="empty-notes-msg flex justify-center align-center">No notes here, make some!</div>

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`} className="note-link">
                        <NotePreview note={note} />
                    </Link>
                    <div className="note-actions transparent">
                        <button className="archive-btn" onClick={() => onArchiveNote(note)}>archive</button>
                        <button className="pin-btn" onClick={() => onPinNote(note)}>
                            {note.isPinned ? 'unpin' : 'pin'}</button>
                        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
                        {/* <button className="change-color" onClick={() => onOpenColor(note.id)}>change color</button> */}
                        <Link to={`/note/edit/${note.id}`}><button>Edit note</button></Link>
                        {/* EDIT NEEDS TO BE WHEN WE CLICK ON A CARD */}
                    </div>
                </li>
            ))}
        </ul>
    )
}
