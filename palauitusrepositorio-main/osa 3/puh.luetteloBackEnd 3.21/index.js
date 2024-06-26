require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('dist'))


  app.use(cors())

  app.use(express.json())

  morgan.token('body', (req, res) => JSON.stringify(req.body))
  
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.get('/info', (request, response) => {
    response.send('Phonebook has info for ' + Person.length + ' people<br>' + new Date())
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person)
    })
    
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.get('/api/persons/:id', (request, response, next) => {
    
    Person.findById(request.params.id)
    .then(persone => {
      if (persone) {
        response.json(persone)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

      app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  })
  
  app.post('/api/persons', (request, response, next) => {
    const body = request.body
  
    
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } 
  
    const person = new Person({
        name: body.name,
        number: body.number
      
    })
  
    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
  
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
    
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findByIdAndUpdate(request.params.id,
        {name, number},
        { new: true, runValidators: true, context: 'query'})
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message})
    }
  
    next(error)
  }
  
  // tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
  app.use(errorHandler)
  
  const PORT = process.env.PORT 
  app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`)
  })