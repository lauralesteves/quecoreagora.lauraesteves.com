import { ColorDisplay } from './components/ColorDisplay/ColorDisplay';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <ColorDisplay />
    </div>
  );
}

export default App;
