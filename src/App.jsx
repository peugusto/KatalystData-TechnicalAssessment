import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import GetAllTeams from './util/GetAllTeams'

function App() {

  useEffect(() =>{
    async function fetchData() {
          GetAllTeams();
    }

    fetchData();
  },[])

  return (
    <>
      
    </>
  )
}

export default App
