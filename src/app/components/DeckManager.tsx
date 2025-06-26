'use client';

import { useState } from 'react';
import { FlashCardDeck, FlashCard as FlashCardType } from '../types';
import FlashCard from './FlashCard';

interface DeckManagerProps {
  decks: FlashCardDeck[];
}

export default function DeckManager({ decks }: DeckManagerProps) {
  const [selectedDeck, setSelectedDeck] = useState<FlashCardDeck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const decksPerPage = 10;

  const handleDeckSelect = (deck: FlashCardDeck) => {
    setSelectedDeck(deck);
    setCurrentCardIndex(0);
  };

  const handleNext = () => {
    if (selectedDeck && currentCardIndex < selectedDeck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedDeck && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleBackToDeckSelection = () => {
    setSelectedDeck(null);
    setCurrentCardIndex(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  if (selectedDeck) {
    const currentCard = selectedDeck.cards[currentCardIndex];
    return (
      <div>
        {/* Header with deck info and back button */}
        <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10 p-4">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button
              onClick={handleBackToDeckSelection}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Decks
            </button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-800">{selectedDeck.name}</h1>
              <p className="text-sm text-gray-600">
                {currentCardIndex + 1} of {selectedDeck.cards.length}
              </p>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Flash card with adjusted top margin */}
        <div className="pt-20">
          <FlashCard
            card={currentCard}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentCardIndex === 0}
            isLast={currentCardIndex === selectedDeck.cards.length - 1}
          />
        </div>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(decks.length / decksPerPage);
  const startIndex = (currentPage - 1) * decksPerPage;
  const endIndex = startIndex + decksPerPage;
  const currentDecks = decks.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">French Vocabulary Flashcards</h1>
          <p className="text-lg text-gray-600 mb-2">Select a deck to start learning</p>
          <p className="text-sm text-gray-500">
            {decks.length} total decks • Page {currentPage} of {totalPages}
          </p>
        </div>

        {decks.length === 0 ? (
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Decks Available</h2>
              <p className="text-gray-600 mb-6">
                You haven't added any vocabulary decks yet. Upload your CSV files to get started!
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 Tip: You can import vocabulary from CSV files with columns for French word, English translation, and sample sentence.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Deck Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentDecks.map((deck) => (
                <div
                  key={deck.id}
                  onClick={() => handleDeckSelect(deck)}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200 card-hover"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{deck.name}</h3>
                    <p className="text-gray-600 mb-4">{deck.cards.length} cards</p>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        Click to start studying
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mb-8">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  ← Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const shouldShow = 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1;

                    if (shouldShow) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                            page === currentPage
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      (page === 2 && currentPage > 3) ||
                      (page === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next →
                </button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="text-center">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Vocabulary Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-semibold text-blue-800">Total Decks</p>
                    <p className="text-2xl font-bold text-blue-600">{decks.length}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-semibold text-green-800">Total Cards</p>
                    <p className="text-2xl font-bold text-green-600">
                      {decks.reduce((sum, deck) => sum + deck.cards.length, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="font-semibold text-purple-800">CEFR Levels</p>
                    <p className="text-2xl font-bold text-purple-600">A1, A2, B1</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 