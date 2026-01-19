function Button() {
  return (
    <button className="btn" onClick={() => window.location.reload()}>
      Reload
    </button>
  );
}

export default Button;
