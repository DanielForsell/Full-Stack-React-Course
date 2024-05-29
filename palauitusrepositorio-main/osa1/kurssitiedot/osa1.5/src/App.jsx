const Header = (course) => {
  console.log(course)
  return (
    <div>
      <h1>
        {course.course}
      </h1>
    </div>
  )
}

const Part = ({part, exercises}) => {
  console.log(part + exercises)

  return (
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Content = (props) => {
  
  return (
    <div>
        <ul>
          <Part part={props.name1} exercises={props.ex1}/>
          
          <Part part={props.name2} exercises={props.ex2}/>

          <Part part={props.name3} exercises={props.ex3}/>
        </ul>
    </div>
  )
}

const Total = ({number}) => {
  // console.log(exercises1)
  return (
    <div>
      <p>
        Total ammount of exercises {number}
      </p>
    </div>
  )

}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content 
      name1 = {course.parts[0].name} ex1 = {course.parts[0].exercises}
      name2 = {course.parts[1].name} ex2 = {course.parts[1].exercises}
      name3 = {course.parts[2].name} ex3 = {course.parts[2].exercises}
      />

      <Total 
      number = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
      />
    </div>
  )
}

export default App