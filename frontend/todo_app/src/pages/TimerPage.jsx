import TimerChallenge from '../componants/TimerChallenges'

export default function TimerPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <header className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">Focus</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Timer challenge
        </h1>
        <p className="text-base-content/70 text-sm max-w-md mx-auto leading-relaxed">
          A simple countdown—start, pause, or reset. Use it for quick timing drills or a calm
          moment between tasks.
        </p>
      </header>

      <TimerChallenge />
    </div>
  )
}
