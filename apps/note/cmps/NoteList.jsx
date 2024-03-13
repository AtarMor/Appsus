//TODO link

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {

    if (!notes.length) return <div>No notes here!</div>
    return <ul className="note-list">
        {
            notes.map(note => <li key={note.id}>
                <NotePreview note={note} />
                <div className="note-actions">
                    <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
                </div>
            </li>)
        }
    </ul>
}
