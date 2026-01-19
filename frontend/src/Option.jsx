function Option({ option }) {
  function isCorrectOption(option) {
    return (
      option.explaination.includes("Correct") ||
      option.explaination.includes("Congratulations")
    );
  }

  function isIncorrectOption(option) {
    return (
      option.explaination.includes("InCorrect") ||
      option.explaination.includes("Sorry")
    );
  }
  return (
    <div
      key={option.id}
      className={`option ${isCorrectOption(option) ? "correct" : ""} ${isIncorrectOption(option) ? "incorrect" : ""} ${!isCorrectOption(option) && !isIncorrectOption(option) ? "correct" : ""}`}
    >
      <span>{option.text}</span>
    </div>
  );
}

export default Option;
