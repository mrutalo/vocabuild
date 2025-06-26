import { FlashCard, FlashCardDeck } from '../types';

export function parseCSVToDeck(csvContent: string, deckName: string): FlashCardDeck {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Find the correct column indices
  const frenchIndex = headers.findIndex(h => 
    h.toLowerCase().includes('french') || 
    h.toLowerCase().includes('mot') || 
    h.toLowerCase().includes('français')
  );
  
  const englishIndex = headers.findIndex(h => 
    h.toLowerCase().includes('english') || 
    h.toLowerCase().includes('translation') || 
    h.toLowerCase().includes('anglais')
  );
  
  const sentenceIndex = headers.findIndex(h => 
    h.toLowerCase().includes('sentence') || 
    h.toLowerCase().includes('phrase') || 
    h.toLowerCase().includes('example')
  );

  // If we can't find specific headers, use the first three columns
  const finalFrenchIndex = frenchIndex >= 0 ? frenchIndex : 0;
  const finalEnglishIndex = englishIndex >= 0 ? englishIndex : 1;
  const finalSentenceIndex = sentenceIndex >= 0 ? sentenceIndex : 2;

  const cards: FlashCard[] = lines.slice(1).map((line, index) => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    
    return {
      id: (index + 1).toString(),
      frenchWord: values[finalFrenchIndex] || '',
      englishTranslation: values[finalEnglishIndex] || '',
      sampleSentence: values[finalSentenceIndex] || ''
    };
  }).filter(card => card.frenchWord && card.englishTranslation); // Remove empty cards

  return {
    id: Date.now().toString(),
    name: deckName,
    cards
  };
}

export function validateCSVFormat(csvContent: string): { isValid: boolean; error?: string } {
  const lines = csvContent.trim().split('\n');
  
  if (lines.length < 2) {
    return { isValid: false, error: 'CSV must have at least a header row and one data row' };
  }

  const headers = lines[0].split(',').map(h => h.trim());
  
  if (headers.length < 3) {
    return { isValid: false, error: 'CSV must have at least 3 columns (French word, English translation, Sample sentence)' };
  }

  // Check if data rows have the same number of columns as headers
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length !== headers.length) {
      return { isValid: false, error: `Row ${i + 1} has ${values.length} columns but header has ${headers.length} columns` };
    }
  }

  return { isValid: true };
} 