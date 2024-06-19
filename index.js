const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

  app.use(express.json())

  morgan.token('body', (req, res) => JSON.stringify(req.body))
  
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.get('/info', (request, response) => {
    response.send('Phonebook has info for ' + persons.length + ' people<br>' + new Date())
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const note = notes.find(persons => persons.id === id)
    console.log(note);
    if (note) {
        response.json(note)
      } else {
        return response.status(400).json({ 
        error: 'content missing'
        })
      }
      app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } else if (notes.find(note => note.name === note.name)) {

        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const note = {
        id: generateId(),
        content: body.name,
        important: body.important || false
      
    }
  
    notes = notes.concat(note)
  
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
    response.json(notes)
  })

//   const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }

//     app.use(requestLogger)


//     const unknownEndpoint = (request, response) => {
//         response.status(404).send({ error: 'unknown endpoint' })
//       }
      
//       app.use(unknownEndpoint)
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`)
  })