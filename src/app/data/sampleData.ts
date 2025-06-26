import { FlashCardDeck } from '../types';

export const sampleDecks: FlashCardDeck[] = [
  {
    id: '1',
    name: 'Basic French Greetings',
    cards: [
      {
        id: '1',
        frenchWord: 'Bonjour',
        englishTranslation: 'Hello / Good morning',
        sampleSentence: 'Bonjour, comment allez-vous?'
      },
      {
        id: '2',
        frenchWord: 'Au revoir',
        englishTranslation: 'Goodbye',
        sampleSentence: 'Au revoir, à bientôt!'
      },
      {
        id: '3',
        frenchWord: 'Merci',
        englishTranslation: 'Thank you',
        sampleSentence: 'Merci beaucoup pour votre aide.'
      },
      {
        id: '4',
        frenchWord: 'S\'il vous plaît',
        englishTranslation: 'Please',
        sampleSentence: 'S\'il vous plaît, pouvez-vous m\'aider?'
      },
      {
        id: '5',
        frenchWord: 'Excusez-moi',
        englishTranslation: 'Excuse me',
        sampleSentence: 'Excusez-moi, où est la gare?'
      }
    ]
  },
  {
    id: '2',
    name: 'Common Verbs',
    cards: [
      {
        id: '6',
        frenchWord: 'Être',
        englishTranslation: 'To be',
        sampleSentence: 'Je suis étudiant.'
      },
      {
        id: '7',
        frenchWord: 'Avoir',
        englishTranslation: 'To have',
        sampleSentence: 'J\'ai un chat.'
      },
      {
        id: '8',
        frenchWord: 'Aller',
        englishTranslation: 'To go',
        sampleSentence: 'Je vais au marché.'
      },
      {
        id: '9',
        frenchWord: 'Faire',
        englishTranslation: 'To do / To make',
        sampleSentence: 'Je fais mes devoirs.'
      },
      {
        id: '10',
        frenchWord: 'Parler',
        englishTranslation: 'To speak',
        sampleSentence: 'Je parle français.'
      }
    ]
  }
]; 