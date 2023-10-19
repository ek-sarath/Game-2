import React, { useState, useEffect } from 'react';

function QuizPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.results);
      } else {
        console.error('Failed to fetch questions');
      }
    } catch (error) {
      console.error('An error occurred while fetching questions:', error);
    }
  };

  return (
    <div className="QuizPage">
      <h1>Quiz Page</h1>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;
