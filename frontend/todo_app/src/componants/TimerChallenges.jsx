import { useState, useRef } from 'react'

export function User({ name }) {
  return (
    <p className="text-center text-base-content/60 text-sm">
      Hello <span className="font-medium text-base-content">{name}</span> — pick a challenge below.
    </p>
  )
}

export function Challenge({ initialTime }) {
  const totalMs = initialTime * 1000
  const [timeRemaining, setTimeRemaining] = useState(totalMs)
  const intervalRef = useRef(null)

  function startChallenge() {
    if (intervalRef.current) return
    setTimeRemaining(totalMs)
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 10) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          return 0
        }
        return prev - 10
      })
    }, 10)
  }

  function stopChallenge() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function resetChallenge() {
    stopChallenge()
    setTimeRemaining(totalMs)
  }

  const progress = totalMs > 0 ? timeRemaining / totalMs : 0
  const seconds = (timeRemaining / 1000).toFixed(2)

  return (
    <div className="card bg-base-200 border border-base-300 shadow-sm rounded-2xl overflow-hidden">
      <div className="h-1 w-full bg-base-300">
        <div
          className="h-full bg-primary transition-[width] duration-75 ease-linear"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
      </div>
      <div className="card-body items-center text-center gap-8 pt-10 pb-8 px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-base-content/50 mb-2">
            {initialTime}s sprint
          </p>
          <p
            className="font-mono text-5xl md:text-6xl font-light tabular-nums tracking-tight text-base-content"
            aria-live="polite"
          >
            {seconds}
            <span className="text-2xl md:text-3xl text-base-content/40 ml-1">s</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 w-full max-w-xs">
          <button type="button" className="btn btn-primary btn-sm md:btn-md flex-1 min-w-[5rem]" onClick={startChallenge}>
            Start
          </button>
          <button type="button" className="btn btn-ghost btn-sm md:btn-md flex-1 min-w-[5rem]" onClick={stopChallenge}>
            Stop
          </button>
          <button type="button" className="btn btn-outline border-base-300 btn-sm md:btn-md flex-1 min-w-[5rem]" onClick={resetChallenge}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TimerChallenge() {
  return <Challenge initialTime={5} />
}
