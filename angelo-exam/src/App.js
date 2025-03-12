import { useState } from "react";
import "./App.css";

export default function Home() {
  const [flashcards, setFlashcards] = useState([
    { question: "Who is the protagonist of Solo Leveling?", answer: "Sung Jin-Woo." },
    { question: "What is Sung Jin-Woo's special ability?", answer: "The ability to level up and gain strength infinitely." },
    { question: "What is the name of the system that grants Jin-Woo power?", answer: "The System." },
    { question: "Who is the Monarch of Shadows?", answer: "Sung Jin-Woo after inheriting Ashborn's power." },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const nextCard = () => {
    setShowAnswer(false);
    setUserAnswer("");
    setFeedback("");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const addFlashcard = () => {
    if (newQuestion && newAnswer) {
      setFlashcards([...flashcards, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const deleteFlashcard = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
    setCurrentIndex(0);
  };

  const checkAnswer = () => {
    if (userAnswer.toLowerCase().trim() === flashcards[currentIndex].answer.toLowerCase().trim()) {
      setFeedback("Correct!");
      setCorrectCount(correctCount + 1);
    } else {
      setFeedback("Incorrect. The correct answer is: " + flashcards[currentIndex].answer);
      setIncorrectCount(incorrectCount + 1);
    }
  };

  return (
    <div className="container">
      <button onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="flashcard-box">
        <h2>{flashcards[currentIndex]?.question || "No Flashcards"}</h2>
        {showAnswer && <p className="answer">{flashcards[currentIndex]?.answer}</p>}
        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <div className="input-section">
          <input
            type="text"
            placeholder="Your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button onClick={checkAnswer}>Submit Answer</button>
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
        <button onClick={nextCard}>Next Card</button>
        <button onClick={() => deleteFlashcard(currentIndex)} disabled={flashcards.length === 0}>
          Delete Card
        </button>
        <p>Correct: {correctCount} | Incorrect: {incorrectCount}</p>
      </div>
      <div className="add-card-box">
        <h3>Add Flashcard</h3>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button onClick={addFlashcard}>Add Flashcard</button>
      </div>
    </div>
  );
}
