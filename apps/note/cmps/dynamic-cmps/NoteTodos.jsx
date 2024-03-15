
export default function NoteTodos({ info, setInfo }) {
  return (
    <React.Fragment>
      <input className="note-todos-input" placeholder="Enter a comma separated list..." value={info} onChange={(ev) => setInfo(ev.target.value)} />
    </React.Fragment>
  )
}
