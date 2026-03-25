import Calculator from '../componants/InvestmentCalculator'

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">Finance</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Investment calculator
        </h1>
        <p className="text-base-content/70 text-sm max-w-xl leading-relaxed">
          Adjust capital, annual contributions, interest rate, and time horizon. Results update
          instantly as you type.
        </p>
      </header>

      <Calculator />
    </div>
  )
}
