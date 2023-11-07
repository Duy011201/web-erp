export default function isEmptyNullUndefined(value) {
  return (
    value === null ||
    value === undefined ||
    (value.length !== undefined && value.length === 0)
  );
}
