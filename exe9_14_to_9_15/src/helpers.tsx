const assertNever = (value: never): never => {
  throw new Error(
    `UNhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export { assertNever };
