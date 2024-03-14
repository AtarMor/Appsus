//TODO dynamically choose the type of node according to note type

import { ToDoList } from "./ToDoList.jsx"

export function NotePreview({ note }) {
    return <article className="note-preview">
        {note.info.title && <h5 className="note-title">{note.info.title}</h5>}
        {note.type === 'NoteTxt' && note.info.txt && <p className="note-txt-content">{note.info.txt}</p>}
        {note.type === 'NoteImg' && note.info.url && <img className="note-img" src={note.info.url} alt="Note Image" />}
        {note.type === 'NoteTodos' && note.info.todos && <ToDoList todos={note.info.todos} />}
    </article>
}