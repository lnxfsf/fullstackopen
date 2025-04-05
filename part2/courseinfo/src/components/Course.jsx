import Content from "./course/Content";
import Header from "./course/Header";
import Total from "./course/Total";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course, index) => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
