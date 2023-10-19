import React, { useState, useEffect } from 'react';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
        console.error('An error occurred while fetching questions:', error);
      });
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('End of the quiz');
    }
  };

  return (
    <div className="QuizPage">
      <h1>Quiz Page</h1>
      <div>
        {questions.length > 0 && (
          <div>
            <p>{questions[currentQuestionIndex].question}</p>
          </div>
        )}
        <button onClick={moveToNextQuestion}>Next</button>
      </div>
    </div>
  );
}

export default QuizPage;
