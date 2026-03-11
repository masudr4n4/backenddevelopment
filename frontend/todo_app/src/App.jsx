import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './componants/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import InfoBoardPage from './pages/InfoBoardPage'
import TicTacToePage from './pages/TicTacToePage'
import CalculatorPage from './pages/CalculatorPage'
import TimerPage from './pages/TimerPage'
import LoginPage from './pages/LoginPage'
import TodosPage from './pages/TodosPage'

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/info-board" element={<InfoBoardPage />} />
          <Route path="/tic-tac-toe" element={<TicTacToePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
