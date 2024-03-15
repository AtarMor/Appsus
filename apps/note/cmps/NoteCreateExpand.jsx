const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

import NoteAudio from "./dynamic-cmps/NoteAudio.jsx"
import NoteImg from "./dynamic-cmps/NoteImg.jsx"
import NoteTodos from "./dynamic-cmps/NoteTodos.jsx"
import NoteTxt from "./dynamic-cmps/NoteTxt.jsx"
import NoteVideo from "./dynamic-cmps/NoteVideo.jsx"

export default function NoteCreateExpand({ noteType, handleClose, loadNotes }) {
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
    if (canSave) createNewNote()
    else handleClose()
  }

  function createNewNote() {
    const createdNote = noteService.createNote(title, noteType, isPinned, info, {})
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

  return (<React.Fragment>
    <section className="note-creator-container">
      <div className="title-input-container">
        <input type="text" className="title-input" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <button className="pin-btn" onClick={() => setIsPinned(!isPinned)}>{isPinned ? 'unpin' : 'pin'}</button>
      </div>
      <div className="dynamic-cmp">
        {returnNoteCreator()}
      </div>
      <div className="footer-btns-container">
        <div className="footer-action-btns">
          <button>a</button>
          <button>b</button>
          <button>c</button>
          <button>d</button>
        </div>
        <div className="footer-close-btn">
          <button onClick={handleNoteSave}>close</button>
        </div>
      </div>

    </section>
  </React.Fragment>)
}
