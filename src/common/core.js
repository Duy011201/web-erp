export const isEmptyNullUndefined = value => {
  return (
    value === null ||
    value === undefined ||
    (value.length !== undefined && value.length === 0)
  );
};

export const isNumber = value => {
  const regex = /^\d+$/;
  return !regex.test(value) || parseInt(value) === 0;
};
