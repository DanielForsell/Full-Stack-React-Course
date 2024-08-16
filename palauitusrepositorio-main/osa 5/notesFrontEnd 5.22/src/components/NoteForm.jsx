import { useState } from 'react'


const NoteForm = ({ createNote }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [newVotes, setNewVotes] = useState('')


    const addNote = (event) => {
        event.preventDefault()
    
        createNote({
            author: newAuthor,
            title: newTitle,
            url: newURL,
            votes: newVotes,
            important: true
        })
        setNewAuthor('')
        setNewTitle('')
        setNewURL('')
        setNewVotes('')
    }


    return (
      <div>
        <h2>Create a new note</h2>
  
        <form onSubmit={addNote}>
            <div>
            Author: 
            <input 
                value={newAuthor} 
                onChange={event => setNewAuthor(event.target.value)} 
                placeholder='author'
                data-testid="author"
                />
            </div>
            <div>
            Title: 
            <input 
                value={newTitle} 
                onChange={event => setNewTitle(event.target.value)}
                placeholder="title" 
                data-testid="title"
                />
            </div>
            <div>
            URL: 
            <input 
                value={newURL} 
                onChange={event => setNewURL(event.target.value)} 
                placeholder='url'
                data-testid="url"
                />
            </div>
            <div>
            Votes: 
            <input 
                value={newVotes} 
                onChange={event => setNewVotes(event.target.value)} 
                placeholder='votes'
                data-testid="votes"
                />
            </div>
            <button type="submit">Create</button>
        </form>
      </div>
    )
  }
  
  export default NoteForm