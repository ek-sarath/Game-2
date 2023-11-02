import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import ResultPage from './ResultPage';

const baseURL = "https://opentdb.com/api.php?amount=5&type=multiple";

function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [presentQuestionIndex, setPresentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (quiz.length === 0) {
      fetchData();
      console.log("hi");
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setQuiz(response.data.results);
      setTotalQuestions(response.data.results.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (presentQuestionIndex < totalQuestions) {
      const currentQuestion = quiz[presentQuestionIndex];
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      shuffleAndSetAnswers(answers);
    }
  }, [presentQuestionIndex, quiz, totalQuestions]);

  const shuffleAndSetAnswers = (answers) => {
    // Shuffle the answers
    const shuffled = shuffle(answers);
    setShuffledAnswers(shuffled);
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleClick = (answer) => {
    if (selectAnswer === null) {
      setSelectAnswer(answer);

      if (answer === quiz[presentQuestionIndex].correct_answer) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }
  };

  const handleNext = () => {
    if (presentQuestionIndex === totalQuestions - 1) {
      setShowResults(true);
    } else {
      setSelectAnswer(null);
      setPresentQuestionIndex(presentQuestionIndex + 1);
    }
  };

  if (quiz.length === 0) {
    return <div>Loading questions...</div>;
  }

  if (showResults) {
    return (
      <ResultPage
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
      />
    );
  }

  const currentQuestion = quiz[presentQuestionIndex];

  return (
    <div className="quiz">
      <h2>Question {presentQuestionIndex + 1}:</h2>
      <p>{currentQuestion.question}</p>
      <div className="answers">
        {shuffledAnswers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleClick(answer)}
            style={{
              backgroundColor:
                selectAnswer === answer
                  ? answer === currentQuestion.correct_answer
                    ? "lightgreen"
                    : "red"
                  : "",
            }}
            disabled={selectAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>
      <button className="next-button" onClick={handleNext}>
        {presentQuestionIndex === totalQuestions - 1 ? "See Results" : "Next"}
      </button>
    </div>
  );
}

export default QuizPage;