
export default function NoteVideo({ info, setInfo }) {
  return (
    <React.Fragment>
      <input className="note-video-input" placeholder="Enter video URL..." value={info} onChange={(ev) => setInfo(ev.target.value)} />
    </React.Fragment>
  )
}
