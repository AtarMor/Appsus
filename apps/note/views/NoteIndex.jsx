const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect, fragment } = React


import { NoteList } from "../cmps/NoteList.jsx"

import { noteService } from "../services/note.service.js"



export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    //TODO useEffect for filtering
    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                console.log('note removed!') //TODO replace with message
            })
            .catch((err) => {
                console.log('could not remove note', err) //TODO replace with message
            })
    }
    console.log('notes from index:', notes)
    if (!notes) return <div>loading...</div>
    return <section className="note-index">
        <Link to="/note/edit"><button>New Note</button></Link>
        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
        />
    </section>
}
