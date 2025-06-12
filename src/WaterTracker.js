// src/WaterTracker.js
import React, { useState, useEffect } from "react";
import "./App.css";

function WaterTracker() {
  const today = new Date().toISOString().split("T")[0];

  const [goal, setGoal] = useState(() => {
    return localStorage.getItem("goal") || 2000;
  });
  const [intake, setIntake] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("data")) || {};
    return saved[today]?.reduce((a, b) => a + b, 0) || 0;
  });

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // Save intake to localStorage
  const saveIntake = (amount) => {
    const saved = JSON.parse(localStorage.getItem("data")) || {};
    const todayData = saved[today] || [];
    todayData.push(amount);
    saved[today] = todayData;
    localStorage.setItem("data", JSON.stringify(saved));
    setIntake((prev) => prev + amount);
  };

  const handleAdd = () => {
    const amount = parseInt(input);
    if (!isNaN(amount)) {
      saveIntake(amount);
      setInput("");
    }
  };

  const quickAdd = (amount) => {
    saveIntake(amount);
  };

  const updateGoal = (e) => {
    setGoal(e.target.value);
    localStorage.setItem("goal", e.target.value);
  };

  // Load history (last 5 days)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("data")) || {};
    const entries = Object.entries(saved);
    const sorted = entries.sort((a, b) => b[0].localeCompare(a[0]));
    setHistory(sorted.slice(0, 5));
  }, [intake]);


const progressPercentage = (intake / goal) * 100;
let progressColor = '';

if (progressPercentage < 100) {
  progressColor = 'under-goal';
} else if (progressPercentage === 100) {
  progressColor = 'met-goal';
} else {
  progressColor = 'over-goal';
}







  return (
    <div className="container">
      <h1>💧 Water Intake Tracker</h1>

      <div className="goal-section">
        <label>Daily Goal (ml): </label>
        <input type="number" value={goal} onChange={updateGoal} />
      </div>

      <div className="input-section">
        <input
          type="number"
          placeholder="Enter intake in ml"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={() => quickAdd(250)}>+250ml</button>
        <button onClick={() => quickAdd(500)}>+500ml</button>
      </div>

      <div className="progress-section">
        <h3>
          Today: {intake}/{goal} ml (
          {Math.min(progressPercentage.toFixed(0), 100)}%)
        </h3>
        {/* (intake / goal) * 100) */}
        <progress value={Math.min(intake,goal)} max={goal}  className={progressColor}></progress>
      </div>

      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map(([date, amounts]) => (
            <li key={date}>
              {date} – {amounts.reduce((a, b) => a + b, 0)} ml
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WaterTracker;
