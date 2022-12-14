
import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ThemeContextProvider from './Contexts/ThemeContext';
import Homepage from './Pages/Homepage/Homepage';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import Footer from './Components/Footer/Footer';
import Signup from './Pages/Users/Signup';
import Signin from './Pages/Users/Signin';


function App() {

  // //set up apikey and baseurl to send to Homepage
  // const apiKey = process.env.REACT_APP_API_KEY;
  // const baseUrl = process.env.REACT_APP_BASE_URL;

  // console.log(apiKey);
  // console.log(baseUrl);

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/moviedetails/:movieId' element={<MovieDetails/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
        </Routes>
        <Footer />
      </ThemeContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
