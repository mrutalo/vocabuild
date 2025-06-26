export interface FlashCard {
  id: string;
  frenchWord: string;
  englishTranslation: string;
  sampleSentence: string;
}

export interface FlashCardDeck {
  id: string;
  name: string;
  cards: FlashCard[];
} 