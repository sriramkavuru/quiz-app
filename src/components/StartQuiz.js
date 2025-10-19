import React, { useState } from 'react';

export default function StartQuiz({ startQuiz }) {
  const [category, setCategory] = useState('Web Dev');
  const [difficulty, setDifficulty] = useState('Easy');

  const handleStart = () => {
    startQuiz(category, difficulty);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#4caf50' }}>Welcome to the Quiz App!</h1>
      <p style={{ fontSize: '18px' }}>Select your category and difficulty to start:</p>

      <div style={{ margin: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', fontSize: '16px' }}>
          <option value="Web Dev">Web Dev</option>
          <option value="Math">Math</option>
          <option value="GK">GK</option>
        </select>
      </div>

      <div style={{ margin: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ padding: '8px', fontSize: '16px' }}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <button
        onClick={handleStart}
        style={{
          padding: '12px 25px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          transition: '0.3s'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={e => e.target.style.backgroundColor = '#4caf50'}
      >
        Start Quiz
      </button>
    </div>
  );
}
