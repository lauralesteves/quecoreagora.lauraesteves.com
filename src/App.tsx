import { ColorDisplay } from './components/ColorDisplay/ColorDisplay';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <ColorDisplay />
      <Footer />
    </div>
  );
}

export default App;
