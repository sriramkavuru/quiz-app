import React, { useState } from 'react';

export default function QuizScreen({ questions, finishQuiz }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  if (!questions || questions.length === 0 || !questions[current]) {
    return <div>Loading questions...</div>;
  }

  const handleAnswer = (answer) => {
    let newScore = score;
    if (answer === questions[current].correctAnswer) newScore += 1;

    const updatedAnswers = [...userAnswers, answer];
    setScore(newScore);
    setUserAnswers(updatedAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      finishQuiz(newScore, updatedAnswers);
    }
  };

  const q = questions[current];
  const shuffledOptions = q.options ? [...q.options].sort(() => Math.random() - 0.5) : [];
  const progressPercent = ((current + 1) / questions.length) * 100;

  return (
    <div style={{ width: '60%', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ height: '25px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '12px', marginBottom: '20px' }}>
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: '#4caf50',
            borderRadius: '12px',
            transition: 'width 0.3s ease'
          }}
        ></div>
      </div>

      <h2 style={{ color: '#333' }}>{q.questionText}</h2>

      {shuffledOptions.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(opt)}
          style={{
            display: 'block',
            margin: '10px auto',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #4caf50',
            backgroundColor: '#fff',
            transition: '0.3s'
          }}
          onMouseOver={(e) => { e.target.style.backgroundColor='#4caf50'; e.target.style.color='#fff'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor='#fff'; e.target.style.color='#000'; }}
        >
          {opt}
        </button>
      ))}

      <p style={{ marginTop: '20px', fontSize: '16px' }}>Question {current + 1} of {questions.length}</p>
    </div>
  );
}
