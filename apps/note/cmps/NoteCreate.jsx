const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"
import NoteCreateExpand from "./NoteCreateExpand.jsx"
import useClickAway from "../services/useClickAway.js"

export function NoteCreate({ loadNotes }) {
  const [isOpen, setIsOpen] = useState(false)
  const [noteType, setNoteType] = useState('')

  const handleClose = () => {
    setIsOpen(false)
  }
  const ref = useClickAway(handleClose);


  function handleUserInteraction(type) {
    setIsOpen(true)
    setNoteType(type)
  }

  //TODO FIX THIS 
  return (
    <section className="input-container" ref={ref}>
      {!isOpen && (
        <React.Fragment>
          <input type="text" className="input-field" placeholder="Take a note..." onClick={() => handleUserInteraction('NoteTxt')} />
          <div className="input-btns">
            {noteService.renderActionButton("txt-input-btn", () => handleUserInteraction('NoteTxt'), "fa-solid fa-font")}
            {noteService.renderActionButton("img-input-btn", () => handleUserInteraction('NoteImg'), "fa-solid fa-image")}
            {noteService.renderActionButton("video-input-btn", () => handleUserInteraction('NoteVideo'), "fa-brands fa-youtube")}
            {noteService.renderActionButton("audio-input-btn", () => handleUserInteraction('NoteAudio'), "fa-solid fa-volume-high")}
            {noteService.renderActionButton("list-input-btn", () => handleUserInteraction('NoteTodos'), "fa-solid fa-list-check")}
          </div>
        </React.Fragment>
      )}
      {isOpen && <NoteCreateExpand
        noteType={noteType}
        handleClose={handleClose}
        loadNotes={loadNotes}
      />}
    </section>
  )
}