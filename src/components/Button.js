export function Button({
  children,
  onButton,
  borderRadius = "8px",
  padding = "0.3rem 1.2rem",
  backgroundColor = "#4b77d6",
  fontSize = "1.2rem",
}) {
  const buttonStyle = {
    borderRadius,
    padding,
    backgroundColor,
    fontSize,
  };
  return (
    <button
      className="button"
      style={buttonStyle}
      onClick={onButton}
      onKeyDown={onButton}
    >
      {children}
    </button>
  );
}
