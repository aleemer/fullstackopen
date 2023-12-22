const Header = ({ name }) => {
  return (
    <h2>
      {name}
    </h2>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

// TODO
// const Total = (props) => {
//   return (
//     <div>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </div>
//   )
// }

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            
        </div>
    )
}

export default Course;