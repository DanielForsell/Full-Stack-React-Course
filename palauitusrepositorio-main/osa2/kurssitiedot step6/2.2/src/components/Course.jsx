import Content from "./Content"
import Header from "./Header"
import Total from "./Total"



const Course = ({ course }) => {
    return (
        <div>
          <Header name={course.name} />
           {/* /* <Content></Content> */
          /* // name1 = {course.parts[0].name} ex1 = {course.parts[0].exercises}
          // name2 = {course.parts[1].name} ex2 = {course.parts[1].exercises}
          // name3 = {course.parts[2].name} ex3 = {course.parts[2].exercises}  */ }


            
              <Content key={course.id} course={course}/>
            
            
          <Total key1={course.id} number={course}/>
    
          {/* <Total 
          number = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
          /> */}
        </div>
      )
}

export default Course