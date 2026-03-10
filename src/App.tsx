import { ColorDisplay } from './components/ColorDisplay/ColorDisplay';
import { Footer } from './components/Footer/Footer';
import { GithubCorner } from './components/GithubCorner/GithubCorner';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="flex flex-col h-dvh">
      <GithubCorner />
      <Navbar />
      <ColorDisplay />
      <Footer />
    </div>
  );
}

export default App;
