const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    },
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
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const person = persons.find(persons => persons.id === id)
    console.log(person);
    if (person) {
        response.json(person)
      } else {
        return response.status(400).json({ 
        error: 'content missing'
        })
      }
      app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } else if (persons.find(person => person.name === body.name)) {

        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
      
    }
  
    persons = persons.concat(person)
  
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
    response.json(persons)
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
  
  const PORT = 3001
  app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`)
  })