# French Vocabulary Flash Cards

A modern, interactive flash card application built with Next.js for learning French vocabulary. Each card displays a French word on the front and its English translation plus a sample sentence on the back.

## Features

- 🎴 **Interactive Flash Cards**: Click to flip cards with smooth 3D animations
- 📚 **Multiple Decks**: 28 organized vocabulary decks by CEFR levels (A1, A2, B1)
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Beautiful gradient backgrounds and smooth transitions
- 📊 **Progress Tracking**: See your current position in each deck
- 🔄 **Navigation**: Easy navigation between cards with Previous/Next buttons
- 📁 **CSV Import**: Automatic conversion of CSV files to flash card decks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cardvocab
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Vocabulary Decks

The application comes with **28 comprehensive vocabulary decks** organized by CEFR levels:

### A1 Level (Beginner)
- **A1 Words 1-100**: Basic vocabulary and common words
- **A1 Words 200-300**: Essential everyday vocabulary
- **A1 Words 300-400**: Common expressions and phrases
- **A1 Words 400-500**: Fundamental vocabulary building

### A2 Level (Elementary)
- **A2 Words 500-600**: Intermediate vocabulary
- **A2 Words 600-700**: Common verbs and expressions
- **A2 Words 700-800**: Everyday communication
- **A2 Words 800-900**: Practical vocabulary
- **A2 Words 900-1000**: Expanding vocabulary

### B1 Level (Intermediate)
- **B1 Words 1000-1100**: Intermediate vocabulary
- **B1 Words 1100-1200**: Advanced expressions
- **B1 Words 1200-1300**: Complex vocabulary
- **B1 Words 1300-1400**: Academic vocabulary
- **B1 Words 1400-1500**: Professional vocabulary
- **B1 Words 1500-1600**: Specialized vocabulary
- **B1 Words 1600-1700**: Advanced communication
- **B1 Words 1700-1800**: Complex expressions
- **B1 Words 1800-1900**: Sophisticated vocabulary
- **B1 Words 1900-2000**: Advanced language skills
- **B1 Words 2000-2100**: Professional communication
- **B1 Words 2100-2200**: Academic language
- **B1 Words 2200-2300**: Complex terminology
- **B1 Words 2300-2400**: Advanced expressions
- **B1 Words 2400-2500**: Sophisticated vocabulary
- **B1 Words 2500-2600**: Professional terminology
- **B1 Words 2600-2700**: Advanced communication
- **B1 Words 2700-2800**: Complex vocabulary
- **B1 Words 2800-2900**: Academic expressions
- **B1 Words 2900-3000**: Mastery level vocabulary

## Adding Your Own Vocabulary

### CSV Import Format

To add new vocabulary, create a CSV file with the following format:

```csv
french_word,english_translation,sample_sentence
Bonjour,Hello / Good morning,Bonjour, comment allez-vous?
Au revoir,Goodbye,Au revoir, à bientôt!
Merci,Thank you,Merci beaucoup pour votre aide.
```

### Converting CSV Files

1. Place your CSV files in the `src/app/data/` folder
2. Run the conversion script:
```bash
npm run convert-csv
```

This will automatically:
- Read all CSV files in the data folder
- Convert them to TypeScript data
- Organize them by level and word range
- Update the application with new decks

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── FlashCard.tsx      # Individual flash card component
│   │   └── DeckManager.tsx    # Deck selection and management
│   ├── data/
│   │   ├── vocabularyDecks.ts # All vocabulary data (auto-generated)
│   │   └── *.csv             # Your CSV vocabulary files
│   ├── utils/
│   │   └── csvImport.ts       # CSV parsing utilities
│   ├── types.ts               # TypeScript type definitions
│   ├── page.tsx               # Main application page
│   └── globals.css            # Global styles and animations
scripts/
└── convert-csv.js             # CSV to TypeScript converter
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Transforms**: 3D card flip animations

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run convert-csv`: Convert CSV files to TypeScript data

### Code Style

The project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize:
- Colors: Modify the gradient backgrounds in components
- Animations: Adjust transition durations in `globals.css`
- Layout: Change card sizes and spacing

### Adding Features

Some ideas for future enhancements:
- **Spaced Repetition**: Implement SRS algorithm for better learning
- **Audio Pronunciation**: Add audio files for French words
- **Progress Tracking**: Save study progress to localStorage
- **Multiple Languages**: Extend to support other languages
- **Export/Import**: Save and load custom decks
- **Study Statistics**: Track learning progress and performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue on GitHub.
