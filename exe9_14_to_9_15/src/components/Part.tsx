import React from "react";
import { assertNever } from "../helpers";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  const coursePart = props.coursePart;

  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <p>
            {" "}
            <b>
              {coursePart.name} {coursePart.exerciseCount}{" "}
            </b>
          </p>
          <p>{coursePart.description}</p>
          <br></br>
        </div>
      );

    case "group":
      return (
        <div>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}{" "}
            </b>
          </p>
          <p>{coursePart.groupProjectCount}</p>
          <br></br>
        </div>
      );

    case "background":
      return (
        <div>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}{" "}
              {coursePart.description}{" "}
            </b>
          </p>
          <p>{coursePart.backgroundMaterial}</p>
          <br></br>
        </div>
      );

    case "special":
      return (
        <div>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}{" "}
              {coursePart.description}{" "}
            </b>
          </p>
          <p>
            required skills{" "}
            {coursePart.requirements.map((reqs, i) => {
              if (i === coursePart.requirements.length - 1) {
                return reqs;
              } else {
                return reqs + ", ";
              }
            })}
          </p>
          <br></br>
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;
