const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [note, setNote] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadDetails()
    }, [params.noteId])

    function loadDetails() {
        setIsLoading(true)
        noteService.get(params.noteId)
            .then(note => setNote(note))
            .catch(err => {
                console.log('Had issues loading note', err)
                navigate('/note')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNote(null)
                navigate('/note')
            })
            .catch((err) => {
                console.log('Had issues removing note', err)
            })
    }

    if (isLoading) return <div>Loading details..</div>
    if (!note) return <div>Note deleted</div>
    return <section className="note-details">
        <h1>{note.id}</h1>
        <h1>{note.type}</h1>
        <div className="actions">
            <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>Delete</button>
            <Link to={`/note`}><button>Return to notes</button></Link>
        </div>
    </section>
}