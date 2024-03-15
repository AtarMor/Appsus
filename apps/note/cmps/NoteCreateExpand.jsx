import NoteAudio from "./dynamic-cmps/NoteAudio.jsx"
import NoteImg from "./dynamic-cmps/NoteImg.jsx"
import NoteTodos from "./dynamic-cmps/NoteTodos.jsx"
import NoteTxt from "./dynamic-cmps/NoteTxt.jsx"
import NoteVideo from "./dynamic-cmps/NoteVideo.jsx"


export default function NoteCreateExpand({ noteType }) {

  function returnNoteCreator() {
    switch (noteType) {
      case 'NoteTxt':
        return <NoteTxt />
      case 'NoteImg':
        return <NoteImg />
      case 'NoteVideo':
        return <NoteVideo />
      case 'NoteAudio':
        return <NoteAudio />
      case 'NoteTodos':
        return <NoteTodos />
      default:
        return <NoteTxt />
    }
  }

  return (<React.Fragment>
    <section className="note-creator-container">
      <div className="title-input-container">
        <input type="text" className="title-input" placeholder="Title"></input>
        <button className="pin-btn" onClick={console.log('pinned!')}>pin</button>
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
          <button>close</button>
        </div>
      </div>

    </section>
  </React.Fragment>)
}
