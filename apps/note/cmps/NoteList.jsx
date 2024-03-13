
const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onPinNote }) {

    if (!notes.length) return <div>No notes here!</div>

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`} className="note-link">
                        <NotePreview note={note} />
                    </Link>
                    <div className="note-actions transparent">
                        <button className="pin-btn" onClick={() => onPinNote(note)}>
                            {note.isPinned ? 'unpin' : 'pin'}</button>
                        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
                        {/* <button className="change-color" onClick={() => onOpenColor(note.id)}>change color</button> */}
                        <Link to={`/note/edit/${note.id}`}><button>Edit note</button></Link>
                    </div>
                </li>
            ))}
        </ul>
    )
}
