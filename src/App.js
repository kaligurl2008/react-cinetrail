
import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ThemeContextProvider from './Contexts/ThemeContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeContextProvider>
        <Header />
        <Routes>

        </Routes>
      </ThemeContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
