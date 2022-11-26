
import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ThemeContextProvider from './Contexts/ThemeContext';
import Homepage from './Pages/Homepage/Homepage';

function App() {

  //set up apikey and baseurl to send to Homepage
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // console.log(apiKey);
  // console.log(baseUrl);

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage apiKey={apiKey}
                                            baseUrl={baseUrl}/>} />
        </Routes>
      </ThemeContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
