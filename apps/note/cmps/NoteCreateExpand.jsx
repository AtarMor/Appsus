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

  return (<React.Fragment>{returnNoteCreator()}</React.Fragment>)
}
