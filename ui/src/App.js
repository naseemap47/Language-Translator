import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from '././pages/Home/Home'
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar />} >
        <Route index element={<Home />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
