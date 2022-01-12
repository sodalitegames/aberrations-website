const NewlineText = ({ text, children }) => {
  return (
    <span className="space-y-4">
      {String(children || text)
        .split('\n')
        .map((string, index) => (
          <p key={index}>{string}</p>
        ))}
    </span>
  );
};

export default NewlineText;
