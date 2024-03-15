
export default function NoteAudio({ info, setInfo }) {
  return <React.Fragment>
    <input className="note-audio-input" placeholder="Enter audio URL..." value={info} onChange={(ev) => setInfo(ev.target.value)} />
  </React.Fragment>
}

