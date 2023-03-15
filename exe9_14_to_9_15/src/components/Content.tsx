import { assertNever } from "../helpers";
import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const courseParts = props.courseParts;
  // courseParts.forEach((part) => {
  //   switch (part.kind) {
  //     case "basic":
  //       console.log(part.name, part.exerciseCount, part.description);
  //       break;
  //     case "group":
  //       console.log(part.name, part.exerciseCount, part.groupProjectCount);
  //       break;
  //     case "background":
  //       console.log(
  //         part.name,
  //         part.exerciseCount,
  //         part.description,
  //         part.backgroundMaterial
  //       );
  //       break;
  //     default:
  //       return assertNever(part);
  //   }
  // });
  return (
    <div>
      {courseParts.map((part) => {
        return <Part coursePart={part} key={part.name} />;
      })}
    </div>
  );
};

export default Content;
