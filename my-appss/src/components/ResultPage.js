import React from 'react';

function ResultPage({ totalQuestions, correctAnswers, onPlayAgain }) {
  return (
    <div className="ResultPage">
      <h1>Result Page</h1>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
}

export default ResultPage;