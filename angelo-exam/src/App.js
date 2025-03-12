import { useState } from "react";
import "./App.css";

export default function Home() {
  const [decks, setDecks] = useState({
    "Solo Leveling": [
      { question: "Who is the protagonist of Solo Leveling?", answer: "Sung Jin-Woo." },
      { question: "What is Sung Jin-Woo's special ability?", answer: "The ability to level up and gain strength infinitely." },
      { question: "What is the name of the system that grants Jin-Woo power?", answer: "The System." },
      { question: "Who is the Monarch of Shadows?", answer: "Sung Jin-Woo after inheriting Ashborn's power." },
    ],
  });

  const [currentDeck, setCurrentDeck] = useState("Solo Leveling");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newDeckName, setNewDeckName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const flashcards = decks[currentDeck] || [];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const toggleStudyMode = () => {
    setStudyMode(!studyMode);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setUserAnswer("");
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      checkAnswer();
  
      // Automatically proceed to the next question after 1.5 seconds
      setTimeout(() => {
        setShowAnswer(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setUserAnswer("");
      }, 1500); // Adjust delay if needed
    } else {
      setShowAnswer(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      setUserAnswer("");
    }
  };

  const checkAnswer = () => {
    if (userAnswer.toLowerCase().trim() === flashcards[currentIndex].answer.toLowerCase().trim()) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    checkAnswer();
  };

  const addFlashcard = () => {
    if (newQuestion && newAnswer) {
      const updatedDecks = {
        ...decks,
        [currentDeck]: [...flashcards, { question: newQuestion, answer: newAnswer }],
      };
      setDecks(updatedDecks);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const deleteFlashcard = (index) => {
    const updatedDecks = {
      ...decks,
      [currentDeck]: flashcards.filter((_, i) => i !== index),
    };
    setDecks(updatedDecks);
    setCurrentIndex(0);
  };

  const addDeck = () => {
    if (newDeckName && !decks[newDeckName]) {
      setDecks({ ...decks, [newDeckName]: [] });
      setCurrentDeck(newDeckName);
      setNewDeckName("");
    }
  };

  return (
    <div className="container">
      <button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
      <button onClick={toggleStudyMode}>{studyMode ? "Exit Study Mode" : "Enter Study Mode"}</button>

      {studyMode ? (
        <div className="study-mode">
          <h2>{flashcards[currentIndex]?.question || "No Flashcards"}</h2>
          <input
            type="text"
            placeholder="Your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          {showAnswer ? (
            <>
              <button onClick={nextCard}>Next Question</button>
              <p className="answer">{flashcards[currentIndex]?.answer}</p>
            </>
          ) : (
            <button onClick={handleShowAnswer}>Show Answer</button>
          )}
          <p>Correct: {correctCount} | Incorrect: {incorrectCount}</p>
        </div>
      ) : (
        <>
          <div className="deck-selection">
            <h3>Select Deck</h3>
            <select onChange={(e) => setCurrentDeck(e.target.value)} value={currentDeck}>
              {Object.keys(decks).map((deck) => (
                <option key={deck} value={deck}>{deck}</option>
              ))}
            </select>
          </div>

          <div className="flashcard-box">
            <h2>{flashcards[currentIndex]?.question || "No Flashcards"}</h2>
            {showAnswer && <p className="answer">{flashcards[currentIndex]?.answer}</p>}
            <button onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            <button onClick={nextCard}>Next Card</button>
            <button onClick={() => deleteFlashcard(currentIndex)} disabled={flashcards.length === 0}>
              Delete Card
            </button>
          </div>

          <div className="add-card-box">
            <h3>Add Flashcard here</h3>
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

          <div className="add-deck-box">
            <h3>Create New Deck</h3>
            <input
              type="text"
              placeholder="Deck Name"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
            />
            <button onClick={addDeck}>Add Deck</button>
          </div>
        </>
      )}
    </div>
  );
}