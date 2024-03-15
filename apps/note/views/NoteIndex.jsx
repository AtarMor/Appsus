const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React


import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFIlter.jsx"
import { NoteSubFilter } from "../cmps/NoteSubFilter.jsx"

import { noteService } from "../services/note.service.js"
import { NoteCreate } from "../cmps/NoteCreate.jsx"

export function NoteIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))
  const [pinnedNotes, setPinnedNotes] = useState(null)

  useEffect(() => {
    setSearchParams(filterBy)
    loadNotes()
  }, [filterBy])

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
  }

  function loadNotes() {
    noteService.query(filterBy)
      .then((notes) => {
        setNotes(notes)
      })
      .catch((err) => {
        console.log('could not load notes', err)
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

  function onUpdateNote(noteToUpdate) {
    if (noteToUpdate.id) {
      updateExistingNote(noteToUpdate)
    } else {
      createNewNote(noteToUpdate)
    }
  }

  function updateExistingNote(noteToUpdate) {
    noteService.save(noteToUpdate)
      .then((savedNote) => {
        loadNotes();
        setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
        console.log('updated!')
      })
      .catch(err => {
        console.log('could not update', err)
      });
  }

  function createNewNote(noteToUpdate) {
    noteService.save(noteToUpdate)
      .then((savedNote) => {
        loadNotes()
        setNotes(prevNotes => [savedNote, ...prevNotes])
        console.log('created!')
      })
      .catch(err => {
        console.log('could not create', err)
      })
  }

  function onPinNote(noteToUpdate) {
    const updatedNote = {
      ...noteToUpdate,
      isPinned: !noteToUpdate.isPinned,
    }
    console.log(noteToUpdate)
    onUpdateNote(updatedNote)
  }


  console.log('hardcoded notes:', notes)

  const { title } = filterBy

  if (!notes) return <div>loading...</div>

  return (
    <React.Fragment>
      <div className="note-create-container">
        <NoteCreate
          loadNotes={loadNotes} />
        <NoteFilter
          onSetFilter={onSetFilter}
          filterBy={{ title }} />

        {/* <NoteSubFilter
      filterBy={{ check }}
      onSetFilter={onSetFilter}
    /> */}
      </div>
      <section className="note-index">


        <div className="btns-container">
          {/* <Link to="/note/edit"><button className='create-btn'>New Note</button></Link> */}
        </div>

        <NoteList
          notes={notes}
          onRemoveNote={onRemoveNote}
          onUpdateNote={onUpdateNote}
          onPinNote={onPinNote}
        />
      </section>
    </React.Fragment>)
}
