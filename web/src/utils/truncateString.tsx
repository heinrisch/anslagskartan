export const truncateString = (
  text: string,
  length: number,
  useWordBoundary: boolean
) => {
  if (text.length <= length) {
    return text;
  }
  var subString = text.substr(0, length - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};
