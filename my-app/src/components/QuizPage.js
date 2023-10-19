import React, { useState, useEffect } from 'react';
import '../App.css';
import ResultPage from './ResultPage';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswerSelection = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    moveToNextQuestion();
  };

  const playAgain = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <ResultPage
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
        onPlayAgain={playAgain}
      />
    );
  }


  return (
    <div className="QuizPage">
      <h1>Quiz Page</h1>
      <div>
        {questions.length > 0 && (
          <div>
            <p>{questions[currentQuestionIndex].question}</p>
            <div className="multiple-choice-options">
              {questions[currentQuestionIndex].incorrect_answers.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswerSelection(option)}
                >
                  {option}
                </button>
              ))}
              <button
                className="option-button correct"
                onClick={() =>
                  handleAnswerSelection(questions[currentQuestionIndex].correct_answer)
                }
              >
                {questions[currentQuestionIndex].correct_answer}
              </button>
            </div>
          </div>
        )}
        <button onClick={moveToNextQuestion} className="next-button">
          {currentQuestionIndex === questions.length - 1 ? 'See Result' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
