import React from 'react';

export default function ResultScreen({ score, total, restart }) {
  return (
    <div>
      <h1>Quiz Finished!</h1>
      <p>Your Score: {score}/{total}</p>
      <button onClick={restart}>Try Again</button>
    </div>
  );
}
