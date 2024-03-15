// const { useState, useEffect } = React
// const { useNavigate, useParams } = ReactRouter
// const { Link } = ReactRouterDOM

// import { noteService } from "../services/note.service.js"

// export function NoteEdit() {

//   const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
//   const navigate = useNavigate()
//   const { noteId } = useParams()

//   useEffect(() => {
//     if (noteId) loadNote()
//   }, [noteId])

//   function loadNote() {
//     noteService.get(noteId)
//       .then(note => setNoteToEdit(note))
//       .catch(err => {
//         console.log('could not load note', err)
//         navigate('/note')
//       })
//   }

//   function onSaveNote(ev) {
//     ev.preventDefault()

//     noteService.save(noteToEdit)
//       .then(savedNote => {
//         console.log('savedNote:', savedNote)
//         navigate('/note')
//       })
//       .catch(err => {
//         console.log('could not save note', err)
//       })
//   }

//   function handleChange({ target }) {
//     const field = target.name
//     let value = target.value

//     switch (target.type) {
//       case 'number':
//       case 'range':
//         value = +value || ''
//         break

//       case 'checkbox':
//         value = target.checked
//         break

//       default:
//         break
//     }

//     setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
//   }

//   const { type } = noteToEdit

//   return (
//     //TODO this only changes the type now, need to edit EVERYTHING
//     <section className="note-edit">
//       <form onSubmit={onSaveNote} >
//         <label htmlFor="type">Enter text:</label>
//         <input
//           type="type"
//           id="type"
//           placeholder="..."
//           name="type"
//           onChange={handleChange}
//           value={noteToEdit.type || ''}
//         //!THIS IS FOR DEBUGGING PURPOSES, THIS CHANGES THE TYPE OF THE NOTE!
//         />
//         <button>Save</button>
//         <Link to={`/note`}><button>Return</button></Link>
//       </form>
//     </section>
//   )
// }

