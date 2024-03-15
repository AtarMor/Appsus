const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"
import NoteCreateExpand from "./NoteCreateExpand.jsx"

export function NoteCreate() {
  const [isOpen, setIsOpen] = useState(false)
  const [noteType, setNoteType] = useState('')

  function handleUserInteraction(type) {
    setIsOpen(true)
    setNoteType(type)
  }

  return (
    <section className="input-container">
      {!isOpen && (
        <React.Fragment>
          <input type="text" className="input-field" placeholder="Take a note..." onClick={() => handleUserInteraction('NoteTxt')} />
          <div className="input-btns">
            {noteService.renderActionButton("txt-input-btn", () => handleUserInteraction('NoteTxt'), "fa-solid fa-font")}
            {noteService.renderActionButton("img-input-btn", () => handleUserInteraction('NoteImg'), "fa-solid fa-image")}
            {noteService.renderActionButton("video-input-btn", () => handleUserInteraction('NoteVideo'), "fa-brands fa-youtube")}
            {noteService.renderActionButton("audio-input-btn", () => handleUserInteraction('NoteAudio'), "fa-solid fa-microphone")}
            {noteService.renderActionButton("list-input-btn", () => handleUserInteraction('NoteTodos'), "fa-solid fa-list-check")}
          </div>
        </React.Fragment>
      )}
      {isOpen && <NoteCreateExpand noteType={noteType} />}
    </section>
  )
}