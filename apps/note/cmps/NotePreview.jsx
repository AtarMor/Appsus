//TODO dynamically choose the type of node according to note type
//! currently only prints the type of the note

export function NotePreview({ note }) {
    return <article className="note-preview">
        <p>{note.type}</p>
    </article>
}