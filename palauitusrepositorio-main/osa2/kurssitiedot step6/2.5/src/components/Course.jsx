import Content from "./Content"
import Header from "./Header"
import Total from "./Total"



const Course = ({ courses }) => {
    return (
        <div>
          {courses.map(course =>
          <div key={course.id}> 
            <Header name={course.name} />
            <Content course={course}/>
            <Total key1={course.id} number={course}/>
            </div>
          )}
          
        </div>
      )
}

export default Course