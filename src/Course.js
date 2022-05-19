const Header = ({course}) => (
    <h1>{course}</h1>
  )
  
const Total = ({parts}) => {
    const total = parts.reduce((p, c) => p + c.exercises, 0)
    return (
    <p>Number of exercises {total}</p>
    )
}
  
const Content = ({parts}) => (
      <>
        {parts.map(part =>
        <Part part={part} key = {part.id}/>)}
      </>
    )
  
const Part = ({part}) => (
    <p>
          {part.name} {part.exercises}
    </p>
  )

const Course = ({course}) => (
    <>
    <Header course={course.name}/>
    <Content parts={course.parts} />
    <Total parts={course.parts}/>
    </>
)

export default Course