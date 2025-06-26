'use client';

import { useState } from 'react';
import { FlashCardDeck } from '../types';

interface SidebarProps {
  decks: FlashCardDeck[];
  selectedDeck: FlashCardDeck | null;
  onDeckSelect: (deck: FlashCardDeck) => void;
  onBackToDecks: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Sidebar({ 
  decks, 
  selectedDeck, 
  onDeckSelect, 
  onBackToDecks, 
  currentPage, 
  totalPages, 
  onPageChange 
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Group decks by CEFR level
  const deckGroups = decks.reduce((groups, deck) => {
    const level = deck.name.split(' ')[0]; // Extract A1, A2, B1, etc.
    if (!groups[level]) {
      groups[level] = [];
    }
    groups[level].push(deck);
    return groups;
  }, {} as Record<string, FlashCardDeck[]>);

  const totalCards = decks.reduce((sum, deck) => sum + deck.cards.length, 0);

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-20 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600 transition-colors"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {!isCollapsed ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Vocabulary Decks</h2>
              <p className="text-sm text-gray-600">{decks.length} decks • {totalCards.toLocaleString()} cards</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedDeck ? (
            // Show current deck info when a deck is selected
            <div className="p-4">
              {!isCollapsed ? (
                <div>
                  <button
                    onClick={onBackToDecks}
                    className="mb-4 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                  >
                    ← Back to Decks
                  </button>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Current Deck</h3>
                    <p className="text-sm text-blue-700 mb-2">{selectedDeck.name}</p>
                    <p className="text-xs text-blue-600">{selectedDeck.cards.length} cards</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xs">📚</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Show deck categories when no deck is selected
            <div className="p-4">
              {!isCollapsed ? (
                <div>
                  {/* Quick Stats */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Decks:</span>
                        <span className="font-medium">{decks.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Cards:</span>
                        <span className="font-medium">{totalCards.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Page:</span>
                        <span className="font-medium">{currentPage} of {totalPages}</span>
                      </div>
                    </div>
                  </div>

                  {/* CEFR Levels */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">CEFR Levels</h3>
                    <div className="space-y-2">
                      {Object.entries(deckGroups).map(([level, levelDecks]) => (
                        <div key={level} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-800">{level}</span>
                            <span className="text-xs text-gray-500">{levelDecks.length} decks</span>
                          </div>
                          <div className="space-y-1">
                            {levelDecks.slice(0, 3).map((deck) => (
                              <button
                                key={deck.id}
                                onClick={() => onDeckSelect(deck)}
                                className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                              >
                                {deck.name.split(' - ')[1]}
                              </button>
                            ))}
                            {levelDecks.length > 3 && (
                              <span className="text-xs text-gray-400 px-2">
                                +{levelDecks.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Navigation */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Navigation</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => onPageChange(1)}
                        className="w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        First Page
                      </button>
                      <button
                        onClick={() => onPageChange(Math.ceil(totalPages / 2))}
                        className="w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Middle Page
                      </button>
                      <button
                        onClick={() => onPageChange(totalPages)}
                        className="w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Last Page
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Collapsed view - just show icons
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xs">📊</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-xs">📚</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-xs">🎯</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed ? (
            <div className="text-center">
              <p className="text-xs text-gray-500">French Vocabulary</p>
              <p className="text-xs text-gray-400">Flash Cards App</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500 text-xs">🇫🇷</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 