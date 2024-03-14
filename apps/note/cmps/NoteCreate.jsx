const { useState, useEffect } = React

export function NoteCreate() {
  const [isOpen, setIsOpen] = useState(false)

  function handleUserInteraction() {
    setIsOpen(true)
  }

  function renderActionButton(className, onClick, iconClassName, style) {
    return (
      <div className={'hover-circle'}>
        <button className={'btn ' + className} onClick={onClick}>
          <div className={iconClassName} style={style}></div>
        </button>
      </div>
    )
  }

  return (
    <section className="input-container">
      <input type="text" className="input-field" placeholder="Take a note..." />
      <div className="input-btns">
        {renderActionButton("txt-input-btn", () => onTxtInput(note), "fa-solid fa-font")}
        {renderActionButton("img-input-btn", () => onImgInput(note), "fa-solid fa-image")}
        {renderActionButton("video-input-btn", () => onVideoInput(note), "fa-brands fa-youtube")}
        {renderActionButton("audio-input-btn", () => onAudioInput(note), "fa-solid fa-microphone")}
        {renderActionButton("list-input-btn", () => onListInput(note), "fa-solid fa-list-check")}
      </div>
    </section>
  )
}