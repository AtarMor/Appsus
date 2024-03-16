import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
//hardcoded notes
const notes = [
  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://www.shutterstock.com/image-photo/two-dogs-smile-260nw-684918079.jpg',
      title: ''
    },
    style: {
      backgroundColor: '#d3bfdb'
    }
  },
  {
    id: 'n140',
    type: 'NoteVideo',
    isPinned: false,
    info: {
      url: 'fgl3nw1R5Ac',
      title: ''
    },
    style: {
      backgroundColor: '##f6e2dd'
    }
  },
  {
    id: 'n104',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'learn react', doneAt: null },
        { txt: 'finish the sprint', doneAt: null },
        { txt: 'eat dinner', doneAt: null },
        { txt: 'walk the dog', doneAt: null },
        { txt: 'cook food for tomorrow', doneAt: null }
      ]
    },
    style: {
      backgroundColor: '#fff8b8'
    }
  },
  {
    id: 'n105',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#d4e4ed'
    },
    info: {
      txt: 'Remember to hydrate!'
    }
  },
  {
    id: 'n107',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbWitrQVchxsz7ZISxescTWLQNnKP8ctdhw&usqp=CAU',
      title: 'me when sprint 3'
    },
    style: {
      backgroundColor: '#f6e2dd'
    }
  },
  {
    id: 'n108',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      todos: [
        { txt: 'Go to sleep early', doneAt: null },
        { txt: 'Be better', doneAt: null },
      ]
    },
    style: {
      backgroundColor: '#faafa8'
    }
  },
  {
    id: 'n109',
    type: 'NoteImg',
    isPinned: true,
    info: {
      url: 'https://picsum.photos/200',
      title: 'good vibes only'
    },
    style: {
      backgroundColor: '#f39f76'
    }
  },
  {
    id: 'n110',
    type: 'NoteTxt',
    isPinned: false,
    info: {
      txt: 'Call mom'
    },
    style: {
      backgroundColor: '#b4ddd3'
    }
  },
  // {
  //   id: 'n112',
  //   type: 'NoteAudio',
  //   isPinned: true,
  //   info: {
  //     url: 'https://www.myinstants.com/media/sounds/mlg-airhorn.mp3',
  //     title: ''
  //   },
  //   style: {
  //     backgroundColor: '#e2f6d3'
  //   }
  // },
  {
    id: 'n113',
    type: 'NoteTodos',
    isPinned: true,
    info: {
      todos: [
        { txt: 'eggs', doneAt: null },
        { txt: 'milk', doneAt: null },
        { txt: 'bread', doneAt: null }
      ],
      title: 'Buy groceries'
    },
    style: {
      backgroundColor: '#e2f6d3'
    }
  },
  {
    id: 'n120',
    type: 'NoteImg',
    isPinned: true,
    info: {
      url: 'https://picsum.photos/300',
      title: 'feelin good'
    },
    style: {
      backgroundColor: '#efeff1'
    }
  },
  {
    id: 'n121',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://picsum.photos/299',
      title: 'eat healthy'
    },
    style: {
      backgroundColor: '#d3bfdb'
    }
  }
]

const NOTE_KEY = 'noteDB'

_createHardCodedNotes(notes)


export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
  getFilterFromParams,
  renderActionButton,
  createNote,
}

function query(filterBy = getDefaultFilter()) {
  return storageService.query(NOTE_KEY)
    .then(notes => {
      if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        notes = notes.filter(note => {
          if (regex.test(note.info.title) || (note.info.txt && regex.test(note.info.txt))) {
            return true
          }
          if (note.info.todos) {
            for (const todo of note.info.todos) {
              if (todo.txt && regex.test(todo.txt)) {
                return true
              }
            }
          }
          return false
        })
      }
      notes.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
      return notes
    })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
    .then(note => _setNextPrevId(note))
}

function remove(note) {
  return storageService.remove(NOTE_KEY, note)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(type = '', info) {
  return {
    id: '',
    createdAt: 0,
    type,
    isPinned: false,
    style: {
      backgroundColor: 'white',
    },
    info: '',
  }
}

//TODO filter stuff
function getDefaultFilter() {
  //TODO add more
  return { title: '' }
}

function getFilterFromParams(searchParams = {}) {
  const defaultFilter = getDefaultFilter()
  return {
    title: searchParams.get('title') || defaultFilter.title,
    //TODO add more
  }
}

//TODO dynamically created notes
function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(createNote('NoteTxt'))
  }

}

//! hardcoded notes
function _createHardCodedNotes(notes) {
  const existingNotes = utilService.loadFromStorage(NOTE_KEY)

  if (!existingNotes || !existingNotes.length) {
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote(title = '', type, isPinned, info = '', style) {
  const note = getEmptyNote(type, info)
  note.createdAt = Date.now()
  note.isPinned = isPinned
  note.style = style
  note.info = { title }
  switch (type) {
    case 'NoteTxt':
      note.info.txt = info
      break
    case 'NoteTodos':
      const splitList = info.split(',')
      note.info.todos = splitList.map(item => ({ txt: item, doneAt: null }))
      break
    case 'NoteImg':
      note.info.url = info
      break
    case 'NoteVideo':
      note.info.url = getYouTubeId(info)
      break
    case 'NoteAudio':
      note.info.url = info
      break
  }

  return note
}


function _setNextPrevId(note) {
  return storageService.query(NOTE_KEY).then((notes) => {
    const carIdx = notes.findIndex((currNote) => currNote.id === note.id)
    const nextNote = notes[carIdx + 1] ? notes[carIdx + 1] : notes[0]
    const prevNote = notes[carIdx - 1] ? notes[carIdx - 1] : notes[notes.length - 1]
    note.nextCarId = nextNote.id
    note.prevCarId = prevNote.id
    return note
  })
}

function renderActionButton(className, onClick, iconClassName, style) {
  return (
    <div>
      <button className={'btn ' + className} onClick={onClick}>
        <div className={iconClassName} style={style}></div>
      </button>
    </div>
  )
}

function getYouTubeId(url) {
  const regex = /(?:v=)(.{11})/
  const match = url.match(regex)
  if (match && match[1]) {
    return match[1]
  }
}
