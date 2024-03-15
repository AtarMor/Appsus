
export default function NoteImg({ info, setInfo }) {
  return (
    <React.Fragment>
      <input className="note-img-input" placeholder="Enter image URL..." value={info} onChange={(ev) => setInfo(ev.target.value)} />
    </React.Fragment>
  )
}

