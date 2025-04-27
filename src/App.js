
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const prizes = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S25",
  "4K Ultra HD TV",
  "HD Professional Camera",
  "Large Double Door Fridge",
  "Gold Smelting Machine",
  "Gold Detector Device"
];

const whatsappNumber = '491783752967';

function App() {
  const [cards, setCards] = useState(
    Array(9).fill({ revealed: false, prize: null })
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState('');
  const [width, height] = useWindowSize();

  const handleCardClick = (index) => {
    if (cards[index].revealed) return;
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    const newCards = [...cards];
    newCards[index] = { revealed: true, prize: randomPrize };
    setCards(newCards);
    setShowConfetti(true);
    setCongratsMessage(`Congratulations! You won a ${randomPrize}!`);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const openWhatsApp = (prize) => {
    const message = encodeURIComponent(`Hi Dubai Elektroniks, I just won a ${prize} from the prize game!`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const closeCongrats = () => {
    setCongratsMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-600 via-blue-500 to-yellow-400 p-4 relative overflow-hidden">
      {showConfetti && <Confetti width={width} height={height} />}
      
      {congratsMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-green-600 mb-4">{congratsMessage}</h2>
            <button 
              onClick={closeCongrats}
              className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:bg-red-600 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Dubai Elektroniks Prize Game</h1>
      
      <div className="grid grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`w-32 h-48 bg-white rounded-2xl shadow-xl flex items-center justify-center text-center cursor-pointer transition-transform transform hover:scale-105 ${
              card.revealed ? "bg-yellow-300" : "bg-gray-200"
            }`}
            onClick={() => handleCardClick(index)}
          >
            {card.revealed ? (
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold">{card.prize}</span>
                <button 
                  onClick={() => openWhatsApp(card.prize)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600"
                >
                  Claim via WhatsApp
                </button>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-700">?</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
