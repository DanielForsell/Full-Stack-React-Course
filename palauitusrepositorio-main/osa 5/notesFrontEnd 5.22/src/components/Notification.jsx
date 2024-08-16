const Notification = ({ message, color }) => {
    if (message === null) {
      return null
    }
  
    
      if (color === 'red') {
        return (
        <div className="error">
          {message}
        </div>)
      
      } else {
        return (
        <div className="success">
          {message}
        </div>)
        
      }
    
  }

export default Notification