import DeckManager from './components/DeckManager';
import { vocabularyDecks } from './data/vocabularyDecks';

export default function Home() {
  return <DeckManager decks={vocabularyDecks} />;
}
