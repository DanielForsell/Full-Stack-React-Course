import Part from "./Part"

const Content = ({course}) => {
  
    return (
      <div>
          <ul>
            {/* <Part part={props.name1} exercises={props.ex1}/>
            
            <Part part={props.name2} exercises={props.ex2}/>
  
            <Part part={props.name3} exercises={props.ex3}/> */}

            {course.parts.map (part => 
              <Part key={part.id} part={part.name} exercises={part.exercises}/>
            )}

          </ul>
      </div>
    )
  }

export default Content