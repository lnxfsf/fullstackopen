import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item, index) => {
        return <Part key={index} text={item.name} num={item.exercises} />;
      })}
    </div>
  );
};

export default Content;
