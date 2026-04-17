import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Groups from './pages/Groups'
import Knockout from './pages/Knockout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/" element={<Groups />} />

        <Route path="/mata-mata" element={<Knockout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App