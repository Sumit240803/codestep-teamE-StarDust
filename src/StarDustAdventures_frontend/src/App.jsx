import { useEffect, useState } from 'react';
import { StarDustAdventures_backend } from 'declarations/StarDustAdventures_backend';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Aos from 'aos';
import "aos/dist/aos.css";

function App() {

  useEffect(()=>{
    Aos.init()
  })

  return (
    <Router className='app'>
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </Router>
  );
}

export default App;
