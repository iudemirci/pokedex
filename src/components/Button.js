export function Button({
  children,
  onButton,
  borderRadius = "8px",
  padding = "0.5rem 1.5rem",
  backgroundColor = "#e84900",
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
