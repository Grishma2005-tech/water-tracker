
# 💧 Water Intake Tracker (React App)

A simple and clean React-based web app that helps users track their daily water intake and hydration habits.

## 🚀 Features

- ✅ Set your own daily water goal (default: 2000 ml)
- ✅ Log water intake with custom value or quick-add buttons (250ml / 500ml)
- ✅ View daily progress with percentage and progress bar
- ✅ See hydration history of past days
- ✅ Data persists using `localStorage`

## 🧠 Problem-Solving Approach

1. Used React hooks for state management.
2. Saved data in `localStorage` for persistence.
3. Focused on clean UI and user-friendly layout.


## 🎨 Visual Feedback with Colored Progress Bar

To make hydration tracking more intuitive, the app uses color-coded progress bars:

| Intake Status         | Color      |
|------------------------|------------|
| Below daily goal       | 🔵 Blue     |
| Goal reached exactly   | ✅ Green    |
| Goal exceeded          | 🔴 Red      |

This helps users immediately recognize their progress throughout the day.

```js
// JS logic for color selection
if (progressPercentage < 100) {
  progressColor = 'under-goal';     // Blue
} else if (progressPercentage === 100) {
  progressColor = 'met-goal';       // Green
} else {
  progressColor = 'over-goal';      // Red
}

## 📦 How to Run the App

```bash
git clone https://github.com/grishma-shrimali/water-tracker.git
cd water-tracker
npm install
npm start
