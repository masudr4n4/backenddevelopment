import InfoBoard from '../componants/InfoBoard'

export default function InfoBoardPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <header className="mb-8 text-center md:text-left">
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">
          Technical overview
        </p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Skills at a glance
        </h1>
        <p className="text-base-content/80 max-w-2xl leading-relaxed">
          A concise map of strengths you can walk through in an interview: pick a tab for talking
          points on how I use each area in real delivery work—from manual investigation to
          Playwright-backed automation in Python.
        </p>
      </header>

      <InfoBoard />
    </div>
  )
}
