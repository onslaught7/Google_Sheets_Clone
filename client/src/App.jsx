import React, { useEffect } from 'react'
import Spreadsheet from './pages/Spreadsheet'
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';

const App = () => {
  // Dynamically update the title section
  useEffect(() => {
    document.title = "Dynamic"
  }, []);

  return (
    <div>
      <Header/>
      <Toolbar/>
      <Spreadsheet/>
      <Footer/>
    </div>
  )
}

export default App