import Option from "./Option";

function Card({ question }) {
  return (
    <div className="quiz-card">
      <span className="question-tag">Question </span>
      <h2 className="question-text">{question.question}</h2>
      <div className="options-container">
        {question.options.map((option) => (
          <Option option={option} key={option.id} />
        ))}
      </div>
    </div>
  );
}

export default Card;
