
import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
