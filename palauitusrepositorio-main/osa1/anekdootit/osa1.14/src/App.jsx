// const Header = (course) => {
//   console.log(course)
//   return (
//     <div>
//       <h1>
//         {course.course}
//       </h1>
//     </div>
//   )
// }

// const Part = ({part, exercises}) => {
//   console.log(part + exercises)

//   return (
//     <div>
//       <p>{part} {exercises}</p>
//     </div>
//   )
// }

// const Content = (props) => {
  
//   return (
//     <div>
//         <ul>
//           <Part part={props.name1} exercises={props.ex1}/>
          
//           <Part part={props.name2} exercises={props.ex2}/>

//           <Part part={props.name3} exercises={props.ex3}/>
//         </ul>
//     </div>
//   )
// }

// const Total = (exercises1) => {
//   console.log(exercises1)
//   return (
//     <div>
//     {'Total ammount of exercises '+ exercises1.number}
//     </div>
//   )

// }

// const App = () => {

//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course} />
//       <Content 
//       name1={part1} ex1={exercises1}
//       name2={part2} ex2={exercises2}
//       name3={part2} ex3={exercises3}
//       />

//       <Total 
//       number={exercises1 + exercises2 + exercises3}
//       />
//     </div>
//   )
// }

// export default App

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const random = Math.floor(Math.random() * anecdotes.length)

  return (
    <div>
      {anecdotes[selected]} <br />
      has {points[selected]} votes <br />
      <button onClick={() => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
      }}>vote</button>
      <button onClick={() => setSelected(random)}>next anecdotes</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[points.indexOf(Math.max(...points))]}

    </div>
  )
}

export default App