import React, { useState } from 'react';
import StartQuiz from './components/StartQuiz';
import QuizScreen from './components/QuizScreen';
import axios from 'axios';

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = async (selectedCategory, selectedDifficulty) => {
    setCategory(selectedCategory);
    setDifficulty(selectedDifficulty);
    try {
      const res = await axios.get('http://localhost:5000/api/quiz', {
        params: {
          category: selectedCategory,
          difficulty: selectedDifficulty,
          limit: 5
        }
      });
      setQuestions(res.data);
      setQuizStarted(true);
    } catch (err) {
      alert('Failed to fetch questions. Make sure backend is running.');
    }
  };

  const finishQuiz = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setShowResult(true);
  };

  if (!quizStarted) {
    return <StartQuiz startQuiz={startQuiz} />;
  }

  if (showResult) {
    return (
      <div style={{ width: '60%', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#4caf50' }}>Quiz Finished!</h1>
        <p style={{ fontSize: '18px' }}>Your Score: {score} / {questions.length}</p>

        <h2>Review Questions:</h2>
        {questions.map((q, idx) => (
          <div key={idx} style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9', border: '1px solid #ccc' }}>
            <p><strong>Q{idx + 1}:</strong> {q.questionText}</p>
            <p><strong>Your Answer:</strong> <span style={{ color: userAnswers[idx] === q.correctAnswer ? 'green' : 'red' }}>{userAnswers[idx]}</span></p>
            <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
          </div>
        ))}

        <button onClick={() => window.location.reload()} style={{
          padding: '12px 25px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          transition: '0.3s'
        }}
        onMouseOver={e => e.target.style.backgroundColor='#45a049'}
        onMouseOut={e => e.target.style.backgroundColor='#4caf50'}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <QuizScreen
      questions={questions}
      finishQuiz={finishQuiz}
    />
  );
}
