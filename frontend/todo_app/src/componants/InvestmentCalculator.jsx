import { useState } from "react"

/*
FV = P * (1 + r)^t + A * (((1 + r)^t - 1) / r)

The future value of an investment with regular annual contributions can be calculated using:
FV = P * [(1 + r)^n - 1] / r + PMT * [(1 + r)^n - 1] / r,
where FV is future value, P is initial investment, r is annual interest rate (as a decimal),
n is number of years, and PMT is annual contribution.
*/

const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)

function Row({ year, capital, rate, annoul, profit, fv }) {
  console.log("Adding new table now :) ")
  return (
    <tr className="hover:bg-base-200/70 transition-colors">
      <th className="font-semibold text-base-content text-right">{year}</th>
      <td className="font-mono text-right text-base-content/80">{fmt(capital)}</td>
      <td className="font-mono text-right text-base-content/80">{rate}%</td>
      <td className="font-mono text-right text-base-content/80">{fmt(annoul)}</td>
      <td className="font-mono text-right text-success font-medium">{fmt(profit)}</td>
      <td className="font-mono text-right font-semibold text-primary">{fmt(fv)}</td>
    </tr>
  )
}

function InputField({ label, hint, children }) {
  return (
    <div className="form-control w-full">
      <label className="label pt-0 pb-1">
        <span className="label-text font-medium">{label}</span>
        {hint && <span className="label-text-alt text-base-content/50">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

export default function Calculator() {

  function getInvestmentRoi(data) {
    let roiData = []
    let p = parseFloat(data.capital)
    let r = parseFloat(data.rate)
    let n = parseInt(data.year)
    let pmt = parseFloat(data.annualInvestment)
    let fv = p
    for (let year = 1; year < n + 1; year++) {
      let currentYeardata = {
        capital: p,
        rate: r,
        year: year,
        annualInvestment: pmt,
      }
      let profit = p * (r / 100)
      fv += profit
      currentYeardata["fv"] = fv
      currentYeardata["profit"] = profit
      roiData.push(currentYeardata)
    }
    return roiData
  }

  const [currentData, updateData] = useState({
    usersInput: {
      capital: 1,
      annualInvestment: 0,
      rate: 0,
      year: 1,
    },
    dataRow: [],
  })

  function capitalHandler(event) {
    updateData((currentData) => {
      let copiedData = structuredClone(currentData)
      copiedData.usersInput.capital = event.target.value
      copiedData.dataRow = getInvestmentRoi(copiedData.usersInput)
      console.log("Updated data now", copiedData)
      return copiedData
    })
    console.log(currentData)
  }

  function profitRateHandler(event) {
    updateData((currentData) => {
      let copiedData = structuredClone(currentData)
      copiedData.usersInput.rate = event.target.value
      copiedData.dataRow = getInvestmentRoi(copiedData.usersInput)
      console.log("Updated data now", copiedData)
      return copiedData
    })
  }

  function annoualInvestmentHandler(event) {
    updateData((currentData) => {
      let copiedData = structuredClone(currentData)
      copiedData.usersInput.annualInvestment = event.target.value
      copiedData.dataRow = getInvestmentRoi(copiedData.usersInput)
      console.log("Updated data now", copiedData)
      return copiedData
    })
  }

  function timeHandler(event) {
    updateData((currentData) => {
      let copiedData = structuredClone(currentData)
      copiedData.usersInput.year = event.target.value
      copiedData.dataRow = getInvestmentRoi(copiedData.usersInput)
      console.log("Updated data now", copiedData)
      return copiedData
    })
  }

  const hasData = currentData.usersInput.capital > 0 && currentData.dataRow.length > 0
  const lastRow = currentData.dataRow[currentData.dataRow.length - 1]

  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-base-200 border border-base-300 shadow-sm rounded-2xl">
        <div className="card-body gap-6 sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary mb-1">
              Parameters
            </p>
            <h2 className="text-lg font-semibold text-base-content">Inputs</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <InputField label="Initial capital" hint="Starting amount">
              <input
                type="number"
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary"
                required
                placeholder="e.g. 10000"
                onChange={capitalHandler}
              />
            </InputField>

            <InputField label="Annual contribution" hint="Added each year">
              <input
                type="number"
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary"
                placeholder="e.g. 1200"
                onChange={annoualInvestmentHandler}
              />
            </InputField>

            <InputField label="Interest rate" hint="% per year">
              <input
                type="number"
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary"
                placeholder="e.g. 7"
                defaultValue={1.1}
                onChange={profitRateHandler}
              />
            </InputField>

            <InputField label="Time horizon" hint="1 – 10 years">
              <input
                type="number"
                className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary"
                required
                placeholder="1 – 10"
                min="1"
                max="10"
                title="Must be between 1 and 10"
                defaultValue={1}
                onChange={timeHandler}
              />
            </InputField>
          </div>
        </div>
      </div>

      {hasData && lastRow && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Total profit", value: fmt(lastRow.fv - currentData.usersInput.capital), accent: "text-success" },
            { label: "Future value", value: fmt(lastRow.fv), accent: "text-primary" },
            { label: "Over years", value: `${currentData.dataRow.length} yr`, accent: "text-base-content" },
          ].map(({ label, value, accent }) => (
            <div
              key={label}
              className="rounded-2xl border border-base-300 bg-base-200 px-5 py-4"
            >
              <p className="text-xs text-base-content/50 uppercase tracking-widest mb-1">{label}</p>
              <p className={`text-xl font-bold font-mono ${accent}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      <div
        className={`card bg-base-200 border border-base-300 shadow-sm rounded-2xl transition-opacity ${
          hasData ? "opacity-100" : "opacity-40 pointer-events-none"
        }`}
      >
        <div className="card-body gap-4 sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary mb-1">
              Breakdown
            </p>
            <h2 className="text-lg font-semibold text-base-content">Year-by-year results</h2>
          </div>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="table table-sm w-full">
              <thead>
                <tr className="border-b border-base-300 text-base-content/60 text-xs uppercase tracking-wide">
                  <th className="text-right">Year</th>
                  <th className="text-right">Capital</th>
                  <th className="text-right">Rate</th>
                  <th className="text-right">Annual contribution</th>
                  <th className="text-right">Profit</th>
                  <th className="text-right">Future value</th>
                </tr>
              </thead>
              <tbody>
                {currentData.dataRow.map((data) => (
                  <Row
                    key={data.year}
                    year={data.year}
                    capital={data.capital}
                    rate={data.rate}
                    annoul={data.annualInvestment}
                    profit={data.profit}
                    fv={data.fv}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
