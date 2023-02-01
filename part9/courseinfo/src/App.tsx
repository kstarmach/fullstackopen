const App = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseDescriptionPart extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CourseDescriptionPart {
    type: "special",
    requirements: Array<string>
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
  }

  const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <div>
        {parts.map((part, idx) => (
          <p key={idx}>
            <b >{part.name} {part.exerciseCount}</b>
            <Part part={part} />
          </p>
        ))}
      </div>
    )
  }

  interface TotalProps {
    total: number
  }

  const Total = (props: TotalProps) => {
    return (
      <p>Number of exercises {props.total}</p>
    )
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
      case "normal":
        return (<div><i>{part.description}</i></div>)
      case "groupProject":
        return (<div>
          <div>project exercises: {part.groupProjectCount}</div>
          {/* <div>Exercise: {part.exerciseCount}</div> */}
        </div>)
      case "submission":
        return (<div>
          <div> <i>{part.description}</i></div>
          {/* <p>Exercise: {part.exerciseCount}</p> */}
          <div>
            submit to {' '}
            <a href={part.exerciseSubmissionLink} >{part.exerciseSubmissionLink}</a>
          </div>
        </div>)
      case "special":
        return (<div>
          <div><i>{part.description}</i></div>
          <div>required skils: {part.requirements.map(r => r + ', ')}</div>
        </div>)
      default:
        return assertNever(part);
    }
  }

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;