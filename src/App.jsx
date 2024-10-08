import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Jobs from './Components/Jobs/Jobs';
import Notfound from './Components/NotFound/Notfound';
import ProtectedRoute from './Components/ProtectedRoute/Protectedroute';
import DetailedView from '../src/Components/DetailsView/DetailedView';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={Home} />}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/jobs" element={<ProtectedRoute Component={Jobs} />}></Route>
      <Route path="/jobs/:id" element={<ProtectedRoute Component={DetailedView} />}></Route>

      <Route path="/*" element={<Notfound/>}></Route>

    </Routes>
  )
}

export default App;