'use client';

import { useState } from 'react';
import { FlashCard as FlashCardType } from '../types';

interface FlashCardProps {
  card: FlashCardType;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function FlashCard({ card, onNext, onPrevious, isFirst, isLast }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    onNext();
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    onPrevious();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Card Container with 3D perspective */}
        <div className="perspective-1000">
          <div 
            className={`relative w-full h-64 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className="absolute w-full h-full backface-hidden">
              <div className="w-full h-full bg-white rounded-xl shadow-lg border-2 border-gray-200 flex items-center justify-center p-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{card.frenchWord}</h2>
                  <p className="text-gray-600 text-sm">Click to see translation</p>
                </div>
              </div>
            </div>
            
            {/* Back of card */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <div className="w-full h-full bg-white rounded-xl shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">{card.englishTranslation}</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-700 italic">"{card.sampleSentence}"</p>
                  </div>
                  <p className="text-gray-600 text-sm mt-4">Click to flip back</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={isFirst}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isFirst 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleFlip}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            {isFlipped ? 'Show French' : 'Show English'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isLast 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Card {card.id} of your deck
          </p>
        </div>
      </div>
    </div>
  );
} 