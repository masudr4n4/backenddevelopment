import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AddPerson } from './componants/utils'
import InfoBoard from './componants/InfoBoard'
import TicTocToe from './componants/tictoctoe'
import Calculator from './componants/InvestmentCalculator'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p className="text-gray-600">
        Click on the Vite and React logos to learn more
      </p>
      <button className="btn btn-secondary outline">Secondary</button>
      <AddPerson name="Masud">
        <p className='text-amber-400'>He is having 5 years of experience as qa engineer!</p>
      </AddPerson>
      <InfoBoard/>
      <TicTocToe/>
      <Calculator />
    </>
  )
}

export default App
