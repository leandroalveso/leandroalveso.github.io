"use client";

import Image from "next/image";
import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  // Simple Memory Game State
  const [cards, setCards] = useState([
    { id: 1, symbol: '🚀', matched: false },
    { id: 2, symbol: '💻', matched: false },
    { id: 3, symbol: '🌟', matched: false },
    { id: 4, symbol: '🎯', matched: false },
    { id: 5, symbol: '🚀', matched: false },
    { id: 6, symbol: '💻', matched: false },
    { id: 7, symbol: '🌟', matched: false },
    { id: 8, symbol: '🎯', matched: false },
  ].sort(() => Math.random() - 0.5));

  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const handleCardClick = (index: number) => {
    // Prevent clicking matched or already selected cards
    if (cards[index].matched || selectedCards.includes(index)) return;

    const newCards = [...cards];
    const newSelectedCards = [...selectedCards, index];

    // Reveal the clicked card
    newCards[index].matched = true;

    // Check for match when two cards are selected
    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        // Match found
        setMatchedPairs(matchedPairs + 1);
      } else {
        // No match, hide cards after a short delay
        setTimeout(() => {
          newCards[firstIndex].matched = false;
          newCards[secondIndex].matched = false;
          setCards(newCards);
        }, 1000);
      }
      // Reset selected cards
      setSelectedCards([]);
    } else {
      setSelectedCards(newSelectedCards);
    }

    setCards(newCards);
  };

  const resetGame = () => {
    setCards(cards.map(card => ({ ...card, matched: false })));
    setSelectedCards([]);
    setMatchedPairs(0);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-100 to-gray-200">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          <Image
            className="rounded-full border-4 border-gray-300 shadow-lg"
            src="/profile.jpeg"
            alt="Leandro&apos;s profile"
            width={180}
            height={180}
            priority
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Leandro Alves</h1>
            <p className="text-gray-600 mb-4">
              Software Developer | Tech Enthusiast | Problem Solver
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a 
                href="https://www.linkedin.com/in/leandro-alves-de-oliveira/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://github.com/leandroalveso" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-800 transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="mailto:engleandroalveso@gmail.com"
                className="hover:text-red-600 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">I Have a Funny Challenge for You: Memory Game!</h2>
          <p className="text-gray-600 mb-4">
            Test your memory! Click to reveal cards and find matching pairs.
          </p>
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`
                  w-20 h-20 flex items-center justify-center 
                  text-4xl rounded-lg transition-all duration-300
                  ${card.matched ? 'bg-green-200' : 'bg-blue-100'}
                  hover:bg-blue-200
                `}
              >
                {card.matched ? card.symbol : '?'}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p>Matched Pairs: {matchedPairs}/4</p>
            <button 
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Reset Game
            </button>
          </div>
        </div>

        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-600">
            With over 8 years of experience, I specialize in designing, implementing, 
            and optimizing cloud-based data and software platforms. 
            My core expertise is data engineering, distributed systems, and cloud infrastructure automation.
          </p>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-600">
        <p>&copy; 2025 Leandro Alves. All rights reserved.</p>
      </footer>
    </div>
  );
}