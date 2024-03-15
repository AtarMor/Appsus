
export default function NoteTxt({ info, setInfo }) {
  return (
    <React.Fragment>
      <input className="note-text-input" placeholder="Take a note..." value={info} onChange={(ev) => setInfo(ev.target.value)} />
    </React.Fragment>
  )
}
