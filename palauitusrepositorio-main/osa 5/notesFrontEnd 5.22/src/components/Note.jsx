import React, { useState } from 'react'

const Note = ({ note, toggleImportance, deleteArticle, likeNote }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  const [viewButtonText, setViewButtonText] = useState('view');
  const [isViewMode, setIsViewMode] = useState(false);

  const handleViewToggle = (event) => {
    event.preventDefault();
    setViewButtonText(viewButtonText === 'view' ? 'hide' : 'view');
    
    setIsViewMode(!isViewMode);
  };

  const blogStyle = {
    padding: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5
  }


  return (
    <div style={blogStyle}>

      Title:{note.title} <br />
      {isViewMode && (
        <>
          URL:{note.url}  <br />
          Votes:{note.votes} 

          <button style={{marginLeft : '5px'}} onClick={(event) => {
            event.preventDefault();
            likeNote()
            
          }}>like</button>
          
          <br />
          Author:{note.author} <br />
        </>
      )}

      

      <button
        style={{ marginRight: '5px', marginTop: '5px' }}
        onClick={(event) => {
          event.preventDefault();
          toggleImportance();
        }}>
        {label}
      </button>

      <button style={{ marginRight: '5px' }} onClick={(event) => {
        event.preventDefault();
        deleteArticle();
        
      }}>
        Delete
      </button >

      <button style={{ marginRight: '5px' }} onClick={handleViewToggle}>
        {viewButtonText}</button>
    </div>
  )
}

export default Note