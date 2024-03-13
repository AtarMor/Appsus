
const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {

    if (!notes.length) return <div>No notes here!</div>
    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`} className="note-link">
                        <div className="note-content">
                            <NotePreview note={note} />
                        </div>
                        <div className="note-actions">
                            <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
