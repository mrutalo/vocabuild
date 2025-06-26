const fs = require('fs');
const path = require('path');

// Function to convert CSV content to TypeScript data
function csvToTypeScript(csvContent, filename) {
  const lines = csvContent.trim().split('\n');
  const cards = lines.map((line, index) => {
    const [frenchWord, englishTranslation, sampleSentence] = line.split(',').map(s => s.trim());
    return {
      id: (index + 1).toString(),
      frenchWord: frenchWord || '',
      englishTranslation: englishTranslation || '',
      sampleSentence: sampleSentence || ''
    };
  }).filter(card => card.frenchWord && card.englishTranslation);

  // Extract deck name from filename
  const deckName = formatDeckName(filename);

  return {
    id: filename.replace('.csv', '').toLowerCase().replace(/_/g, '-'),
    name: deckName,
    cards
  };
}

// Function to format deck names properly
function formatDeckName(filename) {
  // Remove .csv extension
  let name = filename.replace('.csv', '');
  
  // Extract level and word range - fix the regex pattern for underscores
  const match = name.match(/translated_([ab]\d+)_(\d+)_(\d+)b/i);
  
  if (match) {
    const level = match[1].toUpperCase();
    const startRange = match[2];
    const endRange = match[3];
    
    // Convert level to proper format
    let levelName = '';
    switch (level) {
      case 'A1':
        levelName = 'A1 Level (Beginner)';
        break;
      case 'A2':
        levelName = 'A2 Level (Elementary)';
        break;
      case 'B1':
        levelName = 'B1 Level (Intermediate)';
        break;
      default:
        levelName = `${level} Level`;
    }
    
    return `${levelName} - Words ${startRange}-${endRange}`;
  }
  
  // Fallback: just clean up the filename
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace('Translated', '')
    .replace('B', '')
    .trim();
}

// Function to sort decks properly
function sortDecks(decks) {
  return decks.sort((a, b) => {
    // Extract level and word range for sorting
    const aMatch = a.name.match(/([AB]\d+).*?(\d+)/);
    const bMatch = b.name.match(/([AB]\d+).*?(\d+)/);
    
    if (aMatch && bMatch) {
      const aLevel = aMatch[1];
      const bLevel = bMatch[1];
      const aNum = parseInt(aMatch[2]);
      const bNum = parseInt(bMatch[2]);
      
      // First sort by level (A1, A2, B1)
      if (aLevel !== bLevel) {
        return aLevel.localeCompare(bLevel);
      }
      // Then sort by word range
      return aNum - bNum;
    }
    return a.name.localeCompare(b.name);
  });
}

// Function to generate the complete TypeScript file
function generateTypeScriptFile(decks) {
  const deckData = decks.map(deck => {
    const cardsData = deck.cards.map(card => 
      `      { id: '${card.id}', frenchWord: '${card.frenchWord.replace(/'/g, "\\'")}', englishTranslation: '${card.englishTranslation.replace(/'/g, "\\'")}', sampleSentence: '${card.sampleSentence.replace(/'/g, "\\'")}' }`
    ).join(',\n');

    return `  {
    id: '${deck.id}',
    name: '${deck.name}',
    cards: [
${cardsData}
    ]
  }`;
  }).join(',\n');

  return `import { FlashCardDeck } from '../types';

export const vocabularyDecks: FlashCardDeck[] = [
${deckData}
];`;
}

// Main function to process all CSV files
function processCSVFiles() {
  const dataDir = path.join(__dirname, '../src/app/data');
  const csvFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.csv'));
  
  const decks = [];
  
  csvFiles.forEach(filename => {
    const filePath = path.join(dataDir, filename);
    const csvContent = fs.readFileSync(filePath, 'utf8');
    const deck = csvToTypeScript(csvContent, filename);
    decks.push(deck);
  });

  // Sort decks properly
  const sortedDecks = sortDecks(decks);

  const typescriptContent = generateTypeScriptFile(sortedDecks);
  const outputPath = path.join(__dirname, '../src/app/data/vocabularyDecks.ts');
  
  fs.writeFileSync(outputPath, typescriptContent);
  console.log(`✅ Generated ${sortedDecks.length} decks with ${sortedDecks.reduce((sum, deck) => sum + deck.cards.length, 0)} total cards`);
  console.log(`📁 Output saved to: ${outputPath}`);
  
  // Log the first few deck names to verify sorting
  console.log('\n📋 First 5 decks:');
  sortedDecks.slice(0, 5).forEach((deck, index) => {
    console.log(`${index + 1}. ${deck.name}`);
  });
}

// Run the script
processCSVFiles(); 