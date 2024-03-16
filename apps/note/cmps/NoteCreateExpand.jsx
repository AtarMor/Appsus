const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

import NoteAudio from "./dynamic-cmps/NoteAudio.jsx"
import NoteImg from "./dynamic-cmps/NoteImg.jsx"
import NoteTodos from "./dynamic-cmps/NoteTodos.jsx"
import NoteTxt from "./dynamic-cmps/NoteTxt.jsx"
import NoteVideo from "./dynamic-cmps/NoteVideo.jsx"
import NoteActions from "./NoteActions.jsx"



export default function NoteCreateExpand({ noteType, handleClose, loadNotes, onUpdateNote, setNotes, note }) {
  const [isPinned, setIsPinned] = useState(false)
  const [title, setTitle] = useState('')
  const [info, setInfo] = useState('')



  function returnNoteCreator() {
    switch (noteType) {
      case 'NoteTxt':
        return <NoteTxt info={info} setInfo={setInfo} />
      case 'NoteImg':
        return <NoteImg info={info} setInfo={setInfo} />
      case 'NoteVideo':
        return <NoteVideo info={info} setInfo={setInfo} />
      case 'NoteAudio':
        return <NoteAudio info={info} setInfo={setInfo} />
      case 'NoteTodos':
        return <NoteTodos info={info} setInfo={setInfo} />
      default:
        return <NoteTxt info={info} setInfo={setInfo} />
    }
  }

  function handleNoteSave() {
    const canSave = checkIfCanSave()
    if (canSave) saveNote()
    else handleClose()
  }

  function saveNote() {
    const createdNote = noteService.createNote(title, noteType, isPinned, info, {})
    if (note) {
      createdNote.id = note.id
      createdNote.style.backgroundColor = note.style.backgroundColor
    }
    noteService.save(createdNote)
      .then(savedNote => {
        loadNotes()
        handleClose()
        console.log('note saved!', savedNote)
      })
      .catch(err => {
        console.log('could not save note', err)
      })

  }

  function checkIfCanSave() {
    if (title.length || info.length) {
      return true
    }
    return false
  }

  function getRelevantInfo(type) {
    switch (type) {
      case 'NoteTxt':
        return (note.info.txt && note.info.txt.length) ? note.info.txt : ''
      case 'NoteTodos':
        const stringTodos = note.info.todos.map(todo => todo.txt).join(',')
        return (stringTodos && stringTodos.length) ? stringTodos : ''
      default:
        return (note.info.url && note.info.url.length) ? note.info.url : ''
    }
  }

  useEffect(() => {
    if (!note) return
    setInfo(note.info = getRelevantInfo(note.type))
    setTitle(note.title ? note.title : '')
    setIsPinned(note.isPinned)
    console.log(note)
  }, [note])

  return (<React.Fragment>
    <section className={`note-creator-container ${note ? 'half-width' : ''}`} >
      <div className="title-input-container">
        <input type="text" className="title-input" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        {noteService.renderActionButton("pin-btn", () => setIsPinned(!isPinned), "fa-solid fa-thumbtack", isPinned ? { color: '#FFD43B' } : {})}
      </div>
      <div className="dynamic-cmp">
        {returnNoteCreator()}
      </div>
      <div className="footer-btns-container">
        <div className="footer-action-btns">
          <NoteActions note={{ title, info }}
            onUpdateNote={onUpdateNote}
            setNotes={setNotes} />
        </div>
        <div className="footer-close-btn">
          <button onClick={handleNoteSave}>close</button>
        </div>
      </div>

    </section>
  </React.Fragment>)
}
