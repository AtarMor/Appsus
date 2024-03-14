const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteCreate() {
  const [isOpen, setIsOpen] = useState(false)

  function handleUserInteraction() {
    setIsOpen(true)
  }

  return (
    <section className="input-container">
      <input type="text" className="input-field" placeholder="Take a note..." />
      <div className="input-btns">
        {noteService.renderActionButton("txt-input-btn", () => onTxtInput(note), "fa-solid fa-font")}
        {noteService.renderActionButton("img-input-btn", () => onImgInput(note), "fa-solid fa-image")}
        {noteService.renderActionButton("video-input-btn", () => onVideoInput(note), "fa-brands fa-youtube")}
        {noteService.renderActionButton("audio-input-btn", () => onAudioInput(note), "fa-solid fa-microphone")}
        {noteService.renderActionButton("list-input-btn", () => onListInput(note), "fa-solid fa-list-check")}
      </div>
    </section>
  )
}