import React, {useState} from 'react';
import QuizPage from '../components/QuizPage';

function HomePage() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="HomePage">
      {quizStarted ? (
        <QuizPage />
      ) : (
        <div>
          <h1>Hey There, Welcome to Trivia Quiz</h1>
          <p>Please click on Start Quiz button to start the quiz, All the best!</p>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
