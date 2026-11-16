import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import Note from './components/Note'



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
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const logOut = (() => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken(null)
    setErrorMessage('logged out successfully')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  })

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)


    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('logged in successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setErrorStatus('red')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorStatus(null)
      }, 5000)
    }
  }



  const notesToShow = showAll
  ? notes.sort((a, b) => a.url.length - b.url.length)
  : notes.filter(note => note.important).sort((a, b) => a.url.length - b.url.length)


  const addNote = (noteObject) => {

    if (notes.some(note => note.title === noteObject.title)) {
      setErrorMessage('Title is already in the list, updating it with new content')

      const note = notes.find(note => note.title === noteObject.title)
      const changedNote = { ...note, author: noteObject.author, url: noteObject.url, votes: noteObject.votes }

      noteService.update(note.id, changedNote).then(response => {
        setNotes(notes.map(note => note.id !== response.id ? note : response))

      }).catch(error => {
        setErrorMessage(
          `Article '${noteObject.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== note.id))
      })

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }

    console.log('noteObject: ', noteObject);

    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setErrorMessage(`Added article by ${noteObject.author} with title ${noteObject.title}`)
      })

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }


  const deleteArticle = (id) => {
    console.log('deleting article by id: ', id);
    if (window.confirm(`Are you sure that you want to delete article by id: ${id}?`)) {

      noteService.deleteArticle(id)
        .then(response => {
          console.log('deleted note')
          setNotes(notes.filter(note => note.id !== id))
        })
      setErrorMessage(`Deleted note by id: ${id}`)
      setErrorStatus('red')

      setTimeout(() => {
        setErrorMessage(null)
        setErrorStatus(null)
      }, 5000);
    }


  }

  const likeNote = (id) => {
    const note = notes.find(note => note.id === id)
      const changedNote = { ...note, votes: note.votes + 1}

      noteService.update(note.id, changedNote).then(response => {
        setNotes(notes.map(note => note.id !== response.id ? note : response))

      }).catch(error => {
        setErrorMessage(
          `Article '${noteObject.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== note.id))
      })
  }


  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response))
    }).catch(error => {
      setErrorMessage(
        `Note '${note.title}' was already removed from server`
      )
      setErrorStatus('red')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorStatus(null)
      }, 5000);
      setNotes(notes.filter(n => n.id !== id))
    })
  }



  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const noteForm = () => {

    return (
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )
  }


  const noteList = () => (
    <form>
      <div>
        <button onClick={(event) => {
          event.preventDefault()
          setShowAll(!showAll)
        }}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteArticle={() => deleteArticle(note.id)} 
            likeNote={() => likeNote(note.id)}/>
        )}
      </ul>

    </form>
  )


  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} color={errorStatus} />

      <h2>Login in to the application</h2>

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in
          <button style={{ marginLeft: '10px' }} onClick={logOut}> Logout</button>
        </p>
        {noteForm()}
      </div>
      }

      <br />

      {user && noteList()}

      <Footer />
    </div>
  )
}

export default App 