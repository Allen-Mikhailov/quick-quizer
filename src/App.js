import React from 'react';


import './scss/index.scss';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
    <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage/>} />
        <Route path='/quiz' element={<QuizPage/>} />
    </Routes>
    </Router>
  );
}

export default App;
