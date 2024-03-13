import { noteService } from "../services/note.service.js"

export function NoteList() {
    const [notes, setNotes] = useState(null)

    if (!notes) return <div> loading notes </div>
    return <div>note list</div>
}
