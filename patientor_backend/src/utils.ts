export const parseUUID = (uuid: unknown): string => {
  if (!uuid || !isString(uuid)) {
    throw new Error("Incorrect or wrong uuid: " + uuid);
  }

  return uuid;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};
