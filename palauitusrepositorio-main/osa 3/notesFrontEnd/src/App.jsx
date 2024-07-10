import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [newVotes, setNewVotes] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      author: newAuthor,
      title: newTitle,
      url: newURL,
      votes: newVotes,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewAuthor('')
        setNewTitle('')
        setNewURL('')
        setNewVotes('')
      })
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleURLChange = (event) => {
    console.log(event.target.value)
    setNewURL(event.target.value)
  }

  const handleVotesChange = (event) => {
    console.log(event.target.value)
    setNewVotes(event.target.value)
  }

  const Note = ({ note, toggleImportance }) => {
    const label = note.important
      ? 'make not important' : 'make important'
  
    return (
      <div>
        Author: {note.author} Title: {note.title} URL: {note.url} Votes: {note.votes} <br />
        
        <button onClick={toggleImportance}>{label}</button>
      </div>
    )
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response))
  }).catch(error => {
    setErrorMessage(
      `Note '${note.content}' was already removed from server`
    )
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000);
    setNotes(notes.filter(n => n.id !== id))
  })
  }


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        
      </div>

      <form onSubmit={addNote}>
        <div>
          Author: <input value={newAuthor} onChange={handleAuthorChange}/>
        </div>
        <div>
          Title: <input value={newTitle} onChange={handleTitleChange}/>
        </div>
        <div>
          URL: <input value={newURL} onChange={handleURLChange} />
        </div>
        <div>
          Votes: <input value={newVotes} onChange={handleVotesChange} />
        </div>
        
        
         
        <button type="submit">save</button>
      </form>

      <ul>
        {notesToShow.map(note =>
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      
      <Footer />
    </div>
  )
}

export default App 