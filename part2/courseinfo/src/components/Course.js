const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(p =>
                <Part part={p.name} exercises={p.exercises} key={p.id} />
            )}
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Total = ({ parts }) => {
    let total = parts.reduce((prev, curr) =>
        prev + curr.exercises, 0);

    return (
        <>
            <p><b>Number of exercises {total}</b></p>
        </>
    )
}

export default Course