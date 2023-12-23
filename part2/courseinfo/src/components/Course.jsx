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

const Total = ({ total }) => {
  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Content = ({ parts }) => {
  console.log('course parts', parts);
  const calculateSum = () => {
    return parts.reduce((prevVal, currVal) => prevVal + currVal.exercises, 0);
  }

  return (
    <div>
      {parts.map(part => <Part part={part}/>)}
      <Total total={calculateSum()} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
      <div>
          <Header name={course.name}/>
          <Content parts={course.parts} />
      </div>
  )
}

export default Course;