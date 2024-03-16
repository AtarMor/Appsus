
const { useState } = React
import { ToDoList } from "./ToDoList.jsx"

export function NotePreview({ note, onUpdateTodo }) {
  return (
    <article className="note-preview">
      {note.info.title && <h5 className="note-title">{note.info.title}</h5>}
      {note.type === 'NoteTxt' && note.info.txt && <p className="note-txt-content">{note.info.txt}</p>}
      {note.type === 'NoteImg' && note.info.url && <img className="note-img" src={note.info.url} alt="Note Image" />}
      {note.type === 'NoteTodos' && note.info.todos && <ToDoList todos={note.info.todos} onUpdateTodo={onUpdateTodo} noteId={note.id} />}
      {note.type === 'NoteVideo' && note.info.url && (
        <iframe
          src={`https://www.youtube.com/embed/${note.info.url}`}
          width="100%"
          height="100%"
          title="Embedded video"
        ></iframe>
      )}
      {note.type === 'NoteAudio' && note.info.url && (
        <audio controls className="audio-player">
          <source src={note.info.url} type="audio/mpeg" />
        </audio>
      )}
    </article>
  )
}